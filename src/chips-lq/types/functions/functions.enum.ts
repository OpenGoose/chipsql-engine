export enum Functions {
  // AGGREGATE
  MAX = "max",
  MIN = "min",
  COUNT = "count",

  // SCALAR
  ASCII = "ascii",
  CHAR = "char",
  FIND_INDEX = "find_index",
  CONCAT = "concat",
  JOIN = 'join',
  BYTES_LENGTH = 'bytes_length',
  LOWER = "lower",
  UPPER = "upper",

  // Conditionals
  IF = "if",
  COALESCE = "coalesce",

  // Casting
  CAST = "cast",

  // CUSTOM
  CUSTOM = "custom",
}