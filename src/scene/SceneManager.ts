import {Game} from "../game/Game";
import {IScene} from "./IScene";
import {TGameContainer} from "../util/TGameContainer";

export class SceneManager {
  private activeScene: IScene<Game> | undefined;

  constructor(private readonly game: Game) {}

  async run<S extends IScene<Game>>(
    Scene: TGameContainer<S, Game>,
  ): Promise<void> {
    await this.activeScene?.finish?.();
    this.activeScene = new Scene(this.game);
    await this.activeScene.start();
  }
}
