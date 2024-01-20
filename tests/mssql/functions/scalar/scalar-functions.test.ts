import { Functions } from "../../../../src/chips-ql/types/functions/functions.enum";
import { ValueTypes } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguages } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguages.MSSQL);

// ASCII
service.expectFunction(
  "ASCII function",
  {
    function: Functions.ASCII,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "Hi!",
    },
  },
  "ASCII('Hi!')"
);

// CHAR
service.expectFunction(
  "CHAR function",
  {
    function: Functions.CHAR,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: 1,
    },
  },
  "CHAR(1)"
);

// FIND_INDEX
service.expectFunction(
  "FIND_INDEX function",
  {
    function: Functions.FIND_INDEX,
    find: {
      valueType: ValueTypes.RAW_VALUE,
      value: "p",
    },
    on: {
      valueType: ValueTypes.RAW_VALUE,
      value: "programmer",
    },
  },
  "CHARINDEX('p', 'programmer')"
);
service.expectFunction(
  "FIND_INDEX function with startAt",
  {
    function: Functions.FIND_INDEX,
    find: {
      valueType: ValueTypes.RAW_VALUE,
      value: "p",
    },
    on: {
      valueType: ValueTypes.RAW_VALUE,
      value: "programmer",
    },
    startAt: {
      valueType: ValueTypes.RAW_VALUE,
      value: 2,
    },
  },
  "CHARINDEX('p', 'programmer', 2)"
);

// CONCAT
service.expectFunction(
  "CONCAT function",
  {
    function: Functions.CONCAT,
    values: [
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "Hi! ",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "Have ",
      },
      {
        valueType: ValueTypes.SUBSELECT,
        fields: [
          {
            valueType: ValueTypes.RAW_VALUE,
            value: "a nice day!",
            alias: "sentence",
          },
        ],
        from: [
          {
            name: "test_table",
          },
        ],
        limit: {
          value: {
            valueType: ValueTypes.RAW_VALUE,
            value: 1,
          },
        },
      },
    ],
  },
  "CONCAT('Hi! ', 'Have ', (SELECT TOP 1 'a nice day!' AS 'sentence' FROM [test_table]))"
);

// JOIN
service.expectFunction(
  "JOIN function",
  {
    function: Functions.JOIN,
    sepparator: {
      valueType: ValueTypes.RAW_VALUE,
      value: ">",
    },
    values: [
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "TS",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "JS",
      },
    ],
  },
  "CONCAT_WS('>', 'TS', 'JS')"
);
service.expectFunction(
  "JOIN function behaving as CONCAT",
  {
    function: Functions.JOIN,
    values: [
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "TS",
      },
      {
        valueType: ValueTypes.RAW_VALUE,
        value: "JS",
      },
    ],
  },
  "CONCAT('TS', 'JS')"
);

// BYTES_LENGTH
service.expectFunction(
  "BYTES_LENGTH function",
  {
    function: Functions.BYTES_LENGTH,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "TMW",
    },
  },
  "DATALENGTH('TMW')"
);

// LOWER
service.expectFunction(
  "LOWER function",
  {
    function: Functions.LOWER,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "TMW",
    },
  },
  "LOWER('TMW')"
);

// UPPER
service.expectFunction(
  "UPPER function",
  {
    function: Functions.UPPER,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "TMW",
    },
  },
  "UPPER('TMW')"
);

// DIFFERENCE
service.expectFunction(
  "DIFFERENCE function",
  {
    function: Functions.DIFFERENCE,
    origin: {
      valueType: ValueTypes.RAW_VALUE,
      value: "irumyuui",
    },
    target: {
      valueType: ValueTypes.RAW_VALUE,
      value: "iruburu"
    }
  },
  "DIFFERENCE('irumyuui', 'iruburu')"
);

// FORMAT
service.expectFunction(
  "FORMAT function",
  {
    function: Functions.FORMAT,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "11/09/1714",
    },
    format: {
      valueType: ValueTypes.RAW_VALUE,
      value: "d"
    }
  },
  "FORMAT('11/09/1714', 'd')"
);

// FORMAT
service.expectFunction(
  "FORMAT function using en-US culture",
  {
    function: Functions.FORMAT,
    value: {
      valueType: ValueTypes.RAW_VALUE,
      value: "11/09/1714",
    },
    format: {
      valueType: ValueTypes.RAW_VALUE,
      value: "d"
    },
    culture: {
      valueType: ValueTypes.RAW_VALUE,
      value: "en-US"
    }
  },
  "FORMAT('11/09/1714', 'd', 'en-US')"
);