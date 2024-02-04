import { DataType } from "../../../src/chips-ql/types/datatypes/datatypes.enum";
import { ValueType } from "../../../src/chips-ql/types/values/value.type";
import { SqlLanguage } from "../../../src/sql/sql-languages.enum";
import { TestService } from "../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

service.expectDataType('VARCHAR', {
    dataType: DataType.VARCHAR
}, 'VARCHAR');

service.expectDataType(
  "VARCHAR (length = 12)",
  {
    dataType: DataType.VARCHAR,
    length: 12
  },
  "VARCHAR(12)"
);

service.expectDataType(
  "VARCHAR (length = MAX)",
  {
    dataType: DataType.VARCHAR,
    length: Infinity,
  },
  "VARCHAR(MAX)"
);

service.expectDataType('DATETIME', {
    dataType: DataType.DATE,
    includeTime: true,
}, 'DATETIME2');

service.expectDataType(
  "DATE",
  {
    dataType: DataType.DATE,
  },
  "DATE"
);

service.expectDataType(
  "Custom dataType",
  {
    dataType: DataType.CUSTOM,
    name: "STRING",
    parameters: [
      {
        valueType: ValueType.RAW_VALUE,
        value: 127,
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: 0,
      },
    ],
  },
  "STRING(127, 0)"
);