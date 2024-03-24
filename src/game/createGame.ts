import {Application} from "pixi.js";
import {Engine} from "matter-js";
import {Game} from "./Game";
import {ObjectManager} from "../object/ObjectManager";
import {SceneManagerFactory} from "../scene/SceneManagerFactory";

export function createGame(app: Application, engine: Engine): Game {
  const objectManager = new ObjectManager(app, engine);
  const sceneManagerFactory = new SceneManagerFactory();
  return new Game(app, engine, objectManager, sceneManagerFactory);
}
