import { Functions } from "../../../../src/chips-ql/types/functions/functions.enum";
import { TimeInterval } from "../../../../src/chips-ql/types/intervals/time-interval.enum";
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
    separator: {
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

// LEFT SUBSTRING
service.expectFunction("LEFT SUBSTRING", {
  function: Functions.LEFT_SUBSTRING,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 'I wanna live to see The golden city',
  },
  length: {
    valueType: ValueTypes.RAW_VALUE,
    value: 10,
  }
}, "LEFT('I wanna live to see The golden city', 10)");

// RIGHT SUBSTRING
service.expectFunction("RIGHT SUBSTRING", {
  function: Functions.RIGHT_SUBSTRING,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 'Be safe around portals',
  },
  length: {
    valueType: ValueTypes.RAW_VALUE,
    value: 5,
  }
}, "RIGHT('Be safe around portals', 5)");

// LENGTH
service.expectFunction("RIGHT SUBSTRING", {
  function: Functions.LENGTH,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: "Don't make lemonade",
  },
}, "LEN('Don''t make lemonade')");

// TRIM
service.expectFunction("TRIM text", {
  function: Functions.TRIM,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: "  This is what happens  ",
  },
}, "TRIM('  This is what happens  ')");

// TRIM LEFT
service.expectFunction("TRIM LEFT text", {
  function: Functions.TRIM_LEFT,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: "  This is what happens",
  },
}, "LTRIM('  This is what happens')");

// TRIM RIGHT
service.expectFunction("TRIM RIGHT text", {
  function: Functions.TRIM_RIGHT,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: "This is what happens  ",
  },
}, "RTRIM('This is what happens  ')");

// MATH

// ABS
service.expectFunction("Math - ABS", {
  function: Functions.ABS,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: -16,
  },
}, "ABS(-16)");

// CEIL
service.expectFunction("Math - CEIL", {
  function: Functions.CEIL,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 12.15,
  },
}, "CEILING(12.15)");

// COS
service.expectFunction("Math - ABS", {
  function: Functions.COS,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 5,
  },
}, "COS(5)");

// EXP
service.expectFunction("Math - EXP", {
  function: Functions.EXP,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 10,
  },
}, "EXP(10)");

// FLOOR
service.expectFunction("Math - FLOOR", {
  function: Functions.FLOOR,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 9.99,
  },
}, "FLOOR(9.99)");

// LOG
service.expectFunction("Math - LOG", {
  function: Functions.LOG,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 22,
  },
}, "LOG(22)");

// PI
service.expectFunction("Math - PI", {
  function: Functions.PI,
}, "PI()");

// POWER
service.expectFunction("Math - ABS", {
  function: Functions.POWER,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 5,
  },
}, "POWER(5)");

// ROUND
service.expectFunction("Math - ROUND", {
  function: Functions.ROUND,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: -16,
  },
}, "ROUND(-16)");

// SIN
service.expectFunction("Math - SIN", {
  function: Functions.SIN,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 8,
  },
}, "SIN(8)");

// SQUARE ROOT
service.expectFunction("Math - SQUARE ROOT", {
  function: Functions.SQRT,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 16,
  },
}, "SQRT(16)");

// TANGENT
service.expectFunction("Math - TANGENT", {
  function: Functions.TAN,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: 55,
  },
}, "TAN(55)");

// TIME

service.expectFunction("Time - CURRENT_TIME", {
  function: Functions.CURRENT_TIME,
}, "CURRENT_TIMESTAMP");

service.expectFunction("Time - DATE DIFFERENCE", {
  function: Functions.DATE_DIFFERENCE,
  origin: {
    valueType: ValueTypes.RAW_VALUE,
    value: '2017/08/25',
  },
  target: {
    valueType: ValueTypes.RAW_VALUE,
    value: '2011/08/25',
  },
  interval: TimeInterval.YEAR,
}, "DATEDIFF(year, '2017/08/25', '2011/08/25')");

service.expectFunction("Time - DATE DIFFERENCE with default", {
  function: Functions.DATE_DIFFERENCE,
  origin: {
    valueType: ValueTypes.RAW_VALUE,
    value: '2017/08/25',
  },
  target: {
    valueType: ValueTypes.RAW_VALUE,
    value: '2011/08/25',
  },
}, "DATEDIFF(day, '2017/08/25', '2011/08/25')");

service.expectFunction("Time - DAY", {
  function: Functions.DAY,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: '2017/08/25',
  },
}, "DAY('2017/08/25')");

service.expectFunction("Math - MONTH", {
  function: Functions.MONTH,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: '2017/08/25',
  },
}, "MONTH('2017/08/25')");

service.expectFunction("Math - YEAR", {
  function: Functions.YEAR,
  value: {
    valueType: ValueTypes.RAW_VALUE,
    value: '2017/08/25',
  },
}, "YEAR('2017/08/25')");