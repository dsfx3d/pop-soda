// import {AScene} from "../scene/AScene";
// import {Game} from "../game/Game";
// import {IGameContainer} from "../util/IGameContainer";
// import {IObject} from "../object/IObject";
// import {type Unsubscribe} from "nanoevents";

// export function objects() {
//   return function <G extends Game, T extends IGameContainer<G>>(
//     target: T,
//     key: string,
//   ) {
//     let objectList: IObject[] = [];
//     let unsubscribe: Unsubscribe[] = [];

//     function onExit(scene: AScene) {
//       if (scene === target) {
//         target.game.objects.remove(...objectList);
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
//         return objectList;
//       },
//       set(objects: IObject[]) {
//         reset();
//         objectList = objects;
//         unsubscribe.push(target.game.events.once("SceneExit", onExit));
//         target.game.objects.add(...objects);
//       },
//       enumerable: true,
//     });
//   };
// }
// eslint-disable-next-line unicorn/no-empty-file
