import { IQueryPartsCompiler } from "../query/query-parts-compiler.interface";

export class FunctionsCompiler<T extends Object> {
  constructor(
    protected readonly partsCompiler: IQueryPartsCompiler<T>,
    protected readonly buildFunction: (
      name: string,
      parameters: string[]
    ) => string
  ) {}
}
