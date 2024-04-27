import {TEventMap} from "../event/TEventMap";
import type {Emitter, Unsubscribe} from "nanoevents";

export type TEvents<E extends TEventMap = TEventMap> = Emitter<E> & {
  once<K extends keyof E>(event: K, cb: E[K]): Unsubscribe;
};
