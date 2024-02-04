import { Query } from "../chips-ql/types/queries/query.type";
import { SqlLanguage } from "../sql/sql-languages.enum";
import { WarningLevel } from "./warning-levels.enum";
import { WarningOptions } from "./warning-options.type";

export interface Warning {
  message: string;
  level: WarningLevel;
}

export class QueryWarningsService<T extends Object> {
  constructor(
    private readonly query: Query<T>,
    private readonly language: SqlLanguage,
    private readonly warningOptions?: WarningOptions
  ) {}

  public readonly warnings: Warning[] = [];

  public clearWarnings = () => {
    this.warnings.splice(0, this.warnings.length);
  };

  appendWarning = (
    message: string,
    level: WarningLevel = WarningLevel.WARNING
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

  private levelIcons = (level: WarningLevel) => {
    switch (level) {
      case WarningLevel.EXECUTION_WILL_FAIL:
        return `❌`;
      default:
        return `⚠️`;
    }
  };

  private levelPrefix = (level: WarningLevel) => {
    switch (level) {
      case WarningLevel.EXECUTION_WILL_FAIL:
        return " (Execution will fail)";
      default:
        return "";
    }
  };
}
