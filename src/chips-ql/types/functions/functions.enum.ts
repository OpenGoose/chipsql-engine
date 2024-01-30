export enum Function {
  // AGGREGATE
  COUNT = "count",
  MAX = "max",
  MIN = "min",

  // SCALAR
  ASCII = "ascii",
  BYTES_LENGTH = "bytes_length",
  CHAR = "char",
  CONCAT = "concat",
  DIFFERENCE = "difference",
  FORMAT = 'format',
  FIND_INDEX = "find_index",
  JOIN = "join",
  LENGTH = 'length',
  LOWER = "lower",
  LEFT_SUBSTRING = 'left_substring',
  RIGHT_SUBSTRING = 'right_substring',
  TRIM_LEFT = 'trim_left',
  TRIM_RIGHT = 'trim_right',
  TRIM = 'trim',
  UPPER = "upper",

  // SCALAR - MATH
  ABS = 'abs',
  CEIL = 'ceil',
  COS = 'cos',
  EXP = 'exp',
  FLOOR = 'floor',
  LOG = 'log',
  PI = 'pi',
  POWER = 'power',
  ROUND = 'round',
  SIN = 'sin',
  SQRT = 'sqrt',
  TAN = 'tan',

  // SCALAR - TIME
  CURRENT_TIME = 'current_time',
  DATE_DIFFERENCE = 'date_difference',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  

  // Conditionals
  COALESCE = "coalesce",
  IF = "if",
  IF_NULL = "if_null",

  // Casting
  CAST = "cast",
  CONVERT = "convert",

  // CUSTOM
  CUSTOM = "custom",
}
