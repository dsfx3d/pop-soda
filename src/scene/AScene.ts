import {AGameContainer} from "../game/AGameContainer";
import {Game} from "../game/Game";

export abstract class AScene<G extends Game = Game> extends AGameContainer<G> {
  public readonly game: G;
}
