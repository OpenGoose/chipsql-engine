import { IQueryCompiler } from "./query-compiler.interface";

export interface ISelectCompiler<T extends Object> extends IQueryCompiler<T> {
  compile(): string;
}