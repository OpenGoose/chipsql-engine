import { Query } from "../src/chips-lq/types/queries/query.type";
import { UnavailableFeatureError } from "../src/errors/compiler/unavailable-feature.error";
import { QueryCompilerOptions } from "../src/compiler/query/query-compiler-options.type";
import { QueryCompiler } from "../src/compiler/query/query.compiler";
import { SqlLanguages } from "../src/sql/sql-languages.enum";
import {
  QueryWarningsService,
  Warning,
} from "../src/warnings/query-warnings.service";
import { MssqlCompiler } from "../src/languages/mssql/query-parts-compiler/mssql.compiler";

export class TestService {
  constructor(private readonly language: SqlLanguages) {}

  expectQuery = <T extends Object = Object>(
    name: string,
    query: Query<T>,
    toBe: string,
    compilerOptions?: QueryCompilerOptions
  ) => {
    test(name, () => {
      const compiler = new QueryCompiler<Object>(
        this.language,
        compilerOptions
      );
      expect(compiler.compile(query)).toBe(toBe);
    });
  };

  expectWarning = <T extends Object = Object>(
    name: string,
    query: Query<T>,
    warning: Warning,
    compilerOptions?: QueryCompilerOptions
  ) => {
    let warner: (
      query: Query<T>,
      compilerOptions?: QueryCompilerOptions
    ) => QueryWarningsService<T>;

    switch (this.language) {
      case SqlLanguages.MSSQL:
        warner = MssqlCompiler.processQueryWarnings;
    }

    if (!warner)
      throw new UnavailableFeatureError("Warning for " + this.language);

    test(name, () => {
      expect(warner(query, compilerOptions).warnings).toContainEqual(warning);
    });
  };

  expectException = <T extends Object = Object>(
    name: string,
    query: Query<T>,
    error: string | RegExp | jest.Constructable | Error | undefined,
    compilerOptions?: QueryCompilerOptions
  ) => {
    const compiler = new QueryCompiler<Object>(this.language, {
      ...compilerOptions,
      warningOptions: {
        logger: null,
        ...compilerOptions?.warningOptions,
      },
    });
    test(name, () => {
      expect(() => compiler.compile(query)).toThrow(error);
    });
  };
}
