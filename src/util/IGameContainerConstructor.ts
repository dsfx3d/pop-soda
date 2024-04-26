import {Game} from "../game/Game";
import {IGameContainer} from "./IGameContainer";

export interface IGameContainerConstructor<T extends IGameContainer> {
  new (game: Game): T;
}
