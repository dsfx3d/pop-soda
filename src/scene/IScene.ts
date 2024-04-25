import {IEntryMixin} from "../mixin/IEntryMixin";
import {IExitMixin} from "../mixin/IExitMixin";
import {IGameContainer} from "../util/IGameContainer";
import {IInitMixin} from "../mixin/IInitMixin";
import {IUpdateMixin} from "../mixin/IUpdateMixin";

export interface IScene
  extends IGameContainer,
    Partial<IInitMixin>,
    Partial<IEntryMixin>,
    Partial<IExitMixin>,
    Partial<IUpdateMixin> {}
