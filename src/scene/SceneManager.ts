import {AGameContainer} from "../game/AGameContainer";
import {EEvent} from "../event/EEvent";
import {IGameContainerConstructor} from "../util/IGameContainerConstructor";
import {IScene} from "./IScene";
import {PoolMap} from "../util/PoolMap";
import {TRunSceneRequest} from "./TRunSceneRequest";

export class SceneManager extends AGameContainer {
  private readonly pool = new PoolMap<IScene>(this.game);
  private runningScene?: IScene;

  async run<S extends IScene>(
    Scene: IGameContainerConstructor<S>,
    options: TRunSceneRequest = {},
  ): Promise<void> {
    await this.exitActiveScene(options);
    const acquisition = this.pool.acquire(Scene);
    this.runningScene = acquisition.result;
    this.addTicker(this.runningScene);
    if (acquisition.isCreated) {
      await acquisition.result.init?.();
    }
    await this.runningScene.entry?.();
  }

  private async exitActiveScene(options: TRunSceneRequest): Promise<void> {
    await this.runningScene?.exit?.();
    this.removeTicker();
    if (this.runningScene && options.persistCurrentScene) {
      this.pool.release(this.runningScene);
    }
    this.game.events.emit(EEvent.Exit, this.runningScene!);
    this.runningScene = undefined;
  }

  private addTicker(scene: IScene) {
    scene?.update && this.game.app.ticker.remove(scene.update, scene);
  }

  private removeTicker() {
    this.runningScene?.update &&
      this.game.app.ticker.remove(this.runningScene.update, this.runningScene);
  }
}
