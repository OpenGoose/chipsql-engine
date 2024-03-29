import { QueryType } from "../../../../src/chips-ql/types/queries/query.type";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { ExecutionWillFailException } from "../../../../src/errors/warnings/execution-will-fail.exception";
import { mssqlConstants } from "../../../../src/languages/mssql/constants/mssql.constants";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

service.expectQuery(
  "Basic INSERT statement",
  {
    queryType: QueryType.INSERT,
    into: {
      name: "customers",
      schema: "sales",
    },
    values: [
      [
        {
          field: "name",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Gloria",
          },
        },
        {
          field: "lastname",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Gaynor",
          },
        },
      ],
    ],
  },
  "INSERT INTO [sales].[customers] ([name], [lastname]) VALUES ('Gloria', 'Gaynor');"
);

service.expectQuery(
  "Basic batch INSERT statement",
  {
    queryType: QueryType.INSERT,
    into: {
      name: "customers",
      schema: "sales",
    },
    values: [
      [
        {
          field: "name",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Gloria",
          },
        },
        {
          field: "lastname",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Gaynor",
          },
        },
      ],
      [
        {
          field: "name",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Roxie",
          },
        },
        {
          field: "lastname",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Hart",
          },
        },
      ],
    ],
  },
  "INSERT INTO [sales].[customers] ([name], [lastname]) VALUES ('Gloria', 'Gaynor'), ('Roxie', 'Hart');"
);

service.expectQuery(
  "Basic batch INSERT statement",
  {
    queryType: QueryType.INSERT,
    into: {
      name: "customers",
      schema: "sales",
    },
    values: [
      [
        {
          field: "name",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Rick",
          },
        },
        {
          field: "lastname",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Sanchez",
          },
        },
        {
          field: "code",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "C-137",
          },
        },
      ],
      [
        {
          field: "lastname",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Smith",
          },
        },
        {
          field: "name",
          value: {
            valueType: ValueType.RAW_VALUE,
            value: "Morty",
          },
        },
      ],
    ],
  },
  "INSERT INTO [sales].[customers] ([name], [lastname], [code]) VALUES ('Rick', 'Sanchez', 'C-137'), ('Morty', 'Smith', NULL);"
);

service.expectException(
  "Basic INSERT exceding max batch INSERT size",
  {
    queryType: QueryType.INSERT,
    into: {
      name: "customers",
      schema: "sales",
    },
    // eslint-disable-next-line prefer-spread
    values: Array.apply(null, Array(mssqlConstants.BATCH_INSERT_MAX_SIZE + 1).map(() => [
      {
        field: "name",
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "Rick",
        },
      },
      {
        field: "lastname",
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "Sanchez",
        },
      },
      {
        field: "code",
        value: {
          valueType: ValueType.RAW_VALUE,
          value: "C-137",
        },
      },
    ])),
  },
  ExecutionWillFailException
);
