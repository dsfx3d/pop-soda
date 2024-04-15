import {AGameContainer} from "../game/AGameContainer";
import {Body} from "matter-js";
import {Container, Ticker, View} from "pixi.js";
import {IObject} from "./IObject";

export abstract class AnObject extends AGameContainer implements IObject {
  body?: Body | undefined;
  drawable?: Container | View | undefined;
  render?: ((ticker: Ticker) => void) | undefined;
}
