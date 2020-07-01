// tslint:disable: variable-name quotemark
import { isInteger } from './isInteger';

class Party<T> {
  readonly votes: number;
  private _seats = 0;
  private _quotient: number;
  constructor(votes: number, readonly original: T) {
    this.votes = votes;
    this.updateQuotient();
  }

  quotient() {
    return this._quotient;
  }

  seats() {
    return this._seats;
  }

  addSeat() {
    this._seats += 1;
    this.updateQuotient();
  }

  removeSeat() {
    this._seats -= 1;
    this.updateQuotient();
  }

  setSeats(seats: number) {
    this._seats = seats;
    this.updateQuotient();
  }

  private updateQuotient() {
    this._quotient = this.votes / (2 * this._seats + 1);
  }
}

/**
 * Allocates seats according to the Sainte-Laguë method.
 *
 * Example usage:
 * ```
 * const votes = [143, 231, 165, 13, 492, 3, 5];
 * console.log(saintLague(votes, (x) => x, (_, v) => v, 100));
 * ```
 * -> [14, 22, 16, 1, 47, 0, 0]
 * @param objects an array of objects that contains a number
 * @param getValue an extractor function to get the number from the object
 * @param setValue a setter that returns the object with the modified new value.
 * This function is free to mutate the original object or create a new one.
 * @param seats the amount of seats to be allocated
 */
export function saintLagueLegacy<T>(objects: T[], getValue: (obj: T) => number, setValue: (obj: T, val: number) => T, seats: number): T[] {
  const parties = objects.map(obj => new Party<T>(getValue(obj), obj));

  for (let index = 0; index < seats; index++) {
    parties.reduceRight((p, c) => (p.quotient() > c.quotient() ? p : c)).addSeat();
  }

  return parties.map(x => setValue(x.original, x.seats()));
}

export function saintLague<T>(objects: T[], getValue: (obj: T) => number, setValue: (obj: T, val: number) => T, seats: number): T[] {
  if (!objects || objects.length === 0) {
    return objects;
  }
  const parties = objects.map(obj => new Party<T>(getValue(obj), obj));
  const votesSum = parties.reduce((x, y) => x + y.votes, 0);
  parties.forEach(p => {
    p.setSeats(Math.floor(((p.votes / votesSum) * seats) / 100) * 100);
  });
  const seatSum = parties.reduce((x, y) => x + y.seats(), 0);
  for (let index = seatSum; index < seats; index++) {
    parties.reduceRight((p, c) => (p.quotient() > c.quotient() ? p : c)).addSeat();
  }
  const result = parties.map(x => setValue(x.original, x.seats()));
  return result;
}

/**
 * Allocates seats according to the Sainte-Laguë method.
 *
 * Example usage:
 * ```
 * const votes = [143, 231, 165, 13, 492, 3, 5];
 * console.log(saintLague(votes, (x) => x, (_, v) => v, 100));
 * ```
 * -> [14, 22, 16, 1, 47, 0, 0]
 * @param objects an array of objects that contains a number
 * @param getValue an extractor function to get the number from the object
 * @param setValue a setter that returns the object with the modified new value.
 * This function is free to mutate the original object or create a new one.
 * @param seats the amount of seats to be allocated
 */
// export function saintLague<T>(objects: T[], getValue: (obj: T) => number, setValue: (obj: T, val: number) => T, seats: number): T[] {
//   console.log(objects);
//   console.log(seats);
//   const start = performance.now();
//   const parties = objects.map(obj => new Party<T>(getValue(obj), obj));

//   const votesSum = parties.reduce((x, y) => x + y.votes, 0);
//   const divisor_0 = votesSum / seats;
//   const f = (divisor, prevStepSize, prevDirection) => {
//     parties.forEach(p => p.setSeats(Math.round(p.votes / divisor)));
//     const seatsSum = parties.reduce((v, p) => v + p.seats(), 0);
//     if (seatsSum > seats) {
//       const stepSize = prevDirection < 0 ? prevStepSize / 10 : prevStepSize;
//       return stepSize >= 1 / 10000 ? f(divisor + stepSize, stepSize, 1) : parties;
//     } else if (seatsSum < seats) {
//       const stepSize = prevDirection > 0 ? prevStepSize / 10 : prevStepSize;
//       return stepSize >= 1 / 10000 ? f(divisor - stepSize, stepSize, -1) : parties;
//     } else {
//       return parties;
//     }
//   };
//   const result_temp = f(divisor_0, 1, 0);
//   const missingSeats = seats - parties.reduce((v, p) => v + p.seats(), 0);
//   if (missingSeats > 0) {
//     for (let index = 0; index < missingSeats; index++) {
//       parties.reduceRight((p, c) => (p.quotient() > c.quotient() ? p : c)).addSeat();
//     }
//   } else if (missingSeats < 0) {
//     for (let index = missingSeats; index < 0; index++) {
//       parties.reduceRight((p, c) => (p.quotient() < c.quotient() ? p : c)).removeSeat();
//     }
//   }
//   const result = result_temp.map(x => setValue(x.original, x.seats()));
//   const end = performance.now();
//   console.log(seats + ' :', end - start);
//   return result;
// }

/**
 * Rounds the provided numbers to `decimals` decimal points
 *
 * Example usage:
 * ```
 * const votes = [143, 231, 165, 13, 492, 3, 5];
 * console.log(roundObject(votes, (x) => x, (_, v) => v, 1));
 * ```
 * -> [13.6, 21.9, 15.7, 1.2, 46.8, 0.3, 0.5]
 *
 * see also `roundArray` a convenience to round number arrays
 * @param objects an array of objects that contains a number
 * @param getValue an extractor function to get the number from the object
 * @param setValue a setter that returns the object with the modified new value.
 * This function is free to mutate the original object or create a new one.
 * @param seats the amount of seats to be allocated
 */
export function roundObject<T>(objects: T[], getValue: (obj: T) => number, setValue: (obj: T, val: number) => T, decimals = 2) {
  if (decimals < 0) {
    throw new Error("Can't round to negative decimal places");
  }
  if (!isInteger(decimals)) {
    throw new Error("'decimals' must be an integer");
  }
  const seats = 100 * Math.pow(10, decimals);
  return saintLague(objects, getValue, setValue, seats).map(v => setValue(v, getValue(v) / seats));
}

export function roundArray(values: number[], decimals = 2) {
  return roundObject(
    values,
    x => x,
    (_, x) => x,
    decimals,
  );
}
