import {IGame} from "../game/IGame";
import {IScene} from "./IScene";

export abstract class AScene<G extends IGame> implements IScene<G> {
  constructor(public readonly game: G) {}
  abstract start(): Promise<void>;
}
