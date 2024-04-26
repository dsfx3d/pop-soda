import {IGameContainer} from "./IGameContainer";

export interface IGameContainerConstructor<T extends IGameContainer> {
  new (game: T["game"]): T;
}
