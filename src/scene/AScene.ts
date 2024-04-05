import {Game} from "../game/Game";
import {IScene} from "./IScene";

export abstract class AScene implements IScene<Game> {
  constructor(public readonly game: Game) {}
  abstract start(): Promise<void>;
}
