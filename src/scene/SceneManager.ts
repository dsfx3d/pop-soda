import {AGameContainer} from "../game/AGameContainer";
import {AScene} from "./AScene";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";

export class SceneManager extends AGameContainer {
  private activeScene: AScene | undefined;

  async run<S extends AScene>(
    Scene: IGameContainerConstructor<S>,
  ): Promise<void> {
    await this.activeScene?.finish();
    this.activeScene = new Scene(this.game);
    await this.activeScene.start();
  }
}
