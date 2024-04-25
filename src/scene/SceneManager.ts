import {AGameContainer} from "../game/AGameContainer";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
import {IScene} from "./IScene";
import {PoolMap} from "../util/PoolMap";
import {TRunSceneRequest} from "./TRunSceneRequest";
import {TickerCallback} from "pixi.js";

export class SceneManager extends AGameContainer {
  private readonly pool = this.game.provider.getInstance(PoolMap<IScene>);
  private activeScene?: IScene;
  private ticker?: TickerCallback<IScene>;

  async run<S extends IScene>(
    Scene: IGameContainerConstructor<S>,
    options: TRunSceneRequest = {},
  ): Promise<void> {
    await this.cleanupRunningScene(options);
    this.activeScene = this.pool.acquire(Scene);
    this.enterActiveScene();
  }

  private async cleanupRunningScene(options: TRunSceneRequest): Promise<void> {
    await this.exitActiveScene(options);
    this.ticker && this.game.app.ticker.remove(this.ticker);
  }

  private async enterActiveScene(): Promise<void> {
    await this.activeScene?.entry();
    this.ticker = this.activeScene?.update.bind(this.activeScene);
    this.ticker && this.game.app.ticker.add(this.ticker);
  }

  private async exitActiveScene(options: TRunSceneRequest): Promise<void> {
    await this.activeScene?.exit();
    if (this.activeScene && options.persistCurrentScene) {
      this.pool.release(this.activeScene);
    }
  }
}
