import { ServerResponse } from 'http';
import multer from 'multer';
import { Request as Req, Response as Res } from 'express';
import path from 'path';
import fs from 'fs';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class UploadImageController {
  public async processRequest(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    try {
      const { method } = request;
      Util.Core.logger().debug(
        `[UploadImage] Request initiated with method: ${method}`,
      );

      // Only allow POST request; else throw error
      await Util.Core.isPostRequestOrThrowError(method);

      const fileStorage = multer.diskStorage({
        destination: (_, __, cb) => {
          const directory = process.env.DIR_IMAGE_UPLOAD || 'uploadedImages';
          fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) {
              return cb(err, 'NA');
            }
            return cb(null, directory);
          });
        },
        filename: (_req, file, cb) => {
          const uniqueFilename = `${Date.now()}_${Math.floor(
            Math.random() * 10000,
          )}${path.extname(file.originalname)}`;
          cb(null, uniqueFilename);
        },
      });
      const maxSize = parseInt(process.env.LIMIT_FILE_SIZE as string, 10) || 1;

      // Read allowed file types from environment variable and split into an array
      const allowedFileTypes = (
        process.env.ALLOWED_FILE_TYPES ||
        'image/png,image/jpeg,image/jpg,image/svg+xml,image/gif'
      ).split(',');

      // Add file type checks to fileFilter function
      const fileFilter = (
        _req: Req,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback,
      ) => {
        // Check if file type is allowed
        if (!allowedFileTypes.includes(file.mimetype)) {
          return cb(
            new Error(
              'Invalid file type. Only PNG, JPEG, JPG, SVG, and GIF files are allowed.',
            ),
          );
        }
        // File is valid
        return cb(null, true);
      };

      const uploadImage = multer({
        storage: fileStorage,
        limits: { fileSize: maxSize * 1024 * 1024 /* bytes */ },
        fileFilter,
      }).array('images');

      // Handle file upload
      await new Promise<void>((resolve, reject) => {
        uploadImage(request as Req, response as Res, (err) => {
          if (err) {
            const error = err as Web.Types.Ignite.ErrorProps;
            Util.Core.logger().error(JSON.stringify(error));
            Util.Core.setResponseError(response, error);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      const files = (request as Req).files as Express.Multer.File[];
      const paths = files.map((file: Express.Multer.File) => file.path);
      Util.Core.setResponseTo200(response, paths);
    } catch (e) {
      const error = e as Web.Types.Ignite.ErrorProps;
      Util.Core.logger().error(`[UploadImage] : ${JSON.stringify(error)}`);
      Util.Core.setResponseError(response, error);
    }
  }
}
