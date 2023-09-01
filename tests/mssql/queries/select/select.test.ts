import { Functions } from "../../../../src/chips-lq/types/functions/functions.enum";
import { QueryTypes } from "../../../../src/chips-lq/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-lq/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectQuery(
  "Generate select all",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
  },
  "SELECT * FROM [customers];"
);

service.expectQuery(
  "Select muliple fields",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "first_name",
        alias: "name",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "TheMineWay",
        alias: "admin",
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
  },
  "SELECT [first_name] AS 'name', 'TheMineWay' AS 'admin' FROM [customers];"
);

service.expectQuery(
  "Select multiple fields with aliases",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "customer_id",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.COLUMN,
        field: "order_id",
        tableAlias: "o",
      },
    ],
    from: [
      {
        name: "customers",
        alias: "c",
      },
      {
        name: "orders",
        alias: "o",
        schema: "sales",
      },
    ],
  },
  "SELECT [c].[customer_id], [o].[order_id] FROM [customers] [c], [sales].[orders] [o];"
);

service.expectQuery(
  "Select using COUNT function",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.COUNT,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "store_id",
          tableAlias: "s",
        },
        alias: "stores_count",
      },
    ],
    from: [
      {
        name: "stores",
        schema: "sales",
        alias: "s",
      },
    ],
  },
  "SELECT COUNT([s].[store_id]) AS 'stores_count' FROM [sales].[stores] [s];"
);

service.expectQuery(
  "Select using custom function",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.CUSTOM,
        name: "COUNT",
        parameters: [
          {
            valueType: ValueTypes.COLUMN,
            field: "store_id",
            tableAlias: "s",
          },
        ],
        alias: "stores_count",
      },
    ],
    from: [
      {
        name: "stores",
        schema: "sales",
        alias: "s",
      },
    ],
  },
  "SELECT COUNT([s].[store_id]) AS 'stores_count' FROM [sales].[stores] [s];"
);

service.expectQuery(
  "Query using subselect",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "first_name",
        alias: "name",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.SUBSELECT,
        fields: [
          {
            valueType: ValueTypes.FUNCTION,
            function: Functions.COUNT,
            value: {
              valueType: ValueTypes.COLUMN,
              field: "order_id",
              tableAlias: "o",
            },
          },
        ],
        from: [
          {
            name: "orders",
            alias: "o",
            schema: "sales",
          },
        ],
        alias: "count",
      },
    ],
    from: [
      {
        name: "customers",
        alias: "c",
        schema: "sales",
      },
    ],
  },
  "SELECT [c].[first_name] AS 'name', (SELECT COUNT([o].[order_id]) FROM [sales].[orders] [o]) AS 'count' FROM [sales].[customers] [c];"
);
