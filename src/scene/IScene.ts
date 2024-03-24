import {IFinishMixin} from "../mixin/IFinishMixin";
import {IStartMixin} from "../mixin/IStartMixin";

export interface IScene<G> extends IStartMixin, Partial<IFinishMixin> {
  readonly game: G;
}
