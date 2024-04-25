import {AGameContainer} from "../game/AGameContainer";
import {Body} from "matter-js";
import {Container, View} from "pixi.js";
import {Game} from "../game/Game";
import {IInitMixin} from "../mixin/IInitMixin";

export abstract class AnObject<G extends Game = Game>
  extends AGameContainer<G>
  implements IInitMixin
{
  body?: Body;
  drawable?: Container | View;

  constructor(readonly game: G) {
    super(game);
    this.init();
  }

  init(): void | Promise<void> {}
}
