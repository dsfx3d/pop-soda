import {AGameContainer} from "../game/AGameContainer";
import {Game} from "../game/Game";
import {IGameContainer} from "./IGameContainer";
import {IGameContainerConstructor} from "./IGameContainerConstructor";

export class ContainerProvider extends AGameContainer {
  private readonly singletons: Record<string, unknown> = {};

  getSingleton<G extends Game, T extends IGameContainer<G>>(
    constructor: IGameContainerConstructor<T>,
  ): T {
    this.singletons[constructor.name] ??= this.getInstance(constructor);
    return this.singletons[constructor.name] as T;
  }

  getInstance<G extends Game, T extends IGameContainer<G>>(
    constructor: IGameContainerConstructor<T>,
  ): T {
    return new constructor(this.game as G);
  }
}
