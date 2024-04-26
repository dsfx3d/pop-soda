import {EEvent} from "../event/EEvent";
import {Game} from "./Game";
import {IGameContainer} from "../util/IGameContainer";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
import {IObject} from "../object/IObject";
import {type Unsubscribe} from "nanoevents";

export abstract class AGameContainer<G extends Game = Game>
  implements IGameContainer<G>
{
  private acquired: IObject[] = [];
  private registered: IObject[] = [];
  private unsubscribeExit: Unsubscribe;

  constructor(public readonly game: G) {
    this.unsubscribeExit = game.events.on(EEvent.Exit, this.onExit.bind(this));
  }

  async addObject(...objects: IObject[]): Promise<void> {
    await this.game.objects.add(...objects);
    this.registered.push(...objects);
  }

  fromPool<T extends IObject>(constructor: IGameContainerConstructor<T>): T {
    const obj = this.game.objects.pool.acquire(constructor).result;
    this.acquired.push(obj);
    return obj;
  }

  private async onExit(exiting: AGameContainer<G>) {
    if (exiting === this) {
      await this.removeRegisteredObjects();
      this.releasePooledObjects();
      this.unsubscribeExit();
    }
  }

  private async removeRegisteredObjects(): Promise<void> {
    await this.game.objects.remove(...this.registered);
    this.registered = [];
  }

  private releasePooledObjects() {
    this.game.objects.pool.release(...this.acquired);
    this.acquired = [];
  }
}
