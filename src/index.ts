import "@bospieter/ws-helper/styles.css";
//@ts-ignore
import { add, initBody } from "@bospieter/ws-helper";

import { interval, fromEvent } from "rxjs";
import { map, take, mergeMap } from "rxjs/operators";

interface IPoint {
  x: number;
  y: number;
}
initBody("rx-js mergeMap");

add.button("Button A", "btn_a");
add.button("Button B", "btn_b");

const btnA = document.getElementById("btn_a");
const btnB = document.getElementById("btn_b");

const obsA = fromEvent(btnA, "click");
const obsB = fromEvent(btnB, "click");

const mergedObj = obsA.pipe(
  mergeMap(eventBtnA => {
    return obsB.pipe(
      map(
        eventBtnB =>
          eventBtnA.target.id +
          " - " +
          eventBtnB.target.id +
          " time " +
          Date.now()
      )
    );
  })
);

mergedObj.subscribe(val => add.li(val));
