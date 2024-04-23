import {AGameContainer} from "../game/AGameContainer";
import {Container, View} from "pixi.js";
import {IObject} from "./IObject";
import {PoolMap} from "../util/PoolMap";
import {World} from "matter-js";

export class ObjectManager extends AGameContainer {
  readonly pool = this.game.provider.getInstance(PoolMap<IObject>);

  add(object: IObject) {
    object.drawable &&
      this.game.app.stage.addChild(object.drawable as View & Container);
    object.body && World.add(this.game.engine.world, object.body);
    this.addListeners(object);
  }

  remove(object: IObject) {
    object.drawable &&
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      this.game.app.stage.removeChild(object.drawable as View & Container);
    object.body && World.remove(this.game.engine.world, object.body);
    this.removeListeners(object);
  }

  private addListeners(object: IObject) {
    object.render && this.game.app.ticker.add(object.render.bind(object));
  }

  private removeListeners(object: IObject) {
    object.render && this.game.app.ticker.remove(object.render.bind(object));
  }
}
