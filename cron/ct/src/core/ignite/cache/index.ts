import { CT } from '@ignite/ctintegration-do';
import CacheClient from './connect';

const CT_PREFIX = 'CT';
const CT_PREFIX_CUSTOM_OBJECTS = `${CT_PREFIX}:customObjects`;

export class Cache {
  public async setCustomObjectsCache(
    storeId: string,
    value: CT.Types.Ignite.CustomObjects,
  ) {
    const cacheClient = await CacheClient.getInstance();
    const stringifyValue = JSON.stringify(value);
    const cacheKey = `${CT_PREFIX_CUSTOM_OBJECTS}:${storeId}`;
    await cacheClient.set(cacheKey, stringifyValue);
  }

  public async getCustomObjectsCache(storeId: string) {
    const cacheClient = await CacheClient.getInstance();
    const cacheKey = `${CT_PREFIX_CUSTOM_OBJECTS}:${storeId}`;
    const stringifyValue = await cacheClient.get(cacheKey);
    const parsedValue = stringifyValue ? JSON.parse(stringifyValue) : '';
    return parsedValue;
  }
}
