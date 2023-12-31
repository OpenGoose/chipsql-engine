import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperands } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { JoinerOperands } from "../../../../src/chips-ql/types/conditions/operands/joiner-operands.enum";
import { DataTypes } from "../../../../src/chips-ql/types/datatypes/datatypes.enum";
import { Functions } from "../../../../src/chips-ql/types/functions/functions.enum";
import { JoinDirections } from "../../../../src/chips-ql/types/joins/join-directions.enum";
import { JoinIncludes } from "../../../../src/chips-ql/types/joins/join-includes.enum";
import { JoinTypes } from "../../../../src/chips-ql/types/joins/join-types.enum";
import { LimitMode } from "../../../../src/chips-ql/types/limit/limit-mode.enum";
import { OrderDirection } from "../../../../src/chips-ql/types/order/order-direction.enum";
import { QueryTypes } from "../../../../src/chips-ql/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

service.expectQuery(
  "Generate SELECT ALL",
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
  "SELECT muliple fields",
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
  "SELECT multiple fields with aliases",
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
  "SELECT using COUNT function",
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
  "SELECT using custom function",
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
  "SELECT using subselect",
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

service.expectQuery(
  "SELECT with simple WHERE with escaping character",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.ALL_COLUMNS,
        tableAlias: "c",
      },
    ],
    from: [
      {
        name: "customers",
        alias: "c",
        schema: "sales",
      },
    ],
    where: {
      conditionType: ConditionType.JOINER,
      joinerOperand: JoinerOperands.OR,
      conditions: [
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperands.LIKE,
          sourceValue: {
            valueType: ValueTypes.COLUMN,
            tableAlias: "c",
            field: "email",
          },
          targetValue: {
            valueType: ValueTypes.RAW_VALUE,
            value: "%test@themineway.cat%",
          },
        },
        {
          conditionType: ConditionType.JOINER,
          joinerOperand: JoinerOperands.AND,
          conditions: [
            {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperands.EQUALS,
              sourceValue: {
                valueType: ValueTypes.COLUMN,
                field: "city",
                tableAlias: "c",
              },
              targetValue: {
                valueType: ValueTypes.RAW_VALUE,
                value: "ol' Baetulo",
              },
            },
            {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperands.NOT_EQUALS,
              sourceValue: {
                valueType: ValueTypes.COLUMN,
                tableAlias: "c",
                field: "phone",
              },
              targetValue: {
                valueType: ValueTypes.RAW_VALUE,
                value: "555 xx xx xx",
              },
            },
          ],
        },
      ],
    },
  },
  "SELECT [c].* FROM [sales].[customers] [c] WHERE ([c].[email] LIKE '%test@themineway.cat%' OR ([c].[city] = 'ol'' Baetulo' AND [c].[phone] != '555 xx xx xx'));"
);

service.expectQuery(
  "SELECT with INNER JOIN and IN statement",
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
        schema: "sales",
        alias: "c",
      },
    ],
    joins: [
      {
        joinType: JoinTypes.TABLE,
        include: JoinIncludes.INNER,
        table: {
          name: "orders",
          schema: "sales",
          alias: "o",
        },
        on: {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperands.EQUALS,
          sourceValue: {
            valueType: ValueTypes.COLUMN,
            field: "customer_id",
            tableAlias: "o",
          },
          targetValue: {
            valueType: ValueTypes.COLUMN,
            field: "customer_id",
            tableAlias: "c",
          },
        },
      },
    ],
    where: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.IN,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "store_id",
        tableAlias: "o",
      },
      targetValue: {
        valueType: ValueTypes.SET,
        values: [
          {
            valueType: ValueTypes.RAW_VALUE,
            value: 17,
          },
          {
            valueType: ValueTypes.RAW_VALUE,
            value: 14,
          },
        ],
      },
    },
  },
  "SELECT * FROM [sales].[customers] [c] INNER JOIN [sales].[orders] [o] ON [o].[customer_id] = [c].[customer_id] WHERE [o].[store_id] IN (17, 14);"
);

