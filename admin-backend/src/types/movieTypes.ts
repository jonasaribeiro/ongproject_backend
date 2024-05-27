interface IMulterUploadFiles {
  file?: Express.Multer.File[];
  trailers?: Express.Multer.File[];
  images_cartaz?: Express.Multer.File[];
  images_thumbnails?: Express.Multer.File[];
  images_promo?: Express.Multer.File[];
}

export type { IMulterUploadFiles };
