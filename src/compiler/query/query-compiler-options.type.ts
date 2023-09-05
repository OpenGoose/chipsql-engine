export type QueryCompilerOptions = {
  compactQuery?: boolean;
  endWithSemicolon?: boolean;
  warningOptions?: WarningOptions;
};

type WarningOptions = {
  throwExceptionOnExecutionWillFail?: boolean;
}
