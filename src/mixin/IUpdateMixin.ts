import {Ticker} from "pixi.js";

export interface IUpdateMixin {
  update(ticker: Ticker): void;
}
