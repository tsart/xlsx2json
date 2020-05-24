import { InputFormat } from '../model/InputFormat';

export class Settings {
  config: InputFormat;

  constructor(config: InputFormat) {
    this.config = config;
  }

  get = (key: string) => {
    return this.config[key];
  };

  getDomainOptions = () => {
    let options = this.get('domain');
    return options;
  };

  getFileOptions = () => {
    let fileOptions = this.get('fileOptions');
    return fileOptions;
  };

  getObjectList = (): any[] => {
    let objectList = this.get('resultObjects');
    return objectList;
  };

  getCellOptions = (cellName: string): any => {
    let options = this.get('cells').find((item) => item.name === cellName);
    return options;
  };

  getDatasetOptions = (datasetName: string): any => {
    let options = this.get('datasets').find((item) => item.name === datasetName);
    return options;
  };
}
