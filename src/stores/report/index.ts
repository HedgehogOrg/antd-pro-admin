import { makeAutoObservable } from 'mobx';
import { FormInstance } from 'antd';
import { QuestionnaireRecordType } from '@/types/stores/patient/questionnaireRecord';
import { MemberInfoSettingType } from '@/types/stores/questionnaire/questionnaireSubReportTemplate';
import { urlQuery2Json } from '@/utils/utils';
import { ReportType } from '@/enums';

interface ResultType {
  // result: number,
  comment: number,
  suggestion: number
}
class ReportGeneratorStore {
  // 正在生成的量表 id
  generatingId:number | null;

  // 显示组织 logo
  showOrgLogo: number;

  // 组织 logo 位置
  orgLogoPosition: string;

  // 组织名称
  showOrgName: number;

  // 患者信息显示
  showMemberInfo: number;

  // 患者信息
  memberInfoSetting: MemberInfoSettingType;

  // 测评结果
  showResult: number;

  // 结果内容配置项
  resultSetting: ResultType;

  // 结果图表
  showGraph: number;

  // 量表题目
  showQuestion: number;

  // 保存设置弹窗
  saveSettingModal:boolean;

  // 报告数据
  reportItem:Map<string, QuestionnaireRecordType>;

  textAreaBox:boolean;

  saveFormInstance: FormInstance | any;

  createStatus:boolean = false; // 生成报告按钮

  constructor() {
    makeAutoObservable(this);
    this.generatingId = null;
    this.showOrgLogo = 1;
    this.orgLogoPosition = 'center';
    this.showOrgName = 1;
    this.showMemberInfo = 1;
    this.showResult = 1;
    this.showGraph = 1;
    this.showQuestion = 1;
    const reportType = Number(urlQuery2Json()?.reportType || '0');
    this.memberInfoSetting = {
      name: 1,
      gender: 1,
      age: 1,
      mobile: 0,
      height: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      weight: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      smoke: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      drink: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      submitTime: 1,
      educationDegree: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      birthday: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      marriage: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      credentialsNumber: 0,
      accountNo: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      registrationNo: [ReportType.PATIENT_REPORT].includes(reportType) ? 1 : 0,
      department: [ReportType.PATIENT_REPORT].includes(reportType) ? 1 : 0,
      nurseUnit: [ReportType.PATIENT_REPORT].includes(reportType) ? 1 : 0,
      bedNo: [ReportType.PATIENT_REPORT].includes(reportType) ? 1 : 0,
    };
    this.resultSetting = {
      // result: 1,
      comment: 1,
      suggestion: 1,
    };
    this.saveSettingModal = false;
    this.reportItem = new Map();
    this.textAreaBox = true;
    this.saveFormInstance = null;
  }

  // 初始化函数
  initialStatus(destroy?:boolean, id?:number | string) {
    this.showOrgLogo = 1;
    this.orgLogoPosition = 'center';
    this.showOrgName = 1;
    this.showMemberInfo = 1;
    this.showResult = 1;
    this.showGraph = 1;
    this.showQuestion = 1;
    const reportType = Number(urlQuery2Json()?.reportType || '0');
    this.memberInfoSetting = {
      name: 1,
      gender: 1,
      age: 1,
      mobile: 0,
      height: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      weight: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      smoke: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      drink: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      submitTime: 1,
      educationDegree: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      birthday: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      marriage: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      credentialsNumber: 0,
      accountNo: [ReportType.PATIENT_REPORT].includes(reportType) ? 0 : 1,
      registrationNo: [ReportType.PATIENT_REPORT].includes(reportType) ? 1 : 0,
      department: [ReportType.PATIENT_REPORT].includes(reportType) ? 1 : 0,
      nurseUnit: [ReportType.PATIENT_REPORT].includes(reportType) ? 1 : 0,
      bedNo: [ReportType.PATIENT_REPORT].includes(reportType) ? 1 : 0,
    };
    this.resultSetting = {
      // result: 1,
      comment: 1,
      suggestion: 1,
    };
    this.saveSettingModal = false;
    if (destroy) {
      this.reportItem.delete(id as string);
    }

    this.textAreaBox = true;
    this.saveFormInstance = null;
  }

  // 配置更新函数
  // upDateSettingStatus(keyName:string, value:number | any) {
  //   this[keyName]= value;
  // }

  // 暂存生成的量表 id
  setGeneratingId(id:number) {
    this.generatingId = id;
  }

  // 是否展示设置弹窗
  setSaveSettingModal(status:boolean) {
    this.saveSettingModal = status;
  }

  // 暂存报告数据
  setReportItem(id:number | string, report: QuestionnaireRecordType | null) {
    if (this.reportItem.has(id as string) || !id) return;
    this.reportItem.set(id as string, report as QuestionnaireRecordType);
  }

  // 报告生成时替换 textarea为 div处理函数
  replaceTextArea2div(border:boolean) {
    this.textAreaBox = border;
  }

  // 存储 form 实例
  transFormInstance(form:FormInstance) {
    this.saveFormInstance = form;
  }

  setCreateStatus(data:boolean) {
    this.createStatus = data;
  }
}

export default new ReportGeneratorStore();
