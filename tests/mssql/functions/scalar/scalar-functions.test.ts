import { Function } from "../../../../src/chips-ql/types/functions/functions.enum";
import { TimeInterval } from "../../../../src/chips-ql/types/intervals/time-interval.enum";
import { ValueType } from "../../../../src/chips-ql/types/values/value.type";
import { SqlLanguage } from "../../../../src/sql/sql-languages.enum";
import { TestService } from "../../../test.service";

const service = new TestService(SqlLanguage.MSSQL);

// ASCII
service.expectFunction(
  "ASCII function",
  {
    function: Function.ASCII,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "Hi!",
    },
  },
  "ASCII('Hi!')"
);

// CHAR
service.expectFunction(
  "CHAR function",
  {
    function: Function.CHAR,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: 1,
    },
  },
  "CHAR(1)"
);

// FIND_INDEX
service.expectFunction(
  "FIND_INDEX function",
  {
    function: Function.FIND_INDEX,
    find: {
      valueType: ValueType.RAW_VALUE,
      value: "p",
    },
    on: {
      valueType: ValueType.RAW_VALUE,
      value: "programmer",
    },
  },
  "CHARINDEX('p', 'programmer')"
);
service.expectFunction(
  "FIND_INDEX function with startAt",
  {
    function: Function.FIND_INDEX,
    find: {
      valueType: ValueType.RAW_VALUE,
      value: "p",
    },
    on: {
      valueType: ValueType.RAW_VALUE,
      value: "programmer",
    },
    startAt: {
      valueType: ValueType.RAW_VALUE,
      value: 2,
    },
  },
  "CHARINDEX('p', 'programmer', 2)"
);

// CONCAT
service.expectFunction(
  "CONCAT function",
  {
    function: Function.CONCAT,
    values: [
      {
        valueType: ValueType.RAW_VALUE,
        value: "Hi! ",
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: "Have ",
      },
      {
        valueType: ValueType.SUBSELECT,
        fields: [
          {
            valueType: ValueType.RAW_VALUE,
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
            valueType: ValueType.RAW_VALUE,
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
    function: Function.JOIN,
    separator: {
      valueType: ValueType.RAW_VALUE,
      value: ">",
    },
    values: [
      {
        valueType: ValueType.RAW_VALUE,
        value: "TS",
      },
      {
        valueType: ValueType.RAW_VALUE,
        value: "JS",
      },
    ],
  },
  "CONCAT_WS('>', 'TS', 'JS')"
);
service.expectFunction(
  "JOIN function behaving as CONCAT",
  {
    function: Function.JOIN,
    values: [
      {
        valueType: ValueType.RAW_VALUE,
        value: "TS",
      },
      {
        valueType: ValueType.RAW_VALUE,
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
    function: Function.BYTES_LENGTH,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "TMW",
    },
  },
  "DATALENGTH('TMW')"
);

// LOWER
service.expectFunction(
  "LOWER function",
  {
    function: Function.LOWER,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "TMW",
    },
  },
  "LOWER('TMW')"
);

// UPPER
service.expectFunction(
  "UPPER function",
  {
    function: Function.UPPER,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "TMW",
    },
  },
  "UPPER('TMW')"
);

// DIFFERENCE
service.expectFunction(
  "DIFFERENCE function",
  {
    function: Function.DIFFERENCE,
    origin: {
      valueType: ValueType.RAW_VALUE,
      value: "irumyuui",
    },
    target: {
      valueType: ValueType.RAW_VALUE,
      value: "iruburu"
    }
  },
  "DIFFERENCE('irumyuui', 'iruburu')"
);

// FORMAT
service.expectFunction(
  "FORMAT function",
  {
    function: Function.FORMAT,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "11/09/1714",
    },
    format: {
      valueType: ValueType.RAW_VALUE,
      value: "d"
    }
  },
  "FORMAT('11/09/1714', 'd')"
);

// FORMAT
service.expectFunction(
  "FORMAT function using en-US culture",
  {
    function: Function.FORMAT,
    value: {
      valueType: ValueType.RAW_VALUE,
      value: "11/09/1714",
    },
    format: {
      valueType: ValueType.RAW_VALUE,
      value: "d"
    },
    culture: {
      valueType: ValueType.RAW_VALUE,
      value: "en-US"
    }
  },
  "FORMAT('11/09/1714', 'd', 'en-US')"
);

// LEFT SUBSTRING
service.expectFunction("LEFT SUBSTRING", {
  function: Function.LEFT_SUBSTRING,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 'I wanna live to see The golden city',
  },
  length: {
    valueType: ValueType.RAW_VALUE,
    value: 10,
  }
}, "LEFT('I wanna live to see The golden city', 10)");

// RIGHT SUBSTRING
service.expectFunction("RIGHT SUBSTRING", {
  function: Function.RIGHT_SUBSTRING,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 'Be safe around portals',
  },
  length: {
    valueType: ValueType.RAW_VALUE,
    value: 5,
  }
}, "RIGHT('Be safe around portals', 5)");

