import {AGameContainer} from "../game/AGameContainer";
import {IGameContainer} from "../util/IGameContainer";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";

export function inject<T extends IGameContainer>(
  constructor: IGameContainerConstructor<T>,
) {
  return function (target: AGameContainer, key: string) {
    Object.defineProperty(target, key, {
      get() {
        return target.game.provider.getSingleton(constructor);
      },
      enumerable: true,
    });
  };
}
