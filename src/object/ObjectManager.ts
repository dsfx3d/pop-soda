import {Application} from "pixi.js";
import {Engine, World} from "matter-js";
import {IObject} from "./IObject";

export class ObjectManager {
  constructor(
    private readonly app: Application,
    private readonly engine: Engine,
  ) {}

  add(object: IObject) {
    console.log(object.body?.angle);
    object.drawable && this.app.stage.addChild(object.drawable);
    World.add(this.engine.world, object.body!);
    this.addListeners(object);
  }

  private addListeners(object: IObject) {
    object.onUpdate &&
      this.app.ticker.add(object.onUpdate.bind(object, object));
  }
}
