import {AGameContainer} from "../game/AGameContainer";
import {Container, View} from "pixi.js";
import {IObject} from "./IObject";
import {PoolMap} from "../util/PoolMap";
import {World} from "matter-js";
import {inject} from "../decorator/inject";

export class ObjectManager extends AGameContainer {
  @inject(PoolMap<IObject>) readonly pool!: PoolMap<IObject>;

  async add(...objects: IObject[]): Promise<void> {
    await Promise.all(objects.map(o => this.addOne(o)));
  }

  async remove(...objects: IObject[]): Promise<void> {
    await Promise.all(objects.map(o => this.removeOne(o)));
  }

  private async removeOne(object: IObject): Promise<void> {
    await object.exit?.();
    object.drawable &&
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      this.game.app.stage.removeChild(object.drawable as View & Container);
    object.body && World.remove(this.game.engine.world, object.body);
    this.removeListeners(object);
  }

  private addOne(object: IObject) {
    object.drawable &&
      this.game.app.stage.addChild(object.drawable as View & Container);
    object.body && World.add(this.game.engine.world, object.body);
    object.entry?.();
    this.addListeners(object);
  }

  private addListeners(object: IObject) {
    object.update && this.game.app.ticker.add(object.update, object);
  }

  private removeListeners(object: IObject) {
    object.update && this.game.app.ticker.remove(object.update, object);
  }
}
