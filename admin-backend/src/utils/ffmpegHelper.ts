import { exec } from "child_process";
import path from "path";

const convertToStreamableFormat = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(path.dirname(filePath), `${path.basename(filePath, path.extname(filePath))}.mp4`);
        const command = `ffmpeg -i ${filePath} -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -strict -2 ${outputPath}`;

        exec(command, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
};

export default { convertToStreamableFormat };
