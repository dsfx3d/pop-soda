import {AGameContainer} from "../game/AGameContainer";
import {Container, View} from "pixi.js";
import {EEvent} from "../event/EEvent";
import {IObject} from "./IObject";
import {PoolMap} from "../util/PoolMap";
import {World} from "matter-js";

export class ObjectManager extends AGameContainer {
  readonly pool = new PoolMap<IObject>(this.game);

  async add(...objects: IObject[]): Promise<void> {
    await Promise.all(objects.map(o => this.addOne(o)));
  }

  async remove(...objects: IObject[]): Promise<void> {
    await Promise.all(objects.map(o => this.removeOne(o)));
  }

  // eslint-disable-next-line complexity
  private async removeOne(object: IObject): Promise<void> {
    await this.remove(...(object.children ?? []));
    await object.exit?.();
    object.drawable &&
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      this.game.app.stage.removeChild(object.drawable as View & Container);
    object.body && World.remove(this.game.engine.world, object.body);
    this.removeListeners(object);
    this.game.events.emit(EEvent.Exit, object);
  }

  // eslint-disable-next-line complexity
  private async addOne(object: IObject): Promise<void> {
    object.drawable &&
      this.game.app.stage.addChild(object.drawable as View & Container);
    object.body && World.add(this.game.engine.world, object.body);
    this.addListeners(object);
    this.game.events.emit(EEvent.Entry, object);
    await object.entry?.();
    await this.add(...(object.children ?? []));
  }

  private addListeners(object: IObject) {
    object.update && this.game.app.ticker.add(object.update, object);
  }

  private removeListeners(object: IObject) {
    object.update && this.game.app.ticker.remove(object.update, object);
  }
}
