import { exec } from "child_process";
import path from "path";
import fs from "fs";
import {
  FfmpegHelperError,
  VideoConversionProcessError,
} from "../errors/CustomErrors";

class FfmpegHelper {
  static getVideoResolution = (
    filePath: string
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const command = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${filePath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Erro no ffprobe:", error);
          console.error("ffprobe stderr:", stderr);
          return reject(new FfmpegHelperError(stderr));
        }

        const [width, height] = stdout.trim().split("x").map(Number);
        resolve({ width, height });
      });
    });
  };

  static convertVideo = (
    filePath: string,
    resolution: string,
    outputDir: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const outputFileName = `playlistVideo${resolution}.m3u8`;
      const outputPath = path.join(outputDir, outputFileName);

      let scaleFilter;
      switch (resolution) {
        case "4K":
          scaleFilter = "scale=3840:2160";
          break;
        case "HD":
          scaleFilter = "scale=1280:720";
          break;
        case "SD":
          scaleFilter = "scale=720:480";
          break;
        default:
          return reject(new Error("Unknown resolution"));
      }

      // Comando para converter vídeo e remover faixa de áudio
      const command = `ffmpeg -i "${filePath}" -vf ${scaleFilter} -an -c:v libx264 -start_number 0 -hls_time 10 -hls_list_size 0 -hls_segment_filename "${outputDir}/fragmentoVideo${resolution}_%d.ts" -f hls "${outputPath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Erro no ffmpeg:", error);
          console.error("ffmpeg stderr:", stderr);
          return reject(new VideoConversionProcessError(stderr));
        }
        resolve(outputPath); // Retorna o caminho do arquivo convertido
      });
    });
  };

  static createMasterM3U8 = (
    outputDir: string,
    resolutions: { sd: boolean; hd: boolean; _4k: boolean }
  ) => {
    const masterFilePath = path.join(outputDir, "master.m3u8");
    let masterContent = "#EXTM3U\n";

    masterContent += `
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="Audio",DEFAULT=YES,AUTOSELECT=YES,URI=
${path.relative(outputDir, path.join(outputDir, "audio", "playlistAudio.m3u8"))}
`;

    if (resolutions.sd) {
      masterContent += `
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=720x480,AUDIO="audio"
${path.relative(outputDir, path.join(outputDir, "SD", "playlistVideoSD.m3u8"))}
`;
    }

    if (resolutions.hd) {
      masterContent += `
#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=1280x720,AUDIO="audio"
${path.relative(outputDir, path.join(outputDir, "HD", "playlistVideoHD.m3u8"))}
`;
    }

    if (resolutions._4k) {
      masterContent += `
#EXT-X-STREAM-INF:BANDWIDTH=8000000,RESOLUTION=3840x2160,AUDIO="audio"
${path.relative(outputDir, path.join(outputDir, "4K", "playlistVideo4K.m3u8"))}
`;
    }

    fs.writeFileSync(masterFilePath, masterContent);
  };

  static extractAudio = (
    filePath: string,
    outputDir: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const outputFileName = `playlistAudio.m3u8`;
      const outputPath = path.join(outputDir, outputFileName);

      const command = `ffmpeg -i "${filePath}" -q:a 0 -map a -start_number 0 -hls_time 10 -hls_list_size 0 -hls_segment_filename "${outputDir}/fragmentoAudio_%d.ts" -f hls "${outputPath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Erro no ffmpeg:", error);
          console.error("ffmpeg stderr:", stderr);
          return reject(new VideoConversionProcessError(stderr));
        }
        resolve(outputPath); // Retorna o caminho do arquivo de áudio extraído
      });
    });
  };
}

export default FfmpegHelper;
