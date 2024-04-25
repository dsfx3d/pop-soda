import {TEventMap} from "../event/TEventMap";
import {TEvents} from "./TEvents";
import {createNanoEvents} from "nanoevents";

export function createEvents(): TEvents {
  const events = createNanoEvents<TEventMap>();
  return Object.assign(events, {
    once<K extends keyof TEventMap>(event: K, cb: TEventMap[K]) {
      const unsubscribe = events.on(event, (...args) => {
        cb(...args);
        unsubscribe();
      });
      return unsubscribe;
    },
  });
}
