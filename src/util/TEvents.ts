import type {Emitter, EventsMap} from "nanoevents";

export type TEvents = Emitter<EventsMap> & {
  once<K extends keyof EventsMap>(event: K, cb: EventsMap[K]): void;
};
