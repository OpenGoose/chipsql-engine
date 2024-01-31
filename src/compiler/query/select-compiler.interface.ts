import { IQueryCompiler } from "./query-compiler.interface";

export interface ISelectCompiler<T extends NonNullable<unknown>> extends IQueryCompiler<T> {
  compile(): string;
}