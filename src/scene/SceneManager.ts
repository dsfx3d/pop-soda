import {AGameContainer} from "../game/AGameContainer";
import {AScene} from "./AScene";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
import {PoolMap} from "../util/PoolMap";
import {TRunSceneRequest} from "./TRunSceneRequest";

export class SceneManager extends AGameContainer {
  private readonly pool = this.game.provider.getInstance(PoolMap<AScene>);
  private activeScene: AScene | undefined;

  async run<S extends AScene>(
    Scene: IGameContainerConstructor<S>,
    options: TRunSceneRequest = {},
  ): Promise<void> {
    await this.closeActiveScene(options);
    this.activeScene = this.pool.acquire(Scene);
    await this.activeScene.start();
  }

  private async closeActiveScene(options: TRunSceneRequest): Promise<void> {
    await this.activeScene?.finish();
    if (this.activeScene && options.persistCurrentScene) {
      this.pool.release(this.activeScene);
    }
  }
}
