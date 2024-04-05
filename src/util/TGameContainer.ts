import {Game} from "../game/Game";

export type TGameContainer<T, G extends Game> = new (game: G) => T;
