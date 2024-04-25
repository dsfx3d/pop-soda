import {AGameContainer} from "../game/AGameContainer";

export function getter(cb: (target: AGameContainer) => void) {
  return function (target: AGameContainer, key: string) {
    Object.defineProperty(target, key, {
      get() {
        return cb(target);
      },
      enumerable: true,
    });
  };
}
