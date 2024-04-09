import {AGameContainer} from "../game/AGameContainer";
import {IGameContainerConstructor} from "./IGameContainerConstructor";

export class ContainerProvider extends AGameContainer {
  private readonly singletons: Record<string, unknown> = {};

  getSingleton<T extends AGameContainer>(
    constructor: IGameContainerConstructor<T>,
  ): T {
    this.singletons[constructor.name] ??= new constructor(this.game);
    return this.singletons[constructor.name] as T;
  }
}
