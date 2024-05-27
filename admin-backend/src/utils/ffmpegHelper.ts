import { exec } from "child_process";
import path from "path";
import fs from "fs";

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
          return reject(
            new Error(`Erro ao obter resolução do vídeo: ${stderr}`)
          );
        }

        const [width, height] = stdout.trim().split("x").map(Number);
        resolve({ width, height });
      });
    });
  };

  static convertToM3U8 = (
    filePath: string,
    resolution: string,
    outputDir: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const outputFileName = `${path.basename(
        filePath,
        path.extname(filePath)
      )}_${resolution}.m3u8`.replace("_unprocessed", ""); // Remover _unprocessed do nome do arquivo
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

      const command = `ffmpeg -i "${filePath}" -vf ${scaleFilter} -c:v libx264 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "${outputPath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Erro no ffmpeg:", error);
          console.error("ffmpeg stderr:", stderr);
          return reject(new Error(`Erro na conversão do vídeo: ${stderr}`));
        }
        resolve(outputPath); // Retorna o caminho do arquivo convertido
      });
    });
  };

  static createMasterM3U8 = (
    outputDir: string,
    resolutions: { sd: string | null; hd: string | null; _4k: string | null }
  ) => {
    const masterFilePath = path.join(outputDir, "master.m3u8");
    let masterContent = "#EXTM3U\n";

    if (resolutions.sd) {
      masterContent += `
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=720x480
${path.relative(outputDir, resolutions.sd)}
`;
    }

    if (resolutions.hd) {
      masterContent += `
#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=1280x720
${path.relative(outputDir, resolutions.hd)}
`;
    }

    if (resolutions._4k) {
      masterContent += `
#EXT-X-STREAM-INF:BANDWIDTH=8000000,RESOLUTION=3840x2160
${path.relative(outputDir, resolutions._4k)}
`;
    }

    fs.writeFileSync(masterFilePath, masterContent);
  };

  static extractThumbnail = async (
    filePath: string,
    outputDir: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const outputFileName =
        path.basename(filePath, path.extname(filePath)) + ".png";
      const outputPath = path.join(outputDir, outputFileName);

      const command = `ffmpeg -i "${filePath}" -vf "thumbnail" -frames:v 1 "${outputPath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Error during thumbnail extraction:", error);
          console.error("ffmpeg stderr:", stderr);
          return reject(
            new Error(`Error during thumbnail extraction: ${stderr}`)
          );
        }
        resolve(outputPath);
      });
    });
  };

  static resizeImage = (
    imagePath: string,
    width: number,
    height: number,
    outputDir: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const outputFileName =
        path.basename(imagePath, path.extname(imagePath)) +
        `_${width}x${height}.png`;
      const outputPath = path.join(outputDir, outputFileName);

      const command = `ffmpeg -i "${imagePath}" -vf "scale=${width}:${height}" "${outputPath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Error during image resizing:", error);
          console.error("ffmpeg stderr:", stderr);
          return reject(new Error(`Error during image resizing: ${stderr}`));
        }
        resolve(outputPath);
      });
    });
  };

  static compressImage = (
    imagePath: string,
    outputDir: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const outputFileName =
        path.basename(imagePath, path.extname(imagePath)) + "_compressed.jpg";
      const outputPath = path.join(outputDir, outputFileName);

      const command = `ffmpeg -i "${imagePath}" -qscale:v 2 "${outputPath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Error during image compression:", error);
          console.error("ffmpeg stderr:", stderr);
          return reject(new Error(`Error during image compression: ${stderr}`));
        }
        resolve(outputPath);
      });
    });
  };
}

export default FfmpegHelper;