service.expectQuery(
  "SELECT using a WHERE statement and a SUBSELECT inside a SET using a TOP clause",
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
        schema: "sales",
        alias: "c",
      },
    ],
    where: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.IN,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "zip_code",
        tableAlias: "c",
      },
      targetValue: {
        valueType: ValueTypes.SET,
        values: [
          {
            valueType: ValueTypes.RAW_VALUE,
            value: "xxxxx",
          },
          {
            valueType: ValueTypes.SUBSELECT,
            fields: [
              {
                valueType: ValueTypes.COLUMN,
                field: "zip_code",
                tableAlias: "c2",
              },
            ],
            from: [
              {
                name: "customers",
                schema: "sales",
                alias: "c2",
              },
            ],
            where: {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperands.EQUALS,
              sourceValue: {
                valueType: ValueTypes.COLUMN,
                field: "email",
                tableAlias: "c2",
              },
              targetValue: {
                valueType: ValueTypes.RAW_VALUE,
                value: "x@themineway.cat",
              },
            },
            limit: {
              value: {
                valueType: ValueTypes.RAW_VALUE,
                value: 1,
              }
            },
          },
        ],
      },
    },
  },
  "SELECT * FROM [sales].[customers] [c] WHERE [c].[zip_code] IN ('xxxxx', (SELECT TOP 1 [c2].[zip_code] FROM [sales].[customers] [c2] WHERE [c2].[email] = 'x@themineway.cat'));"
);

service.expectQuery(
  "SELECT using a WHERE statement and a SUBSELECT inside a SET using a TOP clause in compact mode",
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
        schema: "sales",
        alias: "c",
      },
    ],
    where: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.IN,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "zip_code",
        tableAlias: "c",
      },
      targetValue: {
        valueType: ValueTypes.SET,
        values: [
          {
            valueType: ValueTypes.RAW_VALUE,
            value: "xxxxx",
          },
          {
            valueType: ValueTypes.SUBSELECT,
            fields: [
              {
                valueType: ValueTypes.COLUMN,
                field: "zip_code",
                tableAlias: "c2",
              },
            ],
            from: [
              {
                name: "customers",
                schema: "sales",
                alias: "c2",
              },
            ],
            where: {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperands.EQUALS,
              sourceValue: {
                valueType: ValueTypes.COLUMN,
                field: "email",
                tableAlias: "c2",
              },
              targetValue: {
                valueType: ValueTypes.RAW_VALUE,
                value: "x@themineway.cat",
              },
            },
            limit: {
              value: {
                valueType: ValueTypes.RAW_VALUE,
              value: 1,
              }
            },
          },
        ],
      },
    },
  },
  "SELECT * FROM [sales].[customers][c] WHERE [c].[zip_code] IN ('xxxxx',(SELECT TOP 1 [c2].[zip_code] FROM [sales].[customers][c2] WHERE [c2].[email] = 'x@themineway.cat'));",
  {
    compactQuery: true,
  }
);

service.expectQuery(
  "SELECT using ORDER BY, LIMIT and OFFSET",
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
        schema: "sales",
      },
    ],
    orderBy: [
      {
        direction: OrderDirection.DESC,
        field: {
          valueType: ValueTypes.COLUMN,
          field: "zip_code",
        },
      },
    ],
    limit: {
      value: {
        valueType: ValueTypes.RAW_VALUE,
        value: 25,
      }
    },
    offset: {
      valueType: ValueTypes.RAW_VALUE,
      value: 10,
    },
  },
  "SELECT * FROM [sales].[customers] ORDER BY [zip_code] DESC OFFSET 10 ROWS FETCH FIRST 25 ROWS ONLY;"
);

