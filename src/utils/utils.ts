// import intl from 'react-intl-universal';

// // 方便使用多语言
// const setIntlModule = (module: string, opt: any = {}) => function (str: string) {
//   return intl.get(`${module}.${str}`, opt);
// };

// export { setIntlModule };
import { Buffer } from 'buffer';
import cloneDeep from 'lodash/cloneDeep';

const decodeBase64 = (str: string): string => Buffer.from(str, 'base64').toString('binary');

const encodeBase64 = (str: string): string => Buffer.from(str, 'binary').toString('base64');

// 注意lodash引入方式，避免引入整个包
const deepClone = (obj: any) => cloneDeep(obj);

/**
 * 对函数进行递归排序（children嵌套）
 * @param arr 排序的数组
 * @param key 排序的字段
 * @param type 排序的正反
 * @returns 排序后的函数
 */
function sort(arr: any[], key: string = 'sort', type: 1 | -1 | 0 = 1) {
  return arr.map((item) => {
    if (item.children && item.children.length) {
      Object.assign(item, { children: sort(item.children) });
    }
    return item;
  }).sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => (b[key] - a[key]) * type);
}

/**
 * 为树中元素添加父级字段
 * @param arr 树
 * @param [childKey=children] 子级字段
 * @param parents 父级
 * @returns 含父级的树
 */
function addParents(arr: any[], childKey: string = 'children', parents: any[] | undefined = undefined) {
  return arr.map((item) => {
    const tmpItem = item;
    if (parents) {
      tmpItem.parents = parents;
    }
    if (item[childKey]?.length) {
      const tmpParents = parents || [];
      const tmpParent = { ...item };
      Reflect.deleteProperty(tmpParent, childKey);
      tmpItem[childKey] = addParents(item[childKey], childKey, [...tmpParents, tmpParent]);
    }
    return tmpItem;
  });
}

/**
 * 扁平化树
 * @param arr 树
 * @param [childKey=children] 子级字段
 * @param parents 父级
 * @returns 扁平化的数组
 */
function flattenTree(arr: any[], childKey: string = 'children', parents: any[] | undefined = undefined) {
  const flatArr: any[] = [];
  arr.forEach((item) => {
    const tmpItem = item;
    if (parents) {
      tmpItem.parents = parents;
    }
    flatArr.push(tmpItem);
    if (item[childKey]?.length) {
      const tmpParents = parents || [];
      const tmpParent = { ...item };
      Reflect.deleteProperty(tmpParent, childKey);
      flatArr.push(...flattenTree(item[childKey], childKey, [...tmpParents, tmpParent]));
    }
  });
  return flatArr;
}

/**
 * 对obj的string类型属性进行trim
 * @param obj 需要trim的对象
 * @returns trim后对象
 */
function trim(obj: { [key: string | symbol]: any }) {
  Reflect.ownKeys(obj).forEach((key) => {
    let val = obj[key];
    if (typeof val === 'string') {
      val = val.trim();
    }
    Object.assign(obj, { key: val });
  });
  return obj;
}

/**
 * 数组去重
 * @param arr 数组
 * @param key 去重字段
 * @returns 去重后的数组
 */
function uniqueArr(arr: any[], key?:string) {
  const map = new Map();
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    map.set(key ? item[key] : item, item);
  }
  return Array.from(map.values());
}

/**
 * @param sec number
 * @return x时x分x秒格式的时间字符串
 */
function secondsToStr(sec: number) {
  if (sec === 0) return 0;

  const h = parseInt(String(sec / 3600), 10);
  const m = parseInt(String((sec % 3600) / 60), 10);
  const s = parseInt(String(sec % 60), 10);

  // eslint-disable-next-line no-nested-ternary
  return h > 0 ? `${h}小时${m}分钟${s}秒` : (m > 0 ? `${m}分钟${s}秒` : `${s}秒`);
}
/**
 * 秒转时分（Date）
 * @param   {number}     second
 * @return  {String}
 */
const secondToDate:(second:number) => string = (second: number) => {
  let minutes = 0; // 分
  let hours = 0; // 小时

  if (second >= 60) {
    minutes = parseInt(String(second / 60), 10);

    if (minutes >= 60) {
      hours = parseInt(String(minutes / 60), 10);
      minutes = parseInt(String(minutes % 60), 10);
    }
  }
  let result = '';
  if (minutes > 0) {
    result = `${parseInt(String(minutes), 10) < 10 ? `0${parseInt(String(minutes), 10)}` : parseInt(String(minutes), 10)}`;
  } else if (minutes === 0) {
    result = '00';
  }
  if (hours > 0) {
    result = `${parseInt(String(hours), 10)}:${result}`;
  } else if (hours === 0) {
    result = `00:${result}`;
  }
  return result;
};
/**
 * 秒转时分（String）
 * @param   {number}     second
 * @return  {String}
 */
const secondToString = (second:number) => {
  let minutes = 0; // 分
  let hours = 0; // 小时

  if (second >= 60) {
    minutes = parseInt(String(second / 60), 10);

    if (minutes >= 60) {
      hours = parseInt(String(minutes / 60), 10);
      minutes = parseInt(String(minutes % 60), 10);
    }
  }
  let result;
  if (minutes > 0) {
    result = `${parseInt(String(minutes), 10)}分钟`;
  } else if (minutes === 0) {
    result = '';
  }
  if (hours > 0) {
    result = `${parseInt(String(hours), 10)}小时${result}`;
  }
  return result;
};
/**
 * 秒转小时（Decimal）
 * @param   {number}     second
 * @return  {float}
 */
const secondToDecimal = (second:number) => {
  let minutes = 0; // 分
  let hours = 0; // 小时

  if (second > 60) {
    minutes = parseInt(String(second / 60), 10);

    if (minutes > 60) {
      hours = parseFloat(String(minutes / 60));
    }
  }
  let result;
  if (minutes >= 0) {
    result = parseFloat(String(minutes / 60));
  }
  if (hours > 0) {
    result = hours;
  }
  return result;
};
/**
 * @param urlStr url
 * @return 最终JSON结果对象
 *
 * ps: url参数转json对象
 */
const urlQuery2Json = function (urlStr?:string) { // 传入的url字符串
  const url = urlStr || window.location.href; // 获取当前浏览器的URL

  const param:any = {}; // 存储最终JSON结果对象

  url.replace(/([^?&]+)=([^?&]+)/g, (s, v, k) => {
    param[v] = decodeURIComponent(k);// 解析字符为中文

    return `${k}=${v}`;
  });

  return param;
};

export {
  encodeBase64, decodeBase64, sort, addParents, flattenTree, trim, uniqueArr, secondsToStr, deepClone, secondToDecimal, secondToDate, secondToString, urlQuery2Json,
};
