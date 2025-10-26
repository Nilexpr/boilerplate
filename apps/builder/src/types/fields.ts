/** 基础字段类型 */
export interface BaseField {
  /** 字段类型 */
  type: string;
  /** 字段标签 */
  label?: string;
  /** 是否可通过面板编辑 */
  visible?: boolean;
}

/** 文本字段类型 */
export type TextField = BaseField & {
  type: "text";
  placeholder?: string;
};

/** 数字字段类型 */
export type NumberField = BaseField & {
  type: "number";
};

/** 插槽字段类型 */
export type SlotField = BaseField & {
  type: "slot";
};

/**
 * 字段类型
 *
 * 通过 fields 控制所有组件 props 的序列化与反序列化行为
 */
export type Field = TextField | NumberField | SlotField;
