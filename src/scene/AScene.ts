import {AGameContainer} from "../game/AGameContainer";
import {Game} from "../game/Game";
import {IExitMixin} from "../mixin/IExitMixin";
import {IInitMixin} from "../mixin/IInitMixin";
import {ObjectManager} from "../object/ObjectManager";

export abstract class AScene<G extends Game = Game>
  extends AGameContainer<G>
  implements IInitMixin, IExitMixin
{
  readonly objects: ObjectManager;

  constructor(game: G) {
    super(game);
    this.objects = new ObjectManager(this.game);
    this.init();
  }

  init(): void | Promise<void> {}

  async exit(): Promise<void> {
    await this.objects.flush();
    await this.onExit?.();
  }

  abstract onExit?: IExitMixin["exit"];
}
