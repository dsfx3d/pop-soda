import {AGameContainer} from "../game/AGameContainer";
import {IGameContainerConstructor} from "./IGameContainerConstructor";
import {Pool} from "./Pool";
import {TPoolAcquisition} from "./TPoolAcquisition";

export class PoolMap<T extends AGameContainer> extends AGameContainer {
  private readonly pools: Record<string, Pool<T>> = {};

  acquire<O extends T>(
    constructor: IGameContainerConstructor<O>,
  ): TPoolAcquisition<O> {
    this.pools[constructor.name] ??= new Pool<O>(this.game);
    return this.pools[constructor.name].acquire(constructor);
  }

  release<O extends T>(object: O) {
    this.pools[object.constructor.name] ??= new Pool<O>(this.game);
    this.pools[object.constructor.name].release(object);
  }
}
