import {TEventMap} from "../event/TEventMap";
import type {Emitter, EventsMap, Unsubscribe} from "nanoevents";

export type TEvents = Emitter<TEventMap> & {
  once<K extends keyof TEventMap>(event: K, cb: EventsMap[K]): Unsubscribe;
};
