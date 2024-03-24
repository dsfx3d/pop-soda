import {IGame} from "../game/IGame";
import {SceneManager} from "./SceneManager";

export class SceneManagerFactory {
  create<G extends IGame>(game: G): SceneManager<G> {
    return new SceneManager(game);
  }
}
