// import {AScene} from "../scene/AScene";
// import {Game} from "../game/Game";
// import {IGameContainer} from "../util/IGameContainer";
// import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
// import {IObject} from "../object/IObject";
// import {TPoolAcquisition} from "../util/TPoolAcquisition";
// import {type Unsubscribe} from "nanoevents";

// export function pool<G extends Game, T extends IGameContainer<G>>(
//   constructor: IGameContainerConstructor<T>,
// ) {
//   return function <T extends IGameContainer<G>>(
//     target: T,
//     key: string,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     _index: number,
//   ) {
//     let acquisition: TPoolAcquisition<IObject>;
//     let unsubscribe: Unsubscribe[] = [];

//     function onExit(scene: AScene) {
//       if (scene === target) {
//         target.game.objects.pool.release(acquisition.result);
//       }
//     }

//     function reset() {
//       for (const unSub of unsubscribe) {
//         unSub();
//       }
//       unsubscribe = [];
//     }

//     Object.defineProperty(target, key, {
//       get() {
//         reset();
//         acquisition = target.game.objects.pool.acquire(constructor);
//         unsubscribe.push(target.game.events.once("SceneExit", onExit));
//         return acquisition.result;
//       },
//       enumerable: true,
//     });
//   };
// }
// eslint-disable-next-line unicorn/no-empty-file
