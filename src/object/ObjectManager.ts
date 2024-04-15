import {AGameContainer} from "../game/AGameContainer";
import {AnObject} from "./AnObject";
import {Container, View} from "pixi.js";
import {PoolMap} from "../util/PoolMap";
import {World} from "matter-js";

export class ObjectManager extends AGameContainer {
  readonly pool = this.game.provider.getInstance(PoolMap<AnObject>);

  add(object: AnObject) {
    object.drawable &&
      this.game.app.stage.addChild(object.drawable as View & Container);
    object.body && World.add(this.game.engine.world, object.body);
    this.addListeners(object);
  }

  remove(object: AnObject) {
    object.drawable &&
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      this.game.app.stage.removeChild(object.drawable as View & Container);
    object.body && World.remove(this.game.engine.world, object.body);
    this.removeListeners(object);
  }

  private addListeners(object: AnObject) {
    object.render && this.game.app.ticker.add(object.render.bind(object));
  }

  private removeListeners(object: AnObject) {
    object.render && this.game.app.ticker.remove(object.render.bind(object));
  }
}
