import { FormInstance } from 'antd';

/**
 * antd form组件的自定义 validate方法  校验输入长度
 * @params    form     antd的 form 组件实例对象
 * @params    target   antd的 form 组件item的目标自定义校验的 名称
 * @params    type     校验方案，可拓展（ps:0 默认方案--裁剪原数据，不报错 |1 方案1--不裁剪原数据，报错）
 * @params    targetName     自定义校验的目标名称
 * @params    max     最大长度
 * @params    min     最小长度
 *  */
export const validateLength = (form: FormInstance<any>, target: string, targetName: string, type: number = 0, max = 0, min = 0) => {
  const { getFieldValue, setFieldsValue } = form;
  return {
    validator: async (_: any, value: string) => {
      if (type === 0) {
        if (!value || getFieldValue(target) === value) {
          if (!value) return Promise.resolve();
          let temp: string = value.toString().trim();
          temp = temp.slice(0, max);
          const data = Object.create(null);
          data[`${target}`] = temp;
          setFieldsValue(data);
          return Promise.resolve();
        }
      } else if (type === 1) {
        if (!value || getFieldValue(target) === value) {
          if (!value) return Promise.resolve();
          const temp: string = value.toString().trim();
          if (!(temp.length <= max && temp.length >= min)) {
            throw new Error(`${targetName}长度${min}～${max}字符!`);
          } else {
            return Promise.resolve();
          }
        }
      }
      return Promise.resolve();
    },
  };
};

/**
 * Input 框输入内容类型格式化(汉字、空格无法输入,字符串头尾空格删除)
 * @params    form     antd的 form 组件实例对象
 * @params    target   antd的 form 组件item的目标自定义校验的 名称
 *   */
export const validateContentFormat = (form: FormInstance<any>, target: string) => {
  const { getFieldValue, setFieldsValue } = form;
  return {
    validator: async (_: any, value: string) => {
      if (!value || getFieldValue(target) === value) {
        if (!value) return Promise.resolve();
        let temp: string = value;
        temp = temp.replace(/[\u4e00-\u9fa5]*/g, '');
        temp = temp.replace(/\s*/g, '');
        temp = temp.trim();
        const data = Object.create(null);
        data[`${target}`] = temp;
        setFieldsValue(data);
        return Promise.resolve();
      }
      return Promise.resolve();
    },
  };
};

/**
 * 禁止输入空格
 * @param form    antd form表单实例
 * @param field   antd form表单字段名
 * @returns       Promise
 */
export const replaceSpace = (form: FormInstance<any>, field: string) => {
  const { getFieldValue, setFieldsValue } = form;

  return {
    validator: async (_: any, value: string) => {
      if (!value || getFieldValue(field) === value) {
        if (!value) return Promise.resolve();
        const temp: string = value.toString().trim();

        const data = Object.create(null);
        data[`${field}`] = temp;

        setFieldsValue(data);

        return Promise.resolve();
      }

      return Promise.resolve();
    },
  };
};

/**
 * 手机号验证
 */
export const mobilePattern = /^1[3-9][0-9]{9}$/;

/**
 * 身份证号验证
 */
export const identityCardPattern = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
/**
 * 验证身份证号
 * @param form    form表单实例
 * @param field   form表单字段名
 */
export const validateIdentityCard = (form: FormInstance<any>, field: string) => {
  const { getFieldValue } = form;
  return {
    validator: async (_: any, value: string) => {
      if (!value || getFieldValue(field) === value) {
        if (!value) return Promise.resolve();
        return validateIdentityCardFormat(value).catch((err) => { throw new Error(err); });
      }
      return Promise.resolve();
    },
  };
};
/**
 * 根据身份证号获取个人信息
 * @param idNumber 身份证号
 * @returns 个人信息 或 null
 */
export const validateIdentityCardFormat = (idNumber: string) => {
  const format = identityCardPattern;
  // 号码规则校验
  if (!format.test(idNumber)) {
    console.warn('身份证号码不合规');
    return Promise.reject('请输入正确的身份证号码');
  }
  // 一、获取籍贯，由于数据量比较大，所以这里只获取到省：
  // 定义地区数组
  const provinces: { [key: number]: string } = {
    11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外',
  };
  const province = provinces[parseInt(idNumber.substring(0, 2), 10)];
  // 二、出生日期
  const year = +idNumber.substring(6, 10);
  const month = +idNumber.substring(10, 12);
  const date = +idNumber.substring(12, 14);
  const birthday = `${year}-${month}-${date}`;
  // 身份证当月天数
  const dates = (new Date(year, month, 0)).getDate();
  if (date > dates) {
    console.warn('出生日期有误');
    return Promise.reject('请输入正确的身份证号码');
  }
  // 三、计算年龄
  const now = new Date();
  if (new Date(birthday) > now) {
    console.warn('出生日期有误');
    return Promise.reject('请输入正确的身份证号码');
  }
  const curMonth = now.getMonth() + 1;
  const curDate = now.getDate();
  let age = now.getFullYear() - year - 1;
  // 判断年龄
  if (month < curMonth || (month === curMonth && date <= curDate)) { age++; }
  // 四、获取性别
  let gender;
  if (+idNumber.substring(16, 17) % 2 === 1) {
    // 男
    gender = 1;
  } else {
    // 女
    gender = 2;
  }
  // 五、校验码判断
  const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 系数
  const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; // 校验码对照表
  const idArr: string[] = idNumber.split('');
  let sum = 0;
  for (let k = 0; k < 17; k++) {
    sum += parseInt(idArr[k], 10) * c[k];
  }
  if (idArr[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
    console.warn('校验码不正确');
    return Promise.reject('请输入正确的身份证号码');
  }
  // 赋值
  return Promise.resolve({
    province,
    birthday,
    age,
    gender,
  });
};
