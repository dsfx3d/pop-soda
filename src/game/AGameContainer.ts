import {Game} from "./Game";

export abstract class AGameContainer {
  constructor(public readonly game: Game) {}
}
