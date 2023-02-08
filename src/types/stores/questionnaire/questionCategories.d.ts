export interface QuestionCategoryItem {
  id: number,
  name: string,
  parentId: nunber,
  status: number,
  questionCount: number,
  sourceId: number,
  source: { id: number, name: string },
  createdAt: number,
  creator: AgentCreator,
}

export type CreateQuestionCategoryType = Pick<QuestionCategoryItem, 'name'>;

export type UpdateQuestionCategoryType = Pick<QuestionCategoryItem, 'id', 'name'>;
