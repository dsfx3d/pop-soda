import {Game} from "../game/Game";
import {TGameContainer} from "./TGameContainer";

export class ContainerProvider {
  private readonly singletons: Record<string, unknown> = {};

  constructor(private readonly game: Game) {}

  getSingleton<T>(constructor: TGameContainer<T, Game>): T {
    this.singletons[constructor.name] ??= new constructor(this.game);
    return this.singletons[constructor.name] as T;
  }
}
