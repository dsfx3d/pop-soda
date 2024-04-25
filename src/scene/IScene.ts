import {IEntryMixin} from "../mixin/IEntryMixin";
import {IExitMixin} from "../mixin/IExitMixin";
import {IGameContainer} from "../util/IGameContainer";
import {IUpdateMixin} from "../mixin/IUpdateMixin";

export interface IScene
  extends IGameContainer,
    IEntryMixin,
    IExitMixin,
    IUpdateMixin {}