service.expectQuery(
  "SELECT with GROUP BY and COUNT",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "city",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.COUNT,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "customer_id",
          tableAlias: "c",
        },
        alias: "count",
      },
    ],
    from: [
      {
        name: "customers",
        schema: "sales",
        alias: "c",
      },
    ],
    groupBy: [
      {
        valueType: ValueTypes.COLUMN,
        field: "city",
        tableAlias: "c",
      },
    ],
  },
  "SELECT [c].[city], COUNT([c].[customer_id]) AS 'count' FROM [sales].[customers] [c] GROUP BY [c].[city];"
);

service.expectQuery(
  "SELECT with FULL OUTER JOIN",
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
        schema: "sales",
        alias: "c",
      },
    ],
    joins: [
      {
        joinType: JoinTypes.TABLE,
        table: {
          name: "orders",
          schema: "sales",
          alias: "o",
        },
        direction: JoinDirections.FULL,
        include: JoinIncludes.OUTER,
        on: {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperands.EQUALS,
          sourceValue: {
            valueType: ValueTypes.COLUMN,
            field: "customer_id",
            tableAlias: "o",
          },
          targetValue: {
            valueType: ValueTypes.COLUMN,
            field: "customer_id",
            tableAlias: "c",
          },
        },
      },
    ],
  },
  "SELECT * FROM [sales].[customers] [c] FULL OUTER JOIN [sales].[orders] [o] ON [o].[customer_id] = [c].[customer_id];"
);

service.expectQuery(
  "Generate SELECT ALL with SUBSELECT LEFT JOIN",
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
        alias: "c",
        schema: "sales",
      },
    ],
    joins: [
      {
        joinType: JoinTypes.SELECT,
        direction: JoinDirections.LEFT,
        select: {
          fields: [
            {
              valueType: ValueTypes.COLUMN,
              field: "customer_id",
              tableAlias: "o",
            },
          ],
          from: [
            {
              name: "orders",
              schema: "sales",
              alias: "o",
            },
          ],
        },
        on: {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperands.EQUALS,
          sourceValue: {
            valueType: ValueTypes.COLUMN,
            field: "customer_id",
            tableAlias: "o",
          },
          targetValue: {
            valueType: ValueTypes.COLUMN,
            field: "customer_id",
            tableAlias: "c",
          },
        },
        alias: "o",
      },
    ],
  },
  "SELECT * FROM [sales].[customers] [c] LEFT JOIN (SELECT [o].[customer_id] FROM [sales].[orders] [o]) [o] ON [o].[customer_id] = [c].[customer_id];"
);

service.expectQuery(
  "SELECT with GROUP BY and HAVING",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.COUNT,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "customer_id",
          tableAlias: "c",
        },
        alias: "count",
      },
    ],
    from: [
      {
        name: "customers",
        schema: "sales",
        alias: "c",
      },
    ],
    groupBy: [
      {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
    ],
    having: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.EQUALS,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      targetValue: {
        valueType: ValueTypes.FUNCTION,
        function: Functions.MAX,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "age",
          tableAlias: "c",
        },
      },
    },
  },
  "SELECT [c].[age], COUNT([c].[customer_id]) AS 'count' FROM [sales].[customers] [c] GROUP BY [c].[age] HAVING [c].[age] = MAX([c].[age]);"
);

service.expectQuery(
  "SELECT with multiple GROUP BY",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.COLUMN,
        field: "state",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.COUNT,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "customer_id",
          tableAlias: "c",
        },
        alias: "count",
      },
    ],
    from: [
      {
        name: "customers",
        schema: "sales",
        alias: "c",
      },
    ],
    groupBy: [
      {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.COLUMN,
        field: "state",
        tableAlias: "c",
      },
    ],
  },
  "SELECT [c].[age], [c].[state], COUNT([c].[customer_id]) AS 'count' FROM [sales].[customers] [c] GROUP BY [c].[age], [c].[state];"
);

