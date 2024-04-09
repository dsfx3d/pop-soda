import {IFinishMixin} from "../mixin/IFinishMixin";
import {IStartMixin} from "../mixin/IStartMixin";

export interface IScene extends IStartMixin, IFinishMixin {}
