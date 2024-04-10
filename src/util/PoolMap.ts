import {AGameContainer} from "../game/AGameContainer";
import {IGameContainerConstructor} from "./IGameContainerConstructor";
import {Pool} from "./Pool";

export class PoolMap<T extends AGameContainer> extends AGameContainer {
  private readonly pools: Record<string, Pool<T>> = {};

  acquire<O extends T>(constructor: IGameContainerConstructor<O>): O {
    this.pools[constructor.name] ??= this.game.provider.getInstance(Pool<O>);
    return this.pools[constructor.name].acquire(constructor);
  }

  release<O extends T>(object: O) {
    this.pools[object.constructor.name] ??= this.game.provider.getInstance(
      Pool<O>,
    );
    this.pools[object.constructor.name].release(object);
  }
}
