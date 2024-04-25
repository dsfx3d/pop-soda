import {AGameContainer} from "../game/AGameContainer";

export function getter(cb: (target: AGameContainer) => void) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (target: AGameContainer, key: string, _index: number) {
    Object.defineProperty(target, key, {
      get() {
        return cb(target);
      },
      enumerable: true,
    });
  };
}
