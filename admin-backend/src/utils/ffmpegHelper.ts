import { exec } from "child_process";
import path from "path";

const convertToStreamableFormat = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const outputDir = path.dirname(filePath);
    const outputFileName = `${path.basename(
      filePath,
      path.extname(filePath)
    )}.m3u8`;
    const outputPath = path.join(outputDir, outputFileName);
    const command = `ffmpeg -i "${filePath}" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "${outputPath}"`;

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

export default { convertToStreamableFormat };
