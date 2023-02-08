import { QuestionnaireSpecialRulesEnum } from '@/enums/questionnaire';

export interface QuestionnaireDetailType {
  id: number;
  sourceId: number;
  categoryId: number;
  title: string;
  description: string;
  endRemark: string;
  type: number;
  isSingle: number;
  scoreType: number;
  status: number;
  coverUrl: string;
  lastResultOnly: number;
  needUserInfo: number;
  showIntro: number;
  showScore: number;
  showTable: number;
  showDetail: number;
  creatorId: number;
  creatorType: string;
  submitCount: number;
  userCount: number;
  stats: { submitCount: number, userCount :number };
  source: SimpleType;
  creator: SimpleType;
  category: SimpleType;
  organizations: SimpleType[];
  questionSets: QuestSetType[];
  createdAt: number;
  updatedAt: number;
  questionnaireOrganizations: SimpleType[]
  [propName:string]:any,
  tagIds:number[],
  tags?:TagsItem[],
  tagsStr?:string
}
interface SimpleType {
  id:number;
  name:string
}

interface QuestSetType {
  id: number;
  title: string
}

export interface QuestionnaireSetType {
  id:number,
  code: QuestionnaireSpecialRulesEnum,
  categoryId:number,
  title:string,
  description:string,
  endRemark:string,
  isAllPutInQuestion:number,
  type:number,
  isSingle:number,
  scoreType:number,
  coverUrl:string,
  lastResultOnly:number,
  showTable:number,
  questions:any[],
  dimensions: DimensionType[],
  controls:string,
  [propName:string]:any
}

export interface CommentType extends Pick(QuestionnaireDetailType, 'createdAt', 'updatedAt') {
  id:number,
  dimensionId:number,
  index:number,
  result:string,
  comment: string,
  suggest:string,
  matcher:{
    type: string,
    min: number,
    max: number,
    [propName:string]:any,
  } | string
}

export interface DimensionType {
  id:number,
  questionnaireSetId:number,
  index:number,
  wno:string,
  name:string,
  minScore:number,
  maxScore:number,
  factor:{
    type:string,
    [propName:string]:any
  },
  comments: CommentType[]
}

export interface QuestionnaireType {
  id: number,
  title: string,
  category: {
    id: number,
    name:string
  },
  description:string,
  questionnaireSets:Array<QuestionnaireSetType>,
  [propName:string]:any
}

// 结果集类型声明
export interface ResultSetType {
  id:number,
  submissionId:number,
  questionnaireSetId:number,
  index:number,
  resultSetSummary:any,
  results: Array<ResultType>,
  assessments:any,
  summary:any,
  [propName:string]:any
}

export interface ResultType extends Pick(QuestionnaireDetailType, 'createdAt', 'updatedAt') {
  id: number,
  submissionId:number,
  resultSetId:number,
  dimensionId:number,
  questionnaireSetId:number,
  index:number,
  score:number,
  commentId:number,
  commentId:number,
  comment: CommentType,
  [propName:string]:any
}

// 答案集类型声明
export interface AnswerSetType {
  id:number,
  submissionId:number,
  questionnaireSetId:number,
  index:number,
  answers:Array<AnswerType>
}

export interface AnswerType extends Pick(QuestionnaireDetailType, 'createdAt', 'updatedAt') {
  id:number,
  answerSetId:number,
  questionnaireSetId:number,
  questionnaireId:number,
  qno:string,
  value:string,
  startedAt:number,
  endedAt:number,
  useTime:number
}

export interface ResultSetSummaryType {
  createdAt:number,
  customComment:string,
  customSuggest:string,
  id:number,
  questionnaireSetId:number,
  resultSetId:number,
  submissionId:number,
  summaryId:number,
  totalScore:number,
  updatedAt:number,
  summary:any,
}
