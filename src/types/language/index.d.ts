import { Locale } from 'antd/lib/locale-provider';

interface LocalesType {
  [key: string]: any
}

interface LanguageType {
  // 显示的下拉
  name: string,
  // key
  value: string,
  // antd语言包（日期、日历等插件）
  antd: Locale,
  // 自定义语言包（业务语言）
  custom: Promise<any>,
}
