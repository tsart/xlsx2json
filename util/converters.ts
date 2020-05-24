import { ExcelDataType } from '../model/InputFormat';
import { ColumnType } from '../model/OutputFormat';

export const getColumnType = (cellType: ExcelDataType) => {
  /**
   * The Excel data type for a cell.
   * b Boolean, n Number, e error, s String, d Date, z Stub
   */
  let type: ColumnType =
    cellType === 'd'
      ? ColumnType.date
      : cellType === 's'
      ? ColumnType.string
      : cellType === 'b'
      ? ColumnType.boolean
      : cellType === 'n'
      ? ColumnType.numeric
      : ColumnType.string;
  return type;
};
