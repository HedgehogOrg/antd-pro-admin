import { QuestionnaireTypesEnum, EvaluationTypesEnum } from '@/enums/questionnaire';

interface QuestionnaireInfo {
  isSingle: number, // 1=单一问卷，0=合并问卷
  categoryId: number, // 量表分类id
  code: string, // 量表代号
  serialNumber: string, // 量表编号
  evaluationType: EvaluationTypesEnum, // 测评类型
  reviewType: number, // 审阅方式，1=自动，2=手动
  releaseChannel: number, // 发布渠道，1=自用，2=公开
  price: number,
  title: string,
  description: string,
  guide: string, // 指导语
  endMark: string, // 结束语
  templateId: number, // 模板id
  scoreType: number, // 计分类型，0=不计分，1=计分，2=维度计分
  showIntro: number, // 是否显示封面，0=否，1=是
  coverUrl: string,
  type: QuestionnaireTypesEnum, // 问卷类型 0=普通问卷，1=测试问卷, 2-草稿问卷
  isAllPutInQuestion: number,
  config: {
    minScore?: number,
    maxScore?: number,
    autoNext: number, // 是否自动下一题, 0=否, 1=是
    viewReport: number, // 是否可以查看报告, 0=否, 1=是
    standardRange?: { // 参考氛围
      minScore: number,
      maxScore: number,
    },
    tableCfg?: {
      showTotal: number, // 显示总分, 0=否, 1=是
      showDimension: number, // 显示各维度分, 0=否, 1=是
    },
    graphCfg?: {
      totalGraphType: number, // 总分图表类型, 0=无,1=雷达图,2=柱状图,3=条形图,4=折线图,5=表格, 6=仪表盘
      dimensionGraphType: number, // 各维度总分图表类型 暂时不需要
      dimensionGraphCfg?: DimensionGraphCfg[];// 各维度图标类型
    },
  },
  tagIds?:number[],
  tags?:TagsItem[],
  dataComparisonType?:number, // 变化率类型
}

export {
  QuestionnaireInfo,
};
