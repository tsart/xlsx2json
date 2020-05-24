import { read, WorkBook } from 'xlsx';
import * as fs from 'fs';
import { InputFormat, ResultObject, Dataset, Cell, ExcelDataType } from './model/InputFormat.js';
import { OutputFormat, Column, ColumnType } from './model/OutputFormat.js';
import { readDataset, readDatasetMeta, readCell, readCellMeta } from './util/readers';

export const parseXLSX = (settings, inputBlob: any): OutputFormat[] => {
  // let fileName: string = 'Pending.xlsx';
  let Output: OutputFormat[] = [];
  let fileOptions = settings.getFileOptions();
  const wb: WorkBook = read(inputBlob, fileOptions);

  let objectList: any[] = settings.getObjectList();
  objectList.forEach((object: ResultObject) => {
    let res: OutputFormat = {
      domain: settings.getDomainOptions(),
      objectName: object.name,
      source: { type: 'Excel', fileName: settings.fileName },
      columns: [],
      data: [],
    };
    let dataset = {};
    let meta = [];
    object.columns?.forEach((cellName) => {
      let options = settings.getCellOptions(cellName);
      dataset[cellName] = readCell(wb, options);
      meta.push(readCellMeta(wb, options));
    });

    let options = settings.getDatasetOptions(object.dataset);
    let data = readDataset(wb, options);
    let metaDS = readDatasetMeta(wb, options);
    res.data = data.map((row) => {
      return { ...dataset, ...row };
    });
    res.columns = [...meta, ...metaDS];

    Output.push(res);
  });
  return Output;
};
