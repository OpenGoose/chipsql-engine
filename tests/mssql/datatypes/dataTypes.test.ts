import { DataTypes } from "../../../src/chips-lq/types/datatypes/datatypes.enum";
import { ValueTypes } from "../../../src/chips-lq/types/values/value.type";
import { SqlLanguages } from "../../../src/sql/sql-languages.enum";
import { TestService } from "../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectDataType('VARCHAR', {
    dataType: DataTypes.VARCHAR
}, 'VARCHAR');

service.expectDataType(
  "VARCHAR (length = 12)",
  {
    dataType: DataTypes.VARCHAR,
    length: 12
  },
  "VARCHAR(12)"
);

service.expectDataType(
  "VARCHAR (length = MAX)",
  {
    dataType: DataTypes.VARCHAR,
    length: Infinity,
  },
  "VARCHAR(MAX)"
);

service.expectDataType('DATETIME', {
    dataType: DataTypes.DATE,
    includeTime: true,
}, 'DATETIME2');

service.expectDataType(
  "DATE",
  {
    dataType: DataTypes.DATE,
  },
  "DATE"
);

service.expectDataType(
  "Custom dataType",
  {
    dataType: DataTypes.CUSTOM,
    name: "STRING",
    parameters: [
      {
        valueType: ValueTypes.RAW_VALUE,
        value: 127,
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: 0,
      },
    ],
  },
  "STRING(127, 0)"
);