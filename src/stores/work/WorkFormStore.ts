import { makeAutoObservable } from 'mobx';
import {
  ListParams,
  ListRes,
  LooseObject,
  ResourceId,
  RetrieveParams,
} from '@/types/common';
import WorkFormsFetch from '@/apis/work/WorkFormsFetch';
import { WorkOrder, HandOrder } from '@/types/stores/work';

const initValue = {
  no: 0,
  name: '',
  description: '',
  images: [],
  appendixes: [],
  phases: [],
  phase: {},
};
class WorkFormStore {
  pageOptions = {
    current: 1,
    pageSize: 10,
    total: 0,
  };

  isHandover:boolean = false;

  currentIndex: number = 0;

  workOrder: WorkOrder;

  handOrder:HandOrder;

  constructor() {
    makeAutoObservable(this);
    this.workOrder = {
      ...initValue,
    };
    this.handOrder = {
      images: [],
      appendixes: [],
      description: '',
    };
  }

  setIsHandover(flag:boolean) {
    this.isHandover = flag;
  }

  setcurrentIndex(index: number) {
    this.currentIndex = index;
  }

  inithandOrder() {
    this.handOrder = {
      images: [],
      appendixes: [],
      description: '',
    };
  }

  setHandOrder(handOrder: HandOrder) {
    this.handOrder = handOrder;
  }

  initWorkOrder() {
    this.workOrder = {
      ...initValue,
    };
  }

  setWorkOrder(workOrder: WorkOrder) {
    this.workOrder = workOrder;
  }

  setPageOptions(current: number, pageSize: number) {
    this.pageOptions.current = current;
    this.pageOptions.pageSize = pageSize;
  }

  setPageOptionsTotal(total:number) {
    this.pageOptions.total = total;
  }

  // 流程列表请求函数
  list(params: ListParams): Promise<ListRes<WorkOrder>> {
    return WorkFormsFetch
      .list(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 新建流程数据
  create(params: ListParams) {
    return WorkFormsFetch
      .create(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 编辑流程数据
  update(id: ResourceId, params: LooseObject) {
    return WorkFormsFetch
      .update(id, params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 流程详情数据
  retrieve(id: ResourceId, params: RetrieveParams) {
    return WorkFormsFetch
      .retrieve(id, params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 删除流程数据
  destroy(id: ResourceId) {
    return WorkFormsFetch
      .destroy(id)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }
}

export default new WorkFormStore();
