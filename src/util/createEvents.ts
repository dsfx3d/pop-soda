import {type EventsMap, createNanoEvents} from "nanoevents";
import {TEvents} from "./TEvents";

export function createEvents(): TEvents {
  const events = createNanoEvents();
  return Object.assign(events, {
    once<K extends keyof EventsMap>(event: K, cb: EventsMap[K]) {
      const unsubscribe = events.on(
        event,
        (...args: Parameters<EventsMap[K]>) => {
          cb(...args);
          unsubscribe();
        },
      );
    },
  });
}
