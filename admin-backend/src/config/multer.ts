import multer from "multer";
import path from "path";

// Caminho absoluto para a pasta "videos" dentro de "Repositorios"
const videoPath = path.resolve(__dirname, "../../../videos");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videoPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

export default upload;
