import {Game} from "../game/Game";
import {IObject} from "./IObject";
import {ObjectPool} from "./ObjectPool";
import {TGameContainer} from "../util/TGameContainer";
import {World} from "matter-js";

export class ObjectManager {
  private pools: Record<string, ObjectPool<IObject>> = {};

  constructor(public readonly game: Game) {}

  add(object: IObject) {
    object.drawable && this.game.app.stage.addChild(object.drawable);
    object.body && World.add(this.game.engine.world, object.body);
    this.addListeners(object);
  }

  remove(object: IObject) {
    // eslint-disable-next-line unicorn/prefer-dom-node-remove
    object.drawable && this.game.app.stage.removeChild(object.drawable);
    object.body && World.remove(this.game.engine.world, object.body);
    this.removeListeners(object);
  }

  acquire<O extends IObject>(constructor: TGameContainer<O, Game>): O {
    this.pools[constructor.name] ??= new ObjectPool(this.game);
    return this.pools[constructor.name].acquire(constructor) as O;
  }

  release<O extends IObject>(object: O) {
    this.pools[object.constructor.name] ??= new ObjectPool(this.game);
    this.pools[object.constructor.name].release(object);
  }

  private addListeners(object: IObject) {
    object.render && this.game.app.ticker.add(object.render.bind(object));
  }

  private removeListeners(object: IObject) {
    object.render && this.game.app.ticker.remove(object.render.bind(object));
  }
}
