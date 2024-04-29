import {Application} from "pixi.js";
import {ContainerProvider} from "../util/ContainerProvider";
import {EEvent} from "../event/EEvent";
import {Engine, Runner} from "matter-js";
import {ObjectManager} from "../object/ObjectManager";
import {SceneManager} from "../scene/SceneManager";
import {TEventMap} from "../event/TEventMap";
import {TEvents} from "../util/TEvents";
import {createEvents} from "../util/createEvents";

export class Game<E extends TEventMap = TEventMap> {
  readonly events: TEvents = createEvents<E>();
  readonly objects = new ObjectManager(this);
  readonly provider = new ContainerProvider(this);
  readonly scenes = new SceneManager(this);
  private runner: Runner = Runner.create({});

  constructor(
    public readonly app: Application,
    public readonly engine: Engine,
  ) {
    app.canvas.addEventListener("resize", (event: UIEvent) => {
      this.events.emit(EEvent.Resize, event);
    });
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
