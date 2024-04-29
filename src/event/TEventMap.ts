import {EEvent} from "./EEvent";
import {type EventsMap} from "nanoevents";
import {IGameContainer} from "../util/IGameContainer";

export type TEventMap = EventsMap & {
  [EEvent.Exit](container: IGameContainer): void;
  [EEvent.Resize](event: UIEvent): void;
};
