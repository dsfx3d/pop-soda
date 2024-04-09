import {AGameContainer} from "../game/AGameContainer";
import {AnObject} from "./AnObject";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
import {ObjectPool} from "./ObjectPool";
import {World} from "matter-js";

export class ObjectManager extends AGameContainer {
  private pools: Record<string, ObjectPool> = {};

  add(object: AnObject) {
    object.drawable && this.game.app.stage.addChild(object.drawable);
    object.body && World.add(this.game.engine.world, object.body);
    this.addListeners(object);
  }

  remove(object: AnObject) {
    // eslint-disable-next-line unicorn/prefer-dom-node-remove
    object.drawable && this.game.app.stage.removeChild(object.drawable);
    object.body && World.remove(this.game.engine.world, object.body);
    this.removeListeners(object);
  }

  acquire<O extends AnObject>(constructor: IGameContainerConstructor<O>): O {
    this.pools[constructor.name] ??= new ObjectPool(this.game);
    return this.pools[constructor.name].acquire(constructor);
  }

  release<O extends AnObject>(object: O) {
    this.pools[object.constructor.name] ??= new ObjectPool(this.game);
    this.pools[object.constructor.name].release(object);
  }

  private addListeners(object: AnObject) {
    object.render && this.game.app.ticker.add(object.render.bind(object));
  }

  private removeListeners(object: AnObject) {
    object.render && this.game.app.ticker.remove(object.render.bind(object));
  }
}
