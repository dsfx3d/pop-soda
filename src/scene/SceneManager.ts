import {IGame} from "../game/IGame";
import {IScene} from "./IScene";
import {TGameContainer} from "../util/TGameContainer";

export class SceneManager<G extends IGame> {
  private activeScene: IScene<unknown> | undefined;

  constructor(private readonly game: G) {}

  async run<S extends IScene<G>>(Scene: TGameContainer<S, G>): Promise<void> {
    await this.activeScene?.finish?.();
    this.activeScene = new Scene(this.game);
    await this.activeScene.start();
  }
}
