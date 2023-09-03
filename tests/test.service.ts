import { compile } from "../src";
import { Query } from "../src/chips-lq/types/queries/query.type";
import { UnavailableFeatureError } from "../src/compiler/features/unavailable-feature.error";
import { MssqlCompiler } from "../src/compiler/query/mssql/mssql.compiler";
import { SqlLanguages } from "../src/sql/sql-languages.enum";
import { QueryWarn, Warning } from "../src/warnings/query-warn.service";

export class TestService {
  constructor(private readonly language: SqlLanguages) {}

  expectQuery = <T extends Object = Object>(
    name: string,
    query: Query<T>,
    toBe: string
  ) => {
    test(name, () => {
      expect(compile(query, this.language)).toBe(toBe);
    });
  };

  expectWarning = <T extends Object = Object>(
    name: string,
    query: Query<T>,
    warning: Warning
  ) => {
    let warner: (query: Query<T>) => QueryWarn<T>;

    switch (this.language) {
      case SqlLanguages.MSSQL:
        warner = MssqlCompiler.processQueryWarnings;
    }

    if (!warner)
      throw new UnavailableFeatureError("Warning for " + this.language);

    test(name, () => {
      expect(warner(query).warnings).toContainEqual(warning);
    });
  };
}
