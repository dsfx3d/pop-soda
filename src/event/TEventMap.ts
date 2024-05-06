import {EEvent} from "./EEvent";
import {type EventsMap} from "nanoevents";
import {Game} from "../game/Game";
import {IGameContainer} from "../util/IGameContainer";

export type TEventMap = EventsMap & {
  [EEvent.Exit]<G extends Game>(container: IGameContainer<G>): void;
  [EEvent.Resize](event: UIEvent): void;
  [EEvent.Entry]<G extends Game>(container: IGameContainer<G>): void;
};
