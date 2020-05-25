import * as parser from '../parser';
import * as fs from 'fs';
import { InputFormat } from '../model/InputFormat';
import { OutputFormat } from '../model/OutputFormat';

let config: InputFormat = {
  domain: 'Excel',
  fileName: '__test__/xlsx/with_header_information_and_keys_row.xlsx',
  fileOptions: { cellDates: true },
  description: 'source description',
  resultObjects: [
    {
      name: 'withHeaderInformationAndKeysRow',
      columns: ['ReportTitle', 'ReportDate'],
      dataset: 'Table',
      description: 'recordset description',
    },
  ],
  cells: [
    { name: 'ReportTitle', sheetName: 'Sheet1', cell: 'A1' },
    { name: 'ReportDate', sheetName: 'Sheet1', cell: 'E1' },
  ],
  datasets: [{ name: 'Table', sheetName: 'Sheet1', range: 'A3:C5' }],
};

describe('Excel parser', () => {
  it('should return defined file object', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    expect(blob.length).toBeGreaterThan(0);
  });
  it('should return defined JSON object', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res).toBeDefined();
    expect(res.length).toBe(1);
  });
  it('should return defined JSON object with data', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].data).toStrictEqual([
      {
        ReportDate: new Date('2020-05-19T12:00:00.000Z'),
        ReportTitle: 'Title',
        'column B': 'value 1-B',
        'column-C': 'value 1-C',
        columnA: 'value 1-A',
      },
      {
        ReportDate: new Date('2020-05-19T12:00:00.000Z'),
        ReportTitle: 'Title',
        'column B': 'value 2-B',
        'column-C': 'value 2-C',
        columnA: 'value 2-A',
      },
    ]);
  });
  it('should return defined JSON object with metadata', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].columns.map((item) => item.name)).toStrictEqual([
      'ReportTitle',
      'ReportDate',
      'columnA',
      'column B',
      'column-C',
    ]);
  });
  it('should return defined JSON object with column types', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].columns.find((col) => col.name === 'ReportDate').type).toBe('date');
    expect(res[0].columns.find((col) => col.name === 'column-C').type).toBe('string');
  });
  it('should return defined JSON object with source description', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].source.description).toBe('source description');
  });
  it('should return defined JSON object with recordset description', async () => {
    let blob: any = fs.readFileSync(config.fileName);
    let res: OutputFormat[] = parser.parseXLSX(config, blob);
    expect(res[0].description).toBe('recordset description');
  });
});
