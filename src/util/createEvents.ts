import {TEventMap} from "../event/TEventMap";
import {TEvents} from "./TEvents";
import {createNanoEvents} from "nanoevents";

export function createEvents<E extends TEventMap = TEventMap>(): TEvents<E> {
  const events = createNanoEvents<E>();
  return Object.assign(events, {
    once<K extends keyof E>(event: K, cb: E[K]) {
      const unsubscribe = events.on(event, ((...args: any) => {
        cb(...args);
        unsubscribe();
      }) as E[K]);
      return unsubscribe;
    },
  });
}
