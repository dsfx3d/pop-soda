import {Body} from "matter-js";
import {Container, View} from "pixi.js";
import {IEntryMixin} from "../mixin/IEntryMixin";
import {IExitMixin} from "../mixin/IExitMixin";
import {IGameContainer} from "../util/IGameContainer";
import {IUpdateMixin} from "../mixin/IUpdateMixin";

export interface IObject
  extends IGameContainer,
    Partial<IEntryMixin>,
    Partial<IExitMixin>,
    Partial<IUpdateMixin> {
  drawable?: Container | View;
  body?: Body;
  children?: IObject[];
}
