import {AGameContainer} from "../game/AGameContainer";
import {IGameContainerConstructor} from "./IGameContainerConstructor";

export class Pool<T extends AGameContainer> extends AGameContainer {
  private readonly pool: T[] = [];

  acquire<O extends T>(constructor: IGameContainerConstructor<O>): O {
    return (this.pool.pop() ??
      this.game.provider.getInstance(constructor)) as O;
  }

  release(object: T) {
    this.pool.push(object);
  }
}
