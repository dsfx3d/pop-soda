import {Application} from "pixi.js";
import {Engine, Runner} from "matter-js";
import {IGame} from "./IGame";
import {ObjectManager} from "../object/ObjectManager";
import {SceneManager} from "../scene/SceneManager";
import {SceneManagerFactory} from "../scene/SceneManagerFactory";

export class Game implements IGame {
  readonly scenes: SceneManager<Game>;
  private runner: Runner = Runner.create({});

  constructor(
    public readonly app: Application,
    public readonly engine: Engine,
    public readonly objects: ObjectManager,
    private readonly sceneManager: SceneManagerFactory,
  ) {
    this.scenes = this.sceneManager.create(this);
  }

  start() {
    Runner.run(this.runner, this.engine);
    this.app.start();
  }

  stop() {
    this.app.stop();
    Runner.stop(this.runner);
  }
}
