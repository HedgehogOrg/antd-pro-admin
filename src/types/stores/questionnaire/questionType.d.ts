import { QuestionTypes, QuestionScorerEnum } from '@/enums/questionnaire';

export type Question = {
  categoryId?: number, // 分类
  type: QuestionTypes, // 题目类型
  title: string, // 题目标题
  rtfTitle: string, // 标题富文本
  isMustAnswer: number, // 是否必答，0=否，1=是
  index: number, // 序号
  id?: number,
  key: number, // 用于本地新建/编辑的唯一自增id
  qno: string, // 题目编号
  partition: string, // 分区
  isPutInQuestion: number, // 是否加入题库, 0=不加入, 1=加入
  optionStyleType?: number, // 选项样式，1=勾选，2=下拉
  defaultValue?: string, // 默认值
  data: QuestionOptions | QuestionDecimal | QuestionSimpleType | QuestionMatrix,
  config?: QuestionConfig, // 配置信息
  isCalcScore?: number,
  scorer?: {
    type?: QuestionScorerEnum,
    mapping?: ScorerMapping[],
    ranges?: ScorerRange[],
  },
  config?: GenderConfig,
  minScore?: number, // 最小分值
  maxScore?: number, // 最大分值
};

type GenderConfig = {
  gender: number, // 1=男，2=女
  title: string,
  isShow: number, // 0=否，1=是
};

type ScorerMapping = {
  value: string,
  score: number,
};

type ScorerRange = {
  min: number | null,
  max: number | null,
  score: number | null,
};

export interface ExtendedScorerRange extends ScorerRange {
  id: number,
}

type QuestionOption = {
  value: string,
  text: string,
  score?: number,
  isOther?: boolean,
};

export interface ExtendedQuestionOption extends QuestionOption {
  id: number,
}

// 单选、多选
export type QuestionOptions = {
  options: Array<QuestionOption>
};

export type ExtendedQuestionOptions = {
  options: Array<ExtendedQuestionOption>
};

// 矩阵单选
export type QuestionMatrix = {
  questions: Array<QuestionMatrixSingle>,
};

export type ExtendedQuestionMatrix = {
  questions: Array<ExtendedQuestionMatrixSingle>,
};

type QuestionMatrixSingle = {
  title: string,
} & QuestionOptions;

export type ExtendedQuestionMatrixSingle = {
  id: number,
  title: string,
} & ExtendedQuestionOptions;

// 数值
export type QuestionDecimal = {
  decimals: number, // 小数位
  min: number, // 最小值
  max: number, // 最大值
};

// 简答, 日期， 时间, 时长, 地区
export type QuestionSimpleType = {};

// 配置信息
export type QuestionConfig = {
  stepSize?: number, // 步长
  genderShow?: number, // 题目是否限制性别，0=不限制，1=限制男，2=限制女
  genderDiff?: number, // 标题是否区分男女
  genders?: Array<{ gender: 1 | 2, title: string }>, // 根据性别设置title, 1=男, 2=女
  minText?: string, // 最小值描述, 只有数值题型有
  maxText?: string, // 最大值描述, 只有数值题型有
};
