import moment from 'moment';

/**
 * @param unix 时间戳：秒
 * @returns
 */
export const renderDateTime = (unix: number) => {
  const nowUnix = moment().unix();
  const diff = nowUnix - unix;

  if (moment(unix * 1000).year() === moment().year()) {
    if (moment(unix * 1000).month() === moment().month()) {
      if (diff < 60) {
        return '刚刚';
      }

      if (diff >= 60 && diff < 3600) {
        return `${Math.floor(diff / 60)}分钟前`;
      }

      if (diff >= 3600 && diff < 3600 * 24) {
        return `${Math.floor(diff / 3600)}小时前`;
      }
    }

    return moment(unix * 1000).format('MM-DD HH:mm');
  }

  return moment(unix * 1000).format('YYYY-MM-DD HH:mm');
};

/**
 * 递归删除对象中值为undefined和null的属性，并将boolean转为number
 * @param obj
 * @returns
 */
export const clearDeep = function (obj: { [key: string]: any }) {
  if (!obj || typeof obj !== 'object') return;

  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = obj[key];

    if (typeof val === 'undefined' || val === null) {
      Reflect.deleteProperty(obj, key);
    } else if (typeof val === 'boolean') {
      Reflect.set(obj, key, Number(val));
    } else if (typeof val === 'object') {
      clearDeep(obj[key]);
    }
  }
};
