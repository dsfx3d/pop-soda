import {Body} from "matter-js";
import {Game} from "../game/Game";
import {Graphics, Sprite, Text, Ticker} from "pixi.js";
import {IObject} from "./IObject";

export abstract class AnObject implements IObject {
  constructor(public readonly game: Game) {}
  body?: Body | undefined;
  drawable?: Text | Sprite | Graphics | undefined;
  render?: ((ticker: Ticker) => void) | undefined;
}
