export interface IFinishMixin {
  finish(): Promise<void> | void;
}
