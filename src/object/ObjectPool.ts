import {AGameContainer} from "../game/AGameContainer";
import {AnObject} from "./AnObject";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";

export class ObjectPool extends AGameContainer {
  private readonly pool: AnObject[] = [];

  acquire<O extends AnObject>(constructor: IGameContainerConstructor<O>): O {
    return (this.pool.pop() ?? new constructor(this.game)) as O;
  }

  release<O extends AnObject>(object: O) {
    this.pool.push(object);
  }
}
