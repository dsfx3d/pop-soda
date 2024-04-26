import {Game} from "../game/Game";
import {IGameContainer} from "../util/IGameContainer";

export function getter<G extends Game, T extends IGameContainer<G>>(
  cb: (target: T) => void,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (target: T, key: string, _index: number) {
    Object.defineProperty(target, key, {
      get() {
        return cb(target);
      },
      enumerable: true,
    });
  };
}
