import "@bospieter/ws-helper/styles.css";
//@ts-ignore
import { add, initBody } from "@bospieter/ws-helper";

import { fromEvent, of } from "rxjs";
import { mergeMap, delay } from "rxjs/operators";

interface IPoint {
  x: number;
  y: number;
  timestamp: number;
}
const start = Date.now();

initBody("rx-js mergeMap 2");

// faking network request for save
const saveLocation = (location: IPoint) => {
  return of(location).pipe(delay(1500));
};
// streams
const click$ = fromEvent(document, "click");

click$
  .pipe(
    mergeMap((e: MouseEvent) => {
      return saveLocation({
        x: e.clientX,
        y: e.clientY,
        timestamp: Math.floor((Date.now() - start) / 1000)
      });
    })
  )
  .subscribe(r =>
    add.li(`Saved! point( ${r.x},  ${r.y}) time  ${r.timestamp} `)
  );
