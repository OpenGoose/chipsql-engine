import { Query } from "../chips-lq/types/queries/query.type";
import { SqlLanguages } from "../sql/sql-languages.enum";
import { WarningLevels } from "./warning-levels.enum";

export class QueryWarn<T extends Object> {
  constructor(
    private readonly query: Query<T>,
    private readonly language: SqlLanguages
  ) {}

  public readonly warnings: { message: string; level: WarningLevels }[] = [];

  appendWarning = (
    message: string,
    level: WarningLevels = WarningLevels.WARNING
  ) => this.warnings.push({ message, level });

  warn = () => {
    if (this.warnings.length <= 0) return;
    console.warn(
      `⚠️ COMPILER WARNING${
        this.warnings.length > 1 ? "S" : ""
      }:\n${this.warnings
        .map(
          (w) =>
            `${this.levelIcons(w.level)}: ${w.message}.${this.levelPrefix(
              w.level
            )}`
        )
        .join("\n")}\n\n(SQL language: ${this.language})`
    );
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
