import {AGameContainer} from "../game/AGameContainer";
import {IScene} from "./IScene";

export abstract class AScene extends AGameContainer implements IScene {
  abstract start(): Promise<void>;
  finish() {}
}
