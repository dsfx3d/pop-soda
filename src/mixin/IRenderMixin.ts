import {Ticker} from "pixi.js";

export interface IRenderMixin {
  render(ticker: Ticker): void;
}
