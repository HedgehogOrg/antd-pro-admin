import Qs from 'qs';
import Config from '@/config/config';

/**
 * 格式化GET查询的expand字段数据
 * @param expand GET 查询带的expand字段
 * @returns string
 */
function formatExpand(expand: any) {
  const result: string[] = [];
  function format(item: any, parent: string[] = []) {
    if (typeof item === 'string') {
      const newParent = parent.slice();
      newParent.push(item);
      result.push(newParent.join('.'));
    } else if (Array.isArray(item)) {
      item.forEach((i) => format(i, parent));
    } else if (typeof item === 'object' && item !== null) {
      Reflect.ownKeys(item).forEach((key) => {
        const newParent = parent.slice();
        newParent.push(key as string);
        format(item[key], newParent);
      });
    }
  }
  format(expand);
  return result.join(',');
}

export default {
  baseURL: `${Config.BASE_URL}`,
  timeout: 20000,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  },
  // 格式化GET请求带数组的情况
  paramsSerializer: (params: any) => {
    let newAttributes = '';
    // 处理attributes
    if (Array.isArray(params.attributes)) {
      const tmpAttr = params.attributes;
      Reflect.deleteProperty(params, 'attributes');
      newAttributes = Qs.stringify({ attributes: tmpAttr }, { arrayFormat: 'comma' });
    }
    const newParams = Reflect.ownKeys(params).reduce((memo, key) => {
      let newKey = key as string;
      const value = memo[newKey];
      if (newKey === 'expand') {
        // 处理expand
        Object.assign(memo, { [newKey]: formatExpand(value) });
      } else if (Array.isArray(value)) {
        // 处理普通数组类型 in 查询
        let newVal = `{${value.toString()}}`;
        if (newKey.startsWith('!')) {
          // 处理普通数组类型 not in 查询
          newVal = `!${newVal}!`;
          newKey = newKey.slice(1);
        }
        Reflect.deleteProperty(memo, key);
        Object.assign(memo, { [newKey]: newVal });
      }
      return memo;
    }, params);
    const all = [Qs.stringify(newParams), newAttributes].filter((q) => !!q);
    return all.join('&');
  },
};
