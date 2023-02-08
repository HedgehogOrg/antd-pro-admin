import { makeAutoObservable } from 'mobx';
import WorkFormFlowFetch from '@/apis/work/WorkFormFlowFetch';
import {
  ListParams,
  ListRes,
  LooseObject,
  ResourceId,
  RetrieveParams,
} from '@/types/common';
import { WorkFormFlow, HandleType, Phases } from '@/types/stores/work';

// const localSocketToken = Boolean(localStorage.getItem('SOCKET_TOKEN')) || false;

class WorkFlowFormStore {
  // pending 默认 success 成功 fail 失败 loading  同步中
  syncFlag: string = 'pending';

  pageOptions = {
    current: 1,
    pageSize: 10,
    total: 0,
  };

  currentPhaseIndex: number = 0;

  currentAccounts: Array<HandleType> = [];

  workFlowForm: WorkFormFlow = {
    name: '',
    phases: [
      {
        order: 1,
        name: '阶段1',
        handlerIds: '',
        departmentIds: '',
        handlers: [],
        departments: [],
        accounts: [],
      },
    ],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setSyncFlag(flag: string) {
    this.syncFlag = flag;
    // localStorage.setItem('SOCKET_TOKEN', String(this.syncFlag));
  }

  setcurrentPhaseIndex(index: number) {
    this.currentPhaseIndex = index;
  }

  setCurrentAccounts(handleList: Array<HandleType>) {
    this.currentAccounts = handleList;
  }

  delCurrentAccounts(index: number) {
    this.currentAccounts.splice(index, 1);
  }

  addAccounts(accountsList: Array<HandleType>) {
    if (this.workFlowForm.phases) {
      this.workFlowForm.phases[this.currentPhaseIndex].accounts = accountsList;
    }
  }

  delAccount(index: number, accountIndex: number) {
    if (
      this.workFlowForm &&
      this.workFlowForm.phases &&
      this.workFlowForm.phases.length
    ) {
      this.workFlowForm.phases[index].accounts?.splice(accountIndex, 1);
    }
  }

  delDep(index: number, depIndex: number) {
    if (
      this.workFlowForm &&
      this.workFlowForm.phases &&
      this.workFlowForm.phases.length
    ) {
      this.workFlowForm.phases[index].departments?.splice(depIndex, 1);
    }
  }

  addPhases() {
    if (this.workFlowForm.phases && this.workFlowForm.phases.length < 10) {
      this.workFlowForm.phases.push({
        name: `阶段${this.workFlowForm.phases.length + 1}`,
        handlerIds: '',
        departmentIds: '',
        handlers: [],
        departments: [],
        order: this.workFlowForm.phases.length + 1,
        accounts: [],
      });
    }
  }

  setWorkFlowForm(_workFlowForm: WorkFormFlow) {
    this.workFlowForm = { ...this.workFlowForm, ..._workFlowForm };
  }

  initWorkFlowForm() {
    this.workFlowForm = {
      name: '',
      phases: [
        {
          order: 1,
          name: '阶段1',
          handlerIds: '',
          departmentIds: '',
          handlers: [],
          departments: [],
          accounts: [],
        },
      ],
    };
  }

  setPhases(index: number, phase: Phases) {
    if (this.workFlowForm.phases) {
      this.workFlowForm.phases[index] = Object.assign(
        this.workFlowForm.phases[index],
        phase,
      );
    }
  }

  delPhases(index: number) {
    if (this.workFlowForm.phases && this.workFlowForm.phases.length > 1) {
      this.workFlowForm.phases.splice(index, 1);
    }
  }

  setPageOptions(current: number, pageSize: number) {
    this.pageOptions.current = current;
    this.pageOptions.pageSize = pageSize;
  }

  setPageOptionsTotal(total:number) {
    this.pageOptions.total = total;
  }

  // 流程列表请求函数
  list(params: ListParams): Promise<ListRes<WorkFormFlow>> {
    return WorkFormFlowFetch.list(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 新建流程数据
  create(params: LooseObject) {
    return WorkFormFlowFetch.create(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 编辑流程数据
  update(id: ResourceId, params: LooseObject) {
    return WorkFormFlowFetch.update(id, params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 流程详情数据
  retrieve(id: ResourceId, params: RetrieveParams) {
    return WorkFormFlowFetch.retrieve(id, params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 删除流程数据
  destroy(id: ResourceId) {
    return WorkFormFlowFetch.destroy(id)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }
}

export default new WorkFlowFormStore();
