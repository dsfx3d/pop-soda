import {AGameContainer} from "../game/AGameContainer";
import {Game} from "../game/Game";
import {IInitMixin} from "../mixin/IInitMixin";

export abstract class AScene<G extends Game = Game>
  extends AGameContainer
  implements IInitMixin
{
  constructor(game: G) {
    super(game);
    this.init();
  }

  abstract init(): void | Promise<void>;
}
