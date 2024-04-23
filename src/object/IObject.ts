import {Body} from "matter-js";
import {Container, Ticker, View} from "pixi.js";
import {IGameContainer} from "../util/IGameContainer";

export interface IObject extends IGameContainer {
  drawable?: Container | View;
  body?: Body;
  render?: (ticker: Ticker) => void;
}
