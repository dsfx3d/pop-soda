import {Application} from "pixi.js";
import {ContainerProvider} from "../util/ContainerProvider";
import {Engine, Runner} from "matter-js";
import {ObjectManager} from "../object/ObjectManager";
import {SceneManager} from "../scene/SceneManager";
import {createNanoEvents} from "nanoevents";

export class Game {
  readonly objects = new ObjectManager(this);
  readonly provider = new ContainerProvider(this);
  readonly scenes = new SceneManager(this);
  readonly events = createNanoEvents();
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
