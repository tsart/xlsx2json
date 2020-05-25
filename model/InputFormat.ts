export interface ResultObject {
  name: string;
  description?: string;
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
  description?: string;
  resultObjects: ResultObject[];
  cells?: Cell[];
  datasets?: Dataset[];
}

export type ExcelDataType = 'b' | 'n' | 'e' | 's' | 'd' | 'z';
