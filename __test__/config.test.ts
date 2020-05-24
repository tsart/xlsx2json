import * as parser from '../parser';
import * as fs from 'fs';
import { InputFormat } from '../model/InputFormat';
import { Settings } from '../util/config';
import { OutputFormat } from '../model/OutputFormat';

let config: InputFormat = {
  domain: 'Excel',
  fileName: '__test__/xlsx/with_header_information_and_keys_row.xlsx',
  fileOptions: { cellDates: true },
  resultObjects: [
    {
      name: 'withHeaderInformationAndKeysRow',
      columns: ['ReportTitle', 'ReportDate'],
      dataset: 'Table',
    },
  ],
  cells: [
    { name: 'ReportTitle', sheetName: 'Sheet1', cell: 'A1' },
    { name: 'ReportDate', sheetName: 'Sheet1', cell: 'E1' },
  ],
  datasets: [{ name: 'Table', sheetName: 'Sheet1', range: 'A3:C5' }],
};

describe('Configuration tests', () => {
  it('should return defined settings object', async () => {
    let settings = new Settings(config);
    expect(settings).toBeDefined();
  });
  it('should return defined settings file options', async () => {
    let settings = new Settings(config);
    expect(settings.getFileOptions()).toStrictEqual({ cellDates: true });
  });
  it('should return defined object list', async () => {
    let settings = new Settings(config);
    expect(settings.getObjectList()).toStrictEqual([
      {
        columns: ['ReportTitle', 'ReportDate'],
        dataset: 'Table',
        name: 'withHeaderInformationAndKeysRow',
      },
    ]);
  });
  it('should return defined dataset options', async () => {
    let settings = new Settings(config);
    expect(settings.getDatasetOptions('Table')).toStrictEqual({
      name: 'Table',
      range: 'A3:C5',
      sheetName: 'Sheet1',
    });
  });
  it('should return defined cell options', async () => {
    let settings = new Settings(config);
    expect(settings.getCellOptions('ReportDate')).toStrictEqual({
      cell: 'E1',
      name: 'ReportDate',
      sheetName: 'Sheet1',
    });
  });
});
