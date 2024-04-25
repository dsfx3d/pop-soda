import {Application} from "pixi.js";
import {ContainerProvider} from "../util/ContainerProvider";
import {Engine, Runner} from "matter-js";
import {SceneManager} from "../scene/SceneManager";
import {TEvents} from "../util/TEvents";
import {createEvents} from "../util/createEvents";

export class Game {
  readonly events: TEvents = createEvents();
  readonly provider = new ContainerProvider(this);
  readonly scenes = new SceneManager(this);
  private runner: Runner = Runner.create({});

  constructor(
    public readonly app: Application,
    public readonly engine: Engine,
  ) {}

  start() {
    Runner.run(this.runner, this.engine);
    this.app.start();
  }

  stop() {
    this.app.stop();
    Runner.stop(this.runner);
  }
}