service.expectQuery(
  "SELECT with multiple GROUP BY in compact mode and without semicolon",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.COLUMN,
        field: "state",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.COUNT,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "customer_id",
          tableAlias: "c",
        },
        alias: "count",
      },
    ],
    from: [
      {
        name: "customers",
        schema: "sales",
        alias: "c",
      },
    ],
    groupBy: [
      {
        valueType: ValueTypes.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueTypes.COLUMN,
        field: "state",
        tableAlias: "c",
      },
    ],
  },
  "SELECT [c].[age],[c].[state],COUNT([c].[customer_id]) AS 'count' FROM [sales].[customers][c] GROUP BY [c].[age],[c].[state]",
  {
    compactQuery: true,
    endWithSemicolon: false,
  }
);

service.expectQuery('SELECT with PERCENT in TOP statement', {
  queryType: QueryTypes.SELECT,
  fields: [
    {
      valueType: ValueTypes.ALL_COLUMNS,
    }
  ],
  from: [
    {
      name: 'customers',
      alias: 'c',
      schema: 'sales',
    }
  ],
  limit: {
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: 50
    },
    limitMode: LimitMode.PERCENT,
  }
}, 'SELECT TOP 50 PERCENT * FROM [sales].[customers] [c];')

service.expectQuery(
  "Generate SELECT ALL into another table",
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
    into: {
      name: "new_customers",
      schema: "sales",
    },
  },
  "SELECT * INTO [sales].[new_customers] FROM [customers];"
);

service.expectQuery(
  "Generate SELECT ALL with multiple escaping",
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
        schema: "sales",
      },
    ],
    where: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperands.EQUALS,
      sourceValue: {
        valueType: ValueTypes.COLUMN,
        field: "first_name",
      },
      targetValue: {
        valueType: ValueTypes.RAW_VALUE,
        value: "Ol' L'Àvia",
      },
    },
  },
  "SELECT * FROM [sales].[customers] WHERE [first_name] = 'Ol'' L''Àvia';"
);

service.expectQuery(
  "Generate SELECT with ALL datatypes",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "HI",
        alias: "name",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: true,
        alias: "'SQL' injection free?",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: false,
        alias: "Does ChipsQL require payment?",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: {
          type: DataTypes.DATE,
          includeTime: true,
          date: new Date("2023-09-03 22:06:00"),
        },
        alias: "Commit datetime",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: {
          type: DataTypes.DATE,
          date: new Date("2023-09-03"),
        },
        alias: "Commit date",
      },
    ],
    from: [
      {
        name: "customers",
        schema: "sales",
      },
    ],
  },
  "SELECT 'HI' AS 'name', 1 AS '''SQL'' injection free?', 0 AS 'Does ChipsQL require payment?', '2023-09-03 22:06:00' AS 'Commit datetime', '2023-09-03' AS 'Commit date' FROM [sales].[customers];"
);

service.expectQuery(
  "Generate SELECT age as VARCHAR(127), age as VARCHAR(MAX), AND birthday as DATE",
  {
    queryType: QueryTypes.SELECT,
    fields: [
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.CAST,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "age",
        },
        as: {
          dataType: DataTypes.VARCHAR,
          length: 127,
        },
        alias: "age",
      },
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.CAST,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "age",
        },
        as: {
          dataType: DataTypes.VARCHAR,
          length: Infinity,
        },
        alias: "age",
      },
      {
        valueType: ValueTypes.FUNCTION,
        function: Functions.CAST,
        value: {
          valueType: ValueTypes.COLUMN,
          field: "birthday",
        },
        as: {
          dataType: DataTypes.DATE,
        },
        alias: "birthday",
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
  },
  "SELECT CAST([age] AS VARCHAR(127)) AS 'age', CAST([age] AS VARCHAR(MAX)) AS 'age', CAST([birthday] AS DATE) AS 'birthday' FROM [customers];"
);