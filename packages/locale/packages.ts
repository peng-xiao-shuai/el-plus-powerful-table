import type { LangPackages } from '../../typings'

export enum LangKey {
  Confirm = 'confirm',
  Column = 'column',
  Edit = 'edit',
  Update = 'update',
  ColumnName = 'column-name',
  Hidden = 'hidden',
  Filter = 'filter',
  Refresh = 'refresh',
  Cancel = 'cancel',
  Hint = 'hint',
  OperateHint = 'operate-hint',
  More = 'more',
  NoData = 'no-data',
  PackUp = 'pack-up',
  ReadFullText = 'read-full-text',
  InputContent = 'input-content',
  Select = 'select',
  Open = 'open',
  Close = 'close',
  SelectOperateType = 'select-operate-type',
  SelectOperateData = 'select-operate-data',
  BatchOperate = 'batch-operate',
}

const langPackages: LangPackages = {
  en: {
    [LangKey.Confirm]: 'Confirm',
    [LangKey.Column]: 'Column',
    [LangKey.ColumnName]: 'Column name',
    [LangKey.Hidden]: 'Hidden',
    [LangKey.Filter]: 'Filter',
    [LangKey.Refresh]: 'Refresh',
    [LangKey.Cancel]: 'Cancel',
    [LangKey.Hint]: 'Hint',
    [LangKey.OperateHint]: (s) => `Whether to carry out ${s} operate?`,
    [LangKey.More]: 'More',
    [LangKey.NoData]: 'No data',
    [LangKey.Update]: 'Update',
    [LangKey.Edit]: 'Edit',
    [LangKey.PackUp]: 'Pack up',
    [LangKey.ReadFullText]: 'Read full text',
    [LangKey.InputContent]: 'Input content',
    [LangKey.Select]: 'Select',
    [LangKey.Open]: 'Open',
    [LangKey.Close]: 'Close',
    [LangKey.SelectOperateType]: 'Please select an operation type',
    [LangKey.SelectOperateData]:
      'Please select the data you want to manipulate',
    [LangKey.BatchOperate]: (s) => `Whether to batch ${s} the data?`,
  },
  'zh-cn': {
    [LangKey.Confirm]: '确认',
    [LangKey.Column]: '列',
    [LangKey.ColumnName]: '列名',
    [LangKey.Hidden]: '隐藏',
    [LangKey.Filter]: '过滤',
    [LangKey.Refresh]: '刷新',
    [LangKey.Cancel]: '取消',
    [LangKey.Hint]: '提示',
    [LangKey.OperateHint]: (s) => `是否要进行 ${s} 操作?`,
    [LangKey.More]: '更多',
    [LangKey.NoData]: '暂无数据',
    [LangKey.Update]: '修改',
    [LangKey.Edit]: '编辑',
    [LangKey.PackUp]: '收起',
    [LangKey.ReadFullText]: '展开阅读全文',
    [LangKey.InputContent]: '请输入内容',
    [LangKey.Select]: '请选择',
    [LangKey.Open]: '开启',
    [LangKey.Close]: '关闭',
    [LangKey.SelectOperateType]: '请选择操作类型',
    [LangKey.SelectOperateData]: '请选择要操作的数据',
    [LangKey.BatchOperate]: (s) => `是否要进行批量 ${s} 操作?`,
  },
}

export default langPackages
