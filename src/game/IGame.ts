import {Engine} from "matter-js";
import {ObjectManager} from "../object/ObjectManager";

export interface IGame {
  engine: Engine;
  objects: ObjectManager;
  start(): void;
  stop(): void;
}
