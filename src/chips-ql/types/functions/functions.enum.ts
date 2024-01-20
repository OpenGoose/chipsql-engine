export enum Functions {
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
  UPPER = "upper",

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
