import { ConditionType } from "../../../../src/chips-ql/types/conditions/condition-type.enum";
import { ConditionOperand } from "../../../../src/chips-ql/types/conditions/operands/condition-operands.enum";
import { JoinerOperand } from "../../../../src/chips-ql/types/conditions/operands/joiner-operands.enum";
import { DataType } from "../../../../src/chips-ql/types/datatypes/datatypes.enum";
import { Function } from "../../../../src/chips-ql/types/functions/functions.enum";
import { JoinDirection } from "../../../../src/chips-ql/types/joins/join-directions.enum";
import { JoinInclude } from "../../../../src/chips-ql/types/joins/join-includes.enum";
import { JoinType } from "../../../../src/chips-ql/types/joins/join-types.enum";
import { LimitMode } from "../../../../src/chips-ql/types/limit/limit-mode.enum";
import { OrderDirection } from "../../../../src/chips-ql/types/order/order-direction.enum";
import { QueryType } from "../../../../src/chips-ql/types/queries/query.type";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

service.expectQuery(
  "Generate SELECT ALL",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
  "SELECT multiple fields",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.COLUMN,
        field: "first_name",
        alias: "name",
      },
      {
        valueType: ValueType.RAW_VALUE,
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
  "SELECT using DISTINCT",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.COLUMN,
        field: "first_name",
        alias: "name",
        distinct: true,
      },
    ],
    from: [
      {
        name: "customers",
      },
    ],
  },
  "SELECT DISTINCT [first_name] AS 'name' FROM [customers];"
);

