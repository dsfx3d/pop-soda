import {AGameContainer} from "../game/AGameContainer";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
import {IScene} from "./IScene";
import {PoolMap} from "../util/PoolMap";
import {TRunSceneRequest} from "./TRunSceneRequest";

export class SceneManager extends AGameContainer {
  private readonly pool = this.game.provider.getInstance(PoolMap<IScene>);
  private runningScene?: IScene;

  async run<S extends IScene>(
    Scene: IGameContainerConstructor<S>,
    options: TRunSceneRequest = {},
  ): Promise<void> {
    await this.exitActiveScene(options);
    const acquisition = this.pool.acquire(Scene);
    if (acquisition.isCreated) {
      await acquisition.result.init?.();
    }
    this.runningScene = acquisition.result;
    this.addTicker();
    await this.runningScene.entry?.();
  }

  private async exitActiveScene(options: TRunSceneRequest): Promise<void> {
    await this.runningScene?.exit?.();
    this.removeTicker();
    if (this.runningScene && options.persistCurrentScene) {
      this.pool.release(this.runningScene);
    }
    this.runningScene = undefined;
  }

  private addTicker() {
    this.runningScene?.update &&
      this.game.app.ticker.remove(this.runningScene.update, this.runningScene);
  }

  private removeTicker() {
    this.runningScene?.update &&
      this.game.app.ticker.remove(this.runningScene.update, this.runningScene);
  }
}
