export interface QuestionnaireCategoryItem {
  id: number,
  name: string,
  parentId: nunber,
  status: number,
  questionnaireCount: number,
  sourceId: number,
  source: { id: number, name: string },
  createdAt: number,
  creator: AgentCreator,
}

export type CreateQuestionnaireCategoryType = Pick<QuestionnaireCategoryItem, 'name'>;

export type UpdateQuestionnaireCategoryType = Pick<QuestionnaireCategoryItem, 'id', 'name'>;
