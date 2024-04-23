import {Game} from "./Game";
import {IGameContainer} from "../util/IGameContainer";

export abstract class AGameContainer<G extends Game = Game>
  implements IGameContainer<G>
{
  constructor(public readonly game: G) {}
}
