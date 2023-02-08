export interface CustomResultType {
  resultSetId: number, // 测评结果集id
  questionnaireSetId: number, // 量表集id
  results:
  {
    id: string, // 测评结果id
    customComment: string,
    customSuggest: string,
  }[],
  resultSetAssessments:
  {
    id: string, // 测评维度条件id
    customComment: string,
    customSuggest: string,
  }[],
  resultSetSummary?: {
    id: string, // 总结结论id,
    customComment: string,
    customSuggest: string,
  },
  contentCustomComment?: string, // mmpi内容量表自定义评语
  validityCustomComment?: string, // mmpi效度量表自定义评语
}
