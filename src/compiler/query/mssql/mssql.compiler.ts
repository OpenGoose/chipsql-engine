import { Query, QueryTypes } from "../../../chips-lq/types/queries/query.type";
import { Select } from "../../../chips-lq/types/queries/select.type";
import { SqlLanguages } from "../../../sql/sql-languages.enum";
import { UnavailableFeatureError } from "../../features/unavailable-feature.error";
import { joinParts } from "../../utils/query-generation/join-parts.util";
import { IQueryCompiler } from "../query-compiler.interface";
import { IQueryPartsCompiler } from "../query-parts-compiler.interface";
import { MssqlPartsCompiler } from "./mssql-parts.compiler";

type CompileSelectOptions = {
  semicolon?: boolean;
}

export class MssqlCompiler<T extends Object> implements IQueryCompiler<T> {
  protected readonly language: SqlLanguages;
  readonly query: Query<T>;
  readonly partsCompiler: IQueryPartsCompiler<T>;

  constructor(query: Query<T>) {
    this.language = SqlLanguages.MSSQL;
    this.query = query;
    this.partsCompiler = new MssqlPartsCompiler<T>();
  }

  public compile = () => {
    switch (this.query.queryType) {
      case QueryTypes.SELECT:
        return this.compileSelect(this.query);
    }
    throw new UnavailableFeatureError(this.query.queryType);
  };

  // Static

  compileSelect = (
    { fields, from, ...select }: Select<T>,
    { semicolon }: CompileSelectOptions = { semicolon: true }
  ) => {
    return (
      joinParts([
        "SELECT",
        this.partsCompiler.fields(fields),
        "FROM",
        this.partsCompiler.from(from),
      ]) + (semicolon ? ';' : '')
    );
  };
}