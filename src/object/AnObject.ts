import {AGameContainer} from "../game/AGameContainer";
import {Body} from "matter-js";
import {Container, View} from "pixi.js";
import {Game} from "../game/Game";
import {IInitMixin} from "../mixin/IInitMixin";

export abstract class AnObject extends AGameContainer implements IInitMixin {
  body?: Body;
  drawable?: Container | View;

  constructor(readonly game: Game) {
    super(game);
    this.init();
  }

  abstract init(): void | Promise<void>;
}
