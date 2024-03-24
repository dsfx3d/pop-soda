import {IGame} from "../game/IGame";

export type TGameContainer<T, G extends IGame> = new (game: G) => T;
