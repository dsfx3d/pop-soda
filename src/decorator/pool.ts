import {AScene} from "../scene/AScene";
import {IGameContainer} from "../util/IGameContainer";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
import {getter} from "./getter";

export function pool<T extends IGameContainer>(
  constructor: IGameContainerConstructor<T>,
) {
  return getter(target => {
    const {result} = target.game.objects.pool.acquire(constructor);
    target.game.events.once("SceneExit", (scene: AScene) => {
      if (scene === target) {
        target.game.objects.pool.release(result);
      }
    });
    return result;
  });
}
