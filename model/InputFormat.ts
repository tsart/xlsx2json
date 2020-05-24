export interface ResultObject {
  name: string;
  columns: string[];
  dataset: string;
}

export interface Cell {
  name: string;
  sheetName: string;
  cell: string;
}

export interface Dataset {
  name: string;
  sheetName: string;
  range: string;
}

export interface InputFormat {
  domain: string;
  fileName: string;
  fileOptions: {};
  resultObjects: ResultObject[];
  cells?: Cell[];
  datasets?: Dataset[];
}

export type ExcelDataType = 'b' | 'n' | 'e' | 's' | 'd' | 'z';
