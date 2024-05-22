import ffmpegHelper from "./utils/ffmpegHelper";

const videoPath =
  "C:\\Users\\jonas\\Desktop\\Repositorios\\ongproject_backend\\videos\\video-1716300022312.mp4";

ffmpegHelper
  .convertToStreamableFormat(videoPath)
  .then(() => {
    console.log("Conversão concluída com sucesso!");
  })
  .catch((error) => {
    console.error("Erro durante a conversão:", error);
  });
