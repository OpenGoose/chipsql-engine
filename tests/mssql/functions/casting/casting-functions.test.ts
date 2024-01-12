import { DataTypes } from "../../../../src/chips-ql/types/datatypes/datatypes.enum";
import { Functions } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

// CAST
service.expectFunction(
  "CAST to STRING",
  {
    function: Functions.CAST,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "Hi",
    },
    as: {
      dataType: DataTypes.VARCHAR,
    },
  },
  "CAST('Hi' AS VARCHAR)"
);

service.expectFunction(
  "CAST to STRING with length",
  {
    function: Functions.CAST,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "Hi",
    },
    as: {
      dataType: DataTypes.VARCHAR,
      length: 32,
    },
  },
  "CAST('Hi' AS VARCHAR(32))"
);

service.expectFunction(
  "CAST to INT",
  {
    function: Functions.CAST,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: 25.65,
    },
    as: {
      dataType: DataTypes.INT,
    },
  },
  "CAST(25.65 AS INT)"
);

// CONVERT
service.expectFunction(
  "CONVERT to INT",
  {
    function: Functions.CONVERT,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: 25.65,
    },
    as: {
      dataType: DataTypes.INT,
    },
  },
  "CONVERT(INT, 25.65)"
);

service.expectFunction(
  "CONVERT with style",
  {
    function: Functions.CONVERT,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "2017-08-25",
    },
    as: {
      dataType: DataTypes.VARCHAR,
    },
    style: {
      valueType: ValueTypes.RAW_VALUE,
      value: 101,
    },
  },
  "CONVERT(VARCHAR, '2017-08-25', 101)"
);
