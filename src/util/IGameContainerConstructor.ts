import {AGameContainer} from "../game/AGameContainer";
import {Game} from "../game/Game";

export interface IGameContainerConstructor<T extends AGameContainer> {
  new (game: Game): T;
}
