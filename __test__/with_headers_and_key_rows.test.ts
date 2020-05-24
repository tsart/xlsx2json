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

describe('Excel parser', () => {
  it('should return defined file object', async () => {
    let settings = new Settings(config);
    let blob: any = loadFile(settings.get('fileName'));
    expect(blob.length).toBeGreaterThan(0);
  });
  it('should return defined JSON object', async () => {
    let settings = new Settings(config);
    let blob: any = loadFile(settings.get('fileName'));
    let res: OutputFormat[] = parser.parseXLSX(settings, blob);
    expect(res).toBeDefined();
    expect(res.length).toBe(1);
  });
  it('should return defined JSON object with data', async () => {
    let settings = new Settings(config);
    let blob: any = loadFile(settings.get('fileName'));
    let res: OutputFormat[] = parser.parseXLSX(settings, blob);
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
    let settings = new Settings(config);
    let blob: any = loadFile(settings.get('fileName'));
    let res: OutputFormat[] = parser.parseXLSX(settings, blob);
    expect(res[0].columns.map((item) => item.name)).toStrictEqual([
      'ReportTitle',
      'ReportDate',
      'columnA',
      'column B',
      'column-C',
    ]);
  });
  it('should return defined JSON object with column types', async () => {
    let settings = new Settings(config);
    let blob: any = loadFile(settings.get('fileName'));
    let res: OutputFormat[] = parser.parseXLSX(settings, blob);
    expect(res[0].columns.find((col) => col.name === 'ReportDate').type).toBe('date');
    expect(res[0].columns.find((col) => col.name === 'column-C').type).toBe('string');
  });
});

const loadFile = (fileName: string): any => {
  let inputBlob = fs.readFileSync(fileName);
  return inputBlob;
};
