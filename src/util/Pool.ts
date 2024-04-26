import {AGameContainer} from "../game/AGameContainer";
import {IGameContainer} from "./IGameContainer";
import {IGameContainerConstructor} from "./IGameContainerConstructor";
import {TPoolAcquisition} from "./TPoolAcquisition";

export class Pool<T extends IGameContainer> extends AGameContainer {
  private readonly pool: T[] = [];

  acquire<O extends T>(
    constructor: IGameContainerConstructor<O>,
  ): TPoolAcquisition<O> {
    return {
      isCreated: this.pool.length === 0,
      result: (this.pool.pop() ?? new constructor(this.game)) as O,
    };
  }

  release(object: T) {
    this.pool.push(object);
  }
}
