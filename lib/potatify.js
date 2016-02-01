import gm from 'gm';
import path from 'path';
import Promise from 'bluebird';
import { OUTPUT_DIR } from './constants.js';

Promise.promisifyAll(gm.prototype);

/**
 * Process an image using the potato algorithm
 * @param {string} filepath
 * @return {Promise:string}
 */
export default async function potatify(filepath)
{
  let parsedFilepath = path.parse(filepath);
  let outputFilename = parsedFilepath.name + '.jpg';
  let outputFilepath = path.join(OUTPUT_DIR, outputFilename);

  let size = await gm(filepath).sizeAsync();
  let { width } = size;

  await gm(filepath)
    .resize(width / 2)
    .resize(width)
    .quality(7)
    .writeAsync(outputFilepath);

  return outputFilepath;
}
