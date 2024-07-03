import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { FfmpegHelperError } from "../errors/CustomErrors";

class FfmpegHelper {
  static async getVideoResolution(
    filePath: string
  ): Promise<{ width: number; height: number }> {
    const command = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${filePath}"`;
    const stdout = await FfmpegHelper.execCommand(command);
    const [width, height] = stdout.trim().split("x").map(Number);
    return { width, height };
  }

  static async convertVideo(
    filePath: string,
    resolution: string,
    outputDir: string
  ): Promise<string> {
    const outputFileName = `playlistVideo${resolution}.m3u8`;
    const outputPath = path.join(outputDir, outputFileName);

    const scaleFilter = FfmpegHelper.getScaleFilter(resolution);
    if (!scaleFilter) {
      throw new Error("Unknown resolution");
    }

    const command = `ffmpeg -i "${filePath}" -vf ${scaleFilter} -an -c:v libx264 -start_number 0 -hls_time 10 -hls_list_size 0 -hls_segment_filename "${outputDir}/fragmentoVideo${resolution}_%d.ts" -f hls "${outputPath}"`;
    await FfmpegHelper.execCommand(command);

    return outputPath;
  }

  static createMasterM3U8(
    outputDir: string,
    resolutions: { sd: boolean; hd: boolean; _4k: boolean }
  ): void {
    const masterFilePath = path.join(outputDir, "master.m3u8");
    let masterContent = "#EXTM3U\n";

    masterContent += `
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="Audio",DEFAULT=YES,AUTOSELECT=YES,URI=${path.relative(
      outputDir,
      path.join(outputDir, "audio", "playlistAudio.m3u8")
    )}
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
  }

  static async extractAudio(
    filePath: string,
    outputDir: string
  ): Promise<string> {
    const outputFileName = `playlistAudio.m3u8`;
    const outputPath = path.join(outputDir, outputFileName);

    const command = `ffmpeg -i "${filePath}" -q:a 0 -map a -start_number 0 -hls_time 10 -hls_list_size 0 -hls_segment_filename "${outputDir}/fragmentoAudio_%d.ts" -f hls "${outputPath}"`;
    await FfmpegHelper.execCommand(command);

    return outputPath;
  }

  private static async execCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Erro no comando:", error);
          console.error("stderr:", stderr);
          return reject(new FfmpegHelperError(stderr));
        }
        resolve(stdout);
      });
    });
  }

  private static getScaleFilter(resolution: string): string | null {
    switch (resolution) {
      case "4K":
        return "scale=3840:2160";
      case "HD":
        return "scale=1280:720";
      case "SD":
        return "scale=720:480";
      default:
        return null;
    }
  }
}

export default FfmpegHelper;
