import http, { ServerResponse } from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import { Web } from '@ignite/ctintegration-do';
import { StatusCodes } from 'http-status-codes';
import { Util } from '@ignite/ctintegration-util';
import core from '../router/core';

const createServer = () =>
  http.createServer(
    async (request: Web.Types.Ignite.Request, response: ServerResponse) => {
      try {
        const requestUrl = request.url || '/';
        const parts = url.parse(requestUrl);
        const method = request.method?.toUpperCase() || 'GET';
        const routePath = `${method} ${parts.pathname}`;
        const route = core.routes[routePath as keyof typeof core.routes];
        const filePath = path.join(
          path.resolve(__dirname, '../..'),
          parts.pathname || '',
        );

        if (route) {
          if (Util.Core.isOptionsRequest(method)) {
            response.writeHead(204, Util.Core.cors());
            response.end();
            return;
          }

          if (
            (Util.Core.isPostRequest(method) ||
              Util.Core.isPutRequest(method)) &&
            !Util.Core.isMultiPartRequest(request)
          ) {
            let chunks = '';
            request.on('data', (chunk) => {
              chunks += chunk;
            });

            request.on('end', async () => {
              try {
                request.body = JSON.parse(chunks);
              } catch (err) {
                request.body = {};
              }
              await route(request, response);
            });
          } else {
            await route(request, response);
          }
        } else if (
          Util.Core.isGetRequest(method) &&
          filePath.includes(
            (process.env.DIR_IMAGE_UPLOAD as string) || 'uploadedImages',
          )
        ) {
          try {
            const content = await fs.promises.readFile(filePath);
            let contentType = 'application/octet-stream';
            if (filePath.endsWith('.svg')) {
              contentType = 'image/svg+xml';
            } else if (
              ['.jpg', '.jpeg', '.png', '.gif'].some((ext) =>
                filePath.toLowerCase().endsWith(ext),
              )
            ) {
              contentType = `image/${path.extname(filePath).slice(1)}`;
            }
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content);
          } catch (err) {
            Util.Core.setResponseError(response, {
              statusCode: StatusCodes.NOT_FOUND,
              message: 'File not found',
            });
          }
        } else {
          Util.Core.setResponseError(response, {
            statusCode: StatusCodes.NOT_FOUND,
            message: 'Route not found',
          });
        }
      } catch (e) {
        Util.Core.logger().debug(
          JSON.stringify(e),
          `Unexpected error when processing URL ${request.url}`,
        );
        Util.Core.setResponseError(response, {
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: (e as { message: string }).message,
        });
      }
    },
  );

export { createServer };
