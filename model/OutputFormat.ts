export enum ColumnType {
  numeric = 'numeric',
  string = 'string',
  boolean = 'boolean',
  date = 'date',
}

export interface Column {
  name: string;
  type: ColumnType;
  isNullable: boolean;
}

export interface OutputFormat {
  domain: string;
  objectName: string;
  description?: string;
  columns: Column[];
  source: {
    type: 'Excel';
    fileName: string;
    description?: string;
  };
  data: any[];
}
