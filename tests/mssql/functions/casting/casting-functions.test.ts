import { DataType } from "../../../../src/chips-ql/types/datatypes/datatypes.enum";
import { Function } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

// CAST
service.expectFunction(
  "CAST to STRING",
  {
    function: Function.CAST,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "Hi",
    },
    as: {
      dataType: DataType.STRING,
    },
  },
  "CAST('Hi' AS VARCHAR)"
);

service.expectFunction(
  "CAST to STRING with length",
  {
    function: Function.CAST,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "Hi",
    },
    as: {
      dataType: DataType.STRING,
      length: 32,
    },
  },
  "CAST('Hi' AS VARCHAR(32))"
);

service.expectFunction(
  "CAST to INT",
  {
    function: Function.CAST,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: 25.65,
    },
    as: {
      dataType: DataType.NUMBER,
    },
  },
  "CAST(25.65 AS INT)"
);

// CONVERT
service.expectFunction(
  "CONVERT to INT",
  {
    function: Function.CONVERT,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: 25.65,
    },
    as: {
      dataType: DataType.NUMBER,
    },
  },
  "CONVERT(INT, 25.65)"
);

service.expectFunction(
  "CONVERT with style",
  {
    function: Function.CONVERT,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "2017-08-25",
    },
    as: {
      dataType: DataType.STRING,
    },
    style: {
      valueType: ValueType.RAW_VALUE,
      value: 101,
    },
  },
  "CONVERT(VARCHAR, '2017-08-25', 101)"
);
