import { DataType } from "../../../src/chips-ql/types/datatypes/datatypes.enum";
import { ValueType } from "../../../src/chips-ql/types/values/value.type";
import { SqlLanguage } from "../../../src/sql/sql-languages.enum";
import { TestService } from "../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

// Text

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

// Number

service.expectDataType("BYTE datatype", {
  dataType: DataType.BYTE,
}, "TINYINT");

service.expectDataType("BYTE datatype with length", {
  dataType: DataType.BYTE,
  length: 6,
}, "TINYINT(6)");

service.expectDataType("INT datatype", {
  dataType: DataType.INT,
}, "INT");

service.expectDataType("INT datatype with length", {
  dataType: DataType.INT,
  length: 6,
}, "INT(6)");

service.expectDataType("DECIMAL datatype", {
  dataType: DataType.DECIMAL,
}, "DECIMAL");

service.expectDataType("DECIMAL datatype with length", {
  dataType: DataType.DECIMAL,
  length: 6,
}, "DECIMAL(6)");

service.expectDataType("BIGINT datatype", {
  dataType: DataType.BIGINT,
}, "BIGINT");

service.expectDataType("BIGINT datatype with length", {
  dataType: DataType.BIGINT,
  length: 6,
}, "BIGINT(6)");