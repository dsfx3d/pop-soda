import {Body} from "matter-js";
import {Container, Ticker, View} from "pixi.js";

export interface IObject {
  drawable?: Container & View;
  body?: Body;
  render?: (ticker: Ticker) => void;
}
