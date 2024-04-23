import {AGameContainer} from "../game/AGameContainer";
import {Body} from "matter-js";
import {Container, View} from "pixi.js";
import {Game} from "../game/Game";
import {IObject} from "./IObject";

export abstract class AnObject extends AGameContainer implements IObject {
  body?: Body | undefined;
  drawable?: Container | View | undefined;

  constructor(readonly game: Game) {
    super(game);
    this.game.objects.add(this);
  }
}
