import {AGameContainer} from "../game/AGameContainer";
import {Body} from "matter-js";
import {Container, View} from "pixi.js";
import {Game} from "../game/Game";

export abstract class AnObject<
  G extends Game = Game,
> extends AGameContainer<G> {
  body?: Body;
  drawable?: Container | View;
}
