interface BasicType {
  type:number,
  index:number,
  qno:string,
  partition:string,
  isPutInQuestion:number,
  title:string,
  rtfTitle:string,
  defaultValue?:string
  maxScore:number,
  minScore:number,
  [propName:string]:any
}

export interface SelectItemType extends BasicType {
  data:{
    options: { value: string | number, text :string }[]
  } | string
}

export interface ValueItemType extends BasicType {
  data: {
    decimals:number,
    min:number,
    max:number
  }
}

export interface ShortAnswerItemType extends BasicType {
  data:object
}

export interface MatrixRadioItemType extends BasicType {
  data:{
    questions:{
      title:string,
      options:{ value:number | string, text:string }[]
    }[]
  }
}
