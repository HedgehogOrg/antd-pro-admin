/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
import { CustomResultType } from 'stores/report/customStore';

type OptionType = 'results' | 'resultSetSummary' | 'resultSetAssessments' | 'validityCustomComment' | 'contentCustomComment';

class CustomStaore {
  resultSets: CustomResultType[];

  constructor() {
    this.resultSets = [];
  }

  setResultSets(result: CustomResultType) {
    this.resultSets.push(result);
  }

  addCustomResult(
    resultSetId: number,
    questionnaireSetId:number,
    value: string,
    type: OptionType,
    customType: 'customComment' | 'customSuggest',
    id?:string,
  ) {
    let curResultSet: CustomResultType = this.resultSets.filter(
      (resultSet: CustomResultType) => resultSetId === resultSet?.resultSetId && questionnaireSetId === resultSet?.questionnaireSetId,
    )[0];

    const check = () => {
      switch (type) {
        case 'resultSetSummary':
          (curResultSet[type] as any)[customType] = value;
          break;
        case 'validityCustomComment':
          curResultSet[type] = value;
          break;
        case 'contentCustomComment':
          curResultSet[type] = value;
          break;
        default:
          let cur = (curResultSet[type] as any[]).filter((val) => val?.id === id)[0];
          if (!cur) {
            cur = {};
            cur.id = id;
            cur[customType] = value;
            curResultSet[type].push(cur);
          } else {
            cur[customType] = value;
          }
          break;
      }
    };

    if (!curResultSet) {
      curResultSet = {
        resultSetId,
        questionnaireSetId, // 量表集id
        results: [],
        resultSetSummary: {
          id: ((type === 'resultSetSummary') && id) as string, // 总结结论id,
          customComment: '',
          customSuggest: '',
        },
        resultSetAssessments: [],
      };
      check();
      this.resultSets.push(curResultSet);
    } else {
      check();
    }
  }
}

export default new CustomStaore();
