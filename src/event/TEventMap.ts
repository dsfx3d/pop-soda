import {EEvent} from "./EEvent";
import {IGameContainer} from "../util/IGameContainer";

export type TEventMap = {
  [EEvent.Exit](container: IGameContainer): void;
};
