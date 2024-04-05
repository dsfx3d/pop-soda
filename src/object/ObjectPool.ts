import {Game} from "../game/Game";
import {IObject} from "./IObject";
import {TGameContainer} from "../util/TGameContainer";

export class ObjectPool<O extends IObject> {
  private readonly pool: O[] = [];

  constructor(private readonly game: Game) {}

  acquire(constructor: TGameContainer<O, Game>): O {
    return this.pool.pop() ?? new constructor(this.game);
  }

  release(object: O) {
    this.pool.push(object);
  }
}