service.expectQuery(
  "SELECT multiple fields with aliases",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.COLUMN,
        field: "customer_id",
        tableAlias: "c",
      },
      {
        valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.FUNCTION,
        function: Function.COUNT,
        value: {
          valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.FUNCTION,
        function: Function.CUSTOM,
        name: "COUNT",
        parameters: [
          {
            valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.COLUMN,
        field: "first_name",
        alias: "name",
        tableAlias: "c",
      },
      {
        valueType: ValueType.SUBSELECT,
        fields: [
          {
            valueType: ValueType.FUNCTION,
            function: Function.COUNT,
            value: {
              valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
      joinerOperand: JoinerOperand.OR,
      conditions: [
        {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperand.LIKE,
          sourceValue: {
            valueType: ValueType.COLUMN,
            tableAlias: "c",
            field: "email",
          },
          targetValue: {
            valueType: ValueType.RAW_VALUE,
            value: "%test@themineway.cat%",
          },
        },
        {
          conditionType: ConditionType.JOINER,
          joinerOperand: JoinerOperand.AND,
          conditions: [
            {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperand.EQUALS,
              sourceValue: {
                valueType: ValueType.COLUMN,
                field: "city",
                tableAlias: "c",
              },
              targetValue: {
                valueType: ValueType.RAW_VALUE,
                value: "ol' Baetulo",
              },
            },
            {
              conditionType: ConditionType.CONDITION,
              conditionOperand: ConditionOperand.NOT_EQUALS,
              sourceValue: {
                valueType: ValueType.COLUMN,
                tableAlias: "c",
                field: "phone",
              },
              targetValue: {
                valueType: ValueType.RAW_VALUE,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
        joinType: JoinType.TABLE,
        include: JoinInclude.INNER,
        table: {
          name: "orders",
          schema: "sales",
          alias: "o",
        },
        on: {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperand.EQUALS,
          sourceValue: {
            valueType: ValueType.COLUMN,
            field: "customer_id",
            tableAlias: "o",
          },
          targetValue: {
            valueType: ValueType.COLUMN,
            field: "customer_id",
            tableAlias: "c",
          },
        },
      },
    ],
    where: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperand.IN,
      sourceValue: {
        valueType: ValueType.COLUMN,
        field: "store_id",
        tableAlias: "o",
      },
      targetValue: {
        valueType: ValueType.SET,
        values: [
          {
            valueType: ValueType.RAW_VALUE,
            value: 17,
          },
          {
            valueType: ValueType.RAW_VALUE,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
      conditionOperand: ConditionOperand.IN,
      sourceValue: {
        valueType: ValueType.COLUMN,
        field: "zip_code",
        tableAlias: "c",
      },
      targetValue: {
        valueType: ValueType.SET,
        values: [
          {
            valueType: ValueType.RAW_VALUE,
            value: "xxxxx",
          },
          {
            valueType: ValueType.SUBSELECT,
            fields: [
              {
                valueType: ValueType.COLUMN,
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
              conditionOperand: ConditionOperand.EQUALS,
              sourceValue: {
                valueType: ValueType.COLUMN,
                field: "email",
                tableAlias: "c2",
              },
              targetValue: {
                valueType: ValueType.RAW_VALUE,
                value: "x@themineway.cat",
              },
            },
            limit: {
              value: {
                valueType: ValueType.RAW_VALUE,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
      conditionOperand: ConditionOperand.IN,
      sourceValue: {
        valueType: ValueType.COLUMN,
        field: "zip_code",
        tableAlias: "c",
      },
      targetValue: {
        valueType: ValueType.SET,
        values: [
          {
            valueType: ValueType.RAW_VALUE,
            value: "xxxxx",
          },
          {
            valueType: ValueType.SUBSELECT,
            fields: [
              {
                valueType: ValueType.COLUMN,
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
              conditionOperand: ConditionOperand.EQUALS,
              sourceValue: {
                valueType: ValueType.COLUMN,
                field: "email",
                tableAlias: "c2",
              },
              targetValue: {
                valueType: ValueType.RAW_VALUE,
                value: "x@themineway.cat",
              },
            },
            limit: {
              value: {
                valueType: ValueType.RAW_VALUE,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
          valueType: ValueType.COLUMN,
          field: "zip_code",
        },
      },
    ],
    limit: {
      value: {
        valueType: ValueType.RAW_VALUE,
        value: 25,
      }
    },
    offset: {
      valueType: ValueType.RAW_VALUE,
      value: 10,
    },
  },
  "SELECT * FROM [sales].[customers] ORDER BY [zip_code] DESC OFFSET 10 ROWS FETCH FIRST 25 ROWS ONLY;"
);

service.expectQuery(
  "SELECT with GROUP BY and COUNT",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.COLUMN,
        field: "city",
        tableAlias: "c",
      },
      {
        valueType: ValueType.FUNCTION,
        function: Function.COUNT,
        value: {
          valueType: ValueType.COLUMN,
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
        valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
        joinType: JoinType.TABLE,
        table: {
          name: "orders",
          schema: "sales",
          alias: "o",
        },
        direction: JoinDirection.FULL,
        include: JoinInclude.OUTER,
        on: {
          conditionType: ConditionType.CONDITION,
          conditionOperand: ConditionOperand.EQUALS,
          sourceValue: {
            valueType: ValueType.COLUMN,
            field: "customer_id",
            tableAlias: "o",
          },
          targetValue: {
            valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
        joinType: JoinType.SELECT,
        direction: JoinDirection.LEFT,
        select: {
          fields: [
            {
              valueType: ValueType.COLUMN,
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
          conditionOperand: ConditionOperand.EQUALS,
          sourceValue: {
            valueType: ValueType.COLUMN,
            field: "customer_id",
            tableAlias: "o",
          },
          targetValue: {
            valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueType.FUNCTION,
        function: Function.COUNT,
        value: {
          valueType: ValueType.COLUMN,
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
        valueType: ValueType.COLUMN,
        field: "age",
        tableAlias: "c",
      },
    ],
    having: {
      conditionType: ConditionType.CONDITION,
      conditionOperand: ConditionOperand.EQUALS,
      sourceValue: {
        valueType: ValueType.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      targetValue: {
        valueType: ValueType.FUNCTION,
        function: Function.MAX,
        value: {
          valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueType.COLUMN,
        field: "state",
        tableAlias: "c",
      },
      {
        valueType: ValueType.FUNCTION,
        function: Function.COUNT,
        value: {
          valueType: ValueType.COLUMN,
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
        valueType: ValueType.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueType.COLUMN,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueType.COLUMN,
        field: "state",
        tableAlias: "c",
      },
      {
        valueType: ValueType.FUNCTION,
        function: Function.COUNT,
        value: {
          valueType: ValueType.COLUMN,
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
        valueType: ValueType.COLUMN,
        field: "age",
        tableAlias: "c",
      },
      {
        valueType: ValueType.COLUMN,
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
  queryType: QueryType.SELECT,
  fields: [
    {
      valueType: ValueType.ALL_COLUMNS,
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
      valueType: ValueType.RAW_VALUE,
      value: 50
    },
    limitMode: LimitMode.PERCENT,
  }
}, 'SELECT TOP 50 PERCENT * FROM [sales].[customers] [c];')

service.expectQuery(
  "Generate SELECT ALL into another table",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.ALL_COLUMNS,
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
      conditionOperand: ConditionOperand.EQUALS,
      sourceValue: {
        valueType: ValueType.COLUMN,
        field: "first_name",
      },
      targetValue: {
        valueType: ValueType.RAW_VALUE,
        value: "Ol' L'Àvia",
      },
    },
  },
  "SELECT * FROM [sales].[customers] WHERE [first_name] = 'Ol'' L''Àvia';"
);

service.expectQuery(
  "Generate SELECT with ALL datatypes",
  {
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.RAW_VALUE,
        value: "HI",
        alias: "name",
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: true,
        alias: "'SQL' injection free?",
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: false,
        alias: "Does ChipsQL require payment?",
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: {
          type: DataType.DATE,
          includeTime: true,
          date: new Date("2023-09-03 22:06:00"),
        },
        alias: "Commit datetime",
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: {
          type: DataType.DATE,
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
    queryType: QueryType.SELECT,
    fields: [
      {
        valueType: ValueType.FUNCTION,
        function: Function.CAST,
        value: {
          valueType: ValueType.COLUMN,
          field: "age",
        },
        as: {
          dataType: DataType.STRING,
          length: 127,
        },
        alias: "age",
      },
      {
        valueType: ValueType.FUNCTION,
        function: Function.CAST,
        value: {
          valueType: ValueType.COLUMN,
          field: "age",
        },
        as: {
          dataType: DataType.STRING,
          length: Infinity,
        },
        alias: "age",
      },
      {
        valueType: ValueType.FUNCTION,
        function: Function.CAST,
        value: {
          valueType: ValueType.COLUMN,
          field: "birthday",
        },
        as: {
          dataType: DataType.DATE,
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