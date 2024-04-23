import {Game} from "../game/Game";

export interface IGameContainer<G extends Game = Game> {
  readonly game: G;
}
