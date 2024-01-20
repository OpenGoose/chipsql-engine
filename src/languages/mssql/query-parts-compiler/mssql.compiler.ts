import { Query, QueryTypes } from "../../../chips-ql/types/queries/query.type";
import { Select } from "../../../chips-ql/types/queries/select.type";
import { SqlLanguages } from "../../../sql/sql-languages.enum";
import { UnavailableFeatureError } from "../../../errors/compiler/unavailable-feature.error";
import { MssqlPartsCompiler } from "./mssql-parts.compiler";
import { IQueryCompiler } from "../../../compiler/query/query-compiler.interface";
import { IQueryPartsCompiler } from "../../../compiler/query/query-parts-compiler.interface";
import { QueryCompilerOptions } from "../../../compiler/query/query-compiler-options.type";
import { joinParts } from "../../../compiler/utils/query-generation/join-parts.util";
import { MssqlWarnings } from "../warnings/mssql.warnings";
import { Insert } from "../../../chips-ql/types/queries/insert.type";
import { mssqlConstants } from "../constants/mssql.constants";
import { ExecutionWillFailException } from "../../../errors/warnings/execution-will-fail.exception";
import { Delete } from "../../../chips-ql/types/queries/delete.type";
import { Update } from "../../../chips-ql/types/queries/update.type";

export class MssqlCompiler<T extends Object> implements IQueryCompiler<T> {
  protected readonly language: SqlLanguages;
  readonly query: Query<T>;
  readonly partsCompiler: IQueryPartsCompiler<T>;

  constructor(
    query: Query<T>,
    private readonly options?: QueryCompilerOptions
  ) {
    this.language = SqlLanguages.MSSQL;
    this.query = query;
    this.partsCompiler = new MssqlPartsCompiler<T>(options);
  }

  public compile = () => {
    switch (this.query.queryType) {
      case QueryTypes.SELECT:
        return this.compileSelect(this.query);
      case QueryTypes.INSERT:
        return this.compileInsert(this.query);
      case QueryTypes.DELETE:
        return this.compileDelete(this.query);
      case QueryTypes.UPDATE:
        return this.compileUpdate(this.query);
    }
  };

  compileSelect = ({
    fields,
    from,
    where,
    joins,
    limit,
    offset,
    orderBy,
    having,
    groupBy,
    into,
  }: Select<T>) => {
    return (
      joinParts([
        "SELECT",
        limit && !offset ? `TOP ${this.partsCompiler.limit(limit)}` : null,
        this.partsCompiler.fields(fields),
        into ? joinParts(["INTO", this.partsCompiler.into(into)]) : null,
        "FROM",
        this.partsCompiler.from(from),
        joins ? this.partsCompiler.joins(joins) : null,
        where ? joinParts(["WHERE", this.partsCompiler.where(where)]) : null,
        groupBy
          ? joinParts(["GROUP BY", this.partsCompiler.grouping(groupBy)])
          : null,
        having
          ? joinParts(["HAVING", this.partsCompiler.having(having)])
          : having,
        orderBy ? `ORDER BY ${this.partsCompiler.orders(orderBy)}` : null,
        offset ? `OFFSET ${this.partsCompiler.offset(offset)} ROWS` : null,
        limit && offset
          ? `FETCH FIRST ${this.partsCompiler.limit(limit)} ROWS ONLY`
          : null,
      ]) + (this.options?.endWithSemicolon === false ? "" : ";")
    );
  };

  compileInsert = (insert: Insert<T>) => {
    if (insert.values.length > mssqlConstants.BATCH_INSERT_MAX_SIZE)
      throw new ExecutionWillFailException();

    // Identify keys
    let keys: string[] = [];
    for (const row of insert.values) {
      for (const value of row) {
        if (!keys.includes(value.field)) keys.push(value.field);
      }
    }

    return (
      joinParts([
        "INSERT INTO",
        this.partsCompiler.table(insert.into),
        `(${joinParts(
          keys.map(this.partsCompiler.generateField),
          `,${this.partsCompiler.avoidableSpace}`
        )}) VALUES`,
        // Generate values
        joinParts(
          insert.values.map((row) => {
            // For each row
            return `(${joinParts(
              keys.map((key) => {
                const cell = row.find(({ field }) => field === key);
                if (cell) return this.partsCompiler.value(cell.value);
                return "NULL";
              }),
              `,${this.partsCompiler.avoidableSpace}`
            )})`;
          }),
          `,${this.partsCompiler.avoidableSpace}`
        ),
      ]) + (this.options?.endWithSemicolon === false ? "" : ";")
    );
  };

  compileDelete = (del: Delete<T>) => {
    return (
      joinParts([
        "DELETE",
        del.limit
          ? `TOP ${this.partsCompiler.limit(del.limit, {
              valueInParenthesis: true,
            })}`
          : null,
        "FROM",
        this.partsCompiler.from([del.from]),
        del.where ? "WHERE " + this.partsCompiler.where(del.where) : null,
      ]) + (this.options?.endWithSemicolon === false ? "" : ";")
    );
  };

  compileUpdate = ({ joins, ...update }: Update<T>) => {
    return (
      joinParts([
        "UPDATE",
        update.limit
          ? `TOP ${this.partsCompiler.limit(update.limit, {
              valueInParenthesis: true,
            })}`
          : null,
        update.from.alias
          ? this.partsCompiler.generateField(update.from.alias)
          : this.partsCompiler.from([update.from]),
        "SET",
        this.partsCompiler.set(update.values),
        "FROM",
        this.partsCompiler.from([update.from]),
        joins ? this.partsCompiler.joins(joins) : null,
        update.where ? `WHERE ${this.partsCompiler.where(update.where)}` : null,
      ]) + (this.options?.endWithSemicolon === false ? "" : ";")
    );
  };

  static processQueryWarnings = <T extends Object>(
    query: Query<T>,
    queryCompilerOptions?: QueryCompilerOptions
  ) => {
    return new MssqlWarnings<T>(query, queryCompilerOptions).processWarnings();
  };
}
