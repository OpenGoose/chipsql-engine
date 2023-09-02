import { QueryTypes } from "../../../../src/chips-lq/types/queries/query.type";
import { ValueTypes } from "../../../../src/chips-lq/types/values/value.type";
import { MssqlCompiler } from "../../../../src/compiler/query/mssql/mssql.compiler";
import { WarningLevels } from "../../../../src/warnings/warning-levels.enum";

test("ORDER BY is required when using OFFSET", () => {
  const warnings = MssqlCompiler.processQueryWarnings({
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
    offset: {
      valueType: ValueTypes.RAW_VALUE,
      value: 10,
    },
  });

  expect(warnings.warnings.length).toBe(1);
  expect(
    warnings.warnings.find(
      (w) =>
        w.level === WarningLevels.EXECUTION_WILL_FAIL &&
        w.message === "ORDER BY is required when using OFFSET"
    )
  ).toBeTruthy();
});
