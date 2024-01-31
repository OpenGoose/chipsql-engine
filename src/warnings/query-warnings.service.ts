import { Query } from "../chips-ql/types/queries/query.type";
import { SqlLanguages } from "../sql/sql-languages.enum";
import { WarningLevels } from "./warning-levels.enum";
import { WarningOptions } from "./warning-options.type";

export interface Warning {
  message: string;
  level: WarningLevels;
}

export class QueryWarningsService<T extends NonNullable<unknown>> {
  constructor(
    private readonly query: Query<T>,
    private readonly language: SqlLanguages,
    private readonly warningOptions?: WarningOptions
  ) {}

  public readonly warnings: Warning[] = [];

  public clearWarnings = () => {
    this.warnings.splice(0, this.warnings.length);
  };

  appendWarning = (
    message: string,
    level: WarningLevels = WarningLevels.WARNING
  ) => this.warnings.push({ message, level });

  warn = () => {
    if (this.warnings.length <= 0) return;
    const message = `⚠️  COMPILER WARNING${
      this.warnings.length > 1 ? "S" : ""
    }:\n${this.warnings
      .map(
        (w) =>
          `${this.levelIcons(w.level)}: ${w.message}.${this.levelPrefix(
            w.level
          )}`
      )
      .join("\n")}\n\n(SQL language: ${this.language})`;

    if (this.warningOptions?.logger) this.warningOptions.logger(message, this);
    else if (this.warningOptions?.logger !== null) console.warn(message);
  };

  private levelIcons = (level: WarningLevels) => {
    switch (level) {
      case WarningLevels.EXECUTION_WILL_FAIL:
        return `❌`;
      default:
        return `⚠️`;
    }
  };

  private levelPrefix = (level: WarningLevels) => {
    switch (level) {
      case WarningLevels.EXECUTION_WILL_FAIL:
        return " (Execution will fail)";
      default:
        return "";
    }
  };
}
