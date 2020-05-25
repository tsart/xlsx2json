![](https://badgen.net/npm/v/@tsart/xlsx2json)
![](https://badgen.net/npm/types/@tsart/xlsx2json)

# xlsx2json

XLSX to JSON parser. Extract and combine Excel cells and datasets into JSON array.

## Install

```bash
npm install @tsart/xlsx2json
```

## Usage

```typescript
import * as parser from '@tsart/xlsx2json';

let blob: any = fs.readFileSync('test.xls');
let files: parser.OutputFormat[] = parser.parseXLSX(config, blob);
```

See `__test__` folder for other samples.

## Config schema

This sample config defines `A1`, `A2` cells and `B4:C7` range to extract as JSON object.

```yml
domain: excel
fileName: test.xls
fileOptions:
  cellDates: true

# Destination
resultObjects:
  - name: testDS
    columns:
      - ReportDate
      - ReportTitle
    dataset: Table

# Excel cells definitions
cells:
  - name: ReportDate
    sheetName: Sheet1
    cell: A1
  - name: ReportTitle
    sheetName: Sheet1
    cell: A2

# Excel datasets definitions
datasets:
  - name: Table
    sheetName: Sheet1
    range: B4:C7
```

## Credits

Thank you [daikiueda](https://github.com/daikiueda/xlsx2json) for sample XLSX files and a few good insights
