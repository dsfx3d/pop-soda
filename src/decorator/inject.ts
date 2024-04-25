import {IGameContainer} from "../util/IGameContainer";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
import {getter} from "./getter";

export function inject<T extends IGameContainer>(
  constructor: IGameContainerConstructor<T>,
) {
  return getter(target => target.game.provider.getSingleton(constructor));
}
