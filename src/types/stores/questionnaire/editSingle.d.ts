/**
 * File: editSingle.d.ts
 * Project: sd-console-web
 * FilePath: /src/types/stores/questionnaire/editSingle.d.ts
 * Created Date: 2022-08-17 15:57:45
 * Author: diya
 * -----
 * Modified By: diya
 * -----
 * Description:
 */
import { QuestionnaireListItem } from '@/types/stores/questionnaire';

export interface PropsType {
  visible: boolean
  closeModal: () => void;
  tableRef: ActionType;
  editId: number | undefined;
  scaleData: QuestionnaireListItem
}
