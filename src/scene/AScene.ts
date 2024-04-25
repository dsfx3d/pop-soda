import {AGameContainer} from "../game/AGameContainer";
import {Game} from "../game/Game";
import {IInitMixin} from "../mixin/IInitMixin";

export abstract class AScene<G extends Game = Game>
  extends AGameContainer<G>
  implements IInitMixin
{
  constructor(game: G) {
    super(game);
    this.init();
  }

  init(): void | Promise<void> {}
}