// LENGTH
service.expectFunction("RIGHT SUBSTRING", {
  function: Function.LENGTH,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: "Don't make lemonade",
  },
}, "LEN('Don''t make lemonade')");

// TRIM
service.expectFunction("TRIM text", {
  function: Function.TRIM,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: "  This is what happens  ",
  },
}, "TRIM('  This is what happens  ')");

// TRIM LEFT
service.expectFunction("TRIM LEFT text", {
  function: Function.TRIM_LEFT,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: "  This is what happens",
  },
}, "LTRIM('  This is what happens')");

// TRIM RIGHT
service.expectFunction("TRIM RIGHT text", {
  function: Function.TRIM_RIGHT,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: "This is what happens  ",
  },
}, "RTRIM('This is what happens  ')");

// MATH

// ABS
service.expectFunction("Math - ABS", {
  function: Function.ABS,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: -16,
  },
}, "ABS(-16)");

// CEIL
service.expectFunction("Math - CEIL", {
  function: Function.CEIL,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 12.15,
  },
}, "CEILING(12.15)");

// COS
service.expectFunction("Math - ABS", {
  function: Function.COS,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 5,
  },
}, "COS(5)");

// EXP
service.expectFunction("Math - EXP", {
  function: Function.EXP,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 10,
  },
}, "EXP(10)");

// FLOOR
service.expectFunction("Math - FLOOR", {
  function: Function.FLOOR,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 9.99,
  },
}, "FLOOR(9.99)");

// LOG
service.expectFunction("Math - LOG", {
  function: Function.LOG,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 22,
  },
}, "LOG(22)");

// PI
service.expectFunction("Math - PI", {
  function: Function.PI,
}, "PI()");

// POWER
service.expectFunction("Math - ABS", {
  function: Function.POWER,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 5,
  },
}, "POWER(5)");

// ROUND
service.expectFunction("Math - ROUND", {
  function: Function.ROUND,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: -16,
  },
}, "ROUND(-16)");

// SIN
service.expectFunction("Math - SIN", {
  function: Function.SIN,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 8,
  },
}, "SIN(8)");

// SQUARE ROOT
service.expectFunction("Math - SQUARE ROOT", {
  function: Function.SQRT,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 16,
  },
}, "SQRT(16)");

// TANGENT
service.expectFunction("Math - TANGENT", {
  function: Function.TAN,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: 55,
  },
}, "TAN(55)");

// TIME

service.expectFunction("Time - CURRENT_TIME", {
  function: Function.CURRENT_TIME,
}, "CURRENT_TIMESTAMP");

service.expectFunction("Time - DATE DIFFERENCE", {
  function: Function.DATE_DIFFERENCE,
  origin: {
    valueType: ValueType.RAW_VALUE,
    value: '2017/08/25',
  },
  target: {
    valueType: ValueType.RAW_VALUE,
    value: '2011/08/25',
  },
  interval: TimeInterval.YEAR,
}, "DATEDIFF(year, '2017/08/25', '2011/08/25')");

service.expectFunction("Time - DATE DIFFERENCE with default", {
  function: Function.DATE_DIFFERENCE,
  origin: {
    valueType: ValueType.RAW_VALUE,
    value: '2017/08/25',
  },
  target: {
    valueType: ValueType.RAW_VALUE,
    value: '2011/08/25',
  },
}, "DATEDIFF(day, '2017/08/25', '2011/08/25')");

service.expectFunction("Time - DAY", {
  function: Function.DAY,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: '2017/08/25',
  },
}, "DAY('2017/08/25')");

service.expectFunction("Math - MONTH", {
  function: Function.MONTH,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: '2017/08/25',
  },
}, "MONTH('2017/08/25')");

service.expectFunction("Math - YEAR", {
  function: Function.YEAR,
  value: {
    valueType: ValueType.RAW_VALUE,
    value: '2017/08/25',
  },
}, "YEAR('2017/08/25')");