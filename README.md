# verbose-time-travel

verbose-time-travel is a lightweight (under 70 lines) date-time processing library with semantic interface and verbose arguments.<br>
The library allows to set a base date-time and get a changed `Date` object based on any free text string.<br>
Fluctuation model and calculations are based on simple integer arithmetics.

## Examples

Travel to 10 minutes in past from the current moment

```typescript
import { travel } from 'verbose-time-travel';

console.log('Travel to 10 minutes in past from the current moment');
const newDate: Date = travel('10 min').back();
console.log(newDate);
```

Travel to 2 weeks and 4 hours in the future

```typescript
import { travel } from 'verbose-time-travel';

console.log('Travel to 2 weeks and 4 hours in the future');
const newDate: Date = travel('2 weeks 4 h').forward();
console.log(newDate);
```

Travel to 1 day in the future from start of Unix

```typescript
import { travelFrom } from 'verbose-time-travel';

console.log('Travel to 1 day in the future from start of Unix');
const newDate: Date = travelFrom(new Date(0)).forward('1 day');
console.log(newDate);
```

Travel to the future based on free text input

```typescript
import { travel } from 'verbose-time-travel';

console.log('Travel to the future based on free text input');
// ignores unrecognized terms like '1 time'
const newDate: Date = travel('I want to get 3 days 5 hours and 34 msec to the future at least 1 time').forward();
console.log(newDate);
```

## API Reference

### Class `VerboseTimeTravel`

Constructors:

- ```typescript
  constructor(fluctuation: string, fixed: Date | number = Date.now())
  ```
  `fluctuation` - any text containing date/time parts the fixed date should be changed by<br>
  `fixed` - either `Date` object or `number` (representing number of epoch msec `Date.now()`) which sets a fixed point in time of an instance of `VerboseTimeTravel`.<br>
  By default a current moment (`Date.now()`)

Methods:

- ```typescript
  back(fluctuation?: string): Date
  ```
  `fluctuation` - any text containing date/time parts the fixed date should be changed by. Overrides the value that can be passed to constructor.<br>
  Returns `Date` object date in the past by fluctuation
- ```typescript
  forward(fluctuation?: string): Date
  ```
  `fluctuation` - any text containing date/time parts the fixed date should be changed by. Overrides the value that can be passed to constructor.<br>
  Returns `Date` object date in the future by fluctuation

### Utils

- ```typescript
  travel(fluctuation: string): VerboseTimeTravel
  ```
  `fluctuation` - any text containing date/time parts the fixed date should be changed by.<br>
  Returns an instance of `VerboseTimeTravel` with a fluctuation set to the parameter value and fixed point in current moment.
- ```typescript
  travelFrom(from: Date): VerboseTimeTravel
  ```
  `from` - `Date` object representing a fixed point.<br>
  Returns an instance of `VerboseTimeTravel` with a fixed point set to the parameter value and 0 fluctuation.

## Supported aliases for time parts

> **NOTE**: Due to a very lightweight fluctuation calculation based on simple `number` arithmetics in the logic for the moment library does not support months and years, those can be replaced by a needed amount of other supported parts. Support for month and year will be added in further versions

- millisecond - `ms`, `millisec`, `millisecond`, `milliseconds`, `msec`
- second - `s`, `sec`, `second`, `seconds`
- minute - `m`, `min`, `minute`, `minutes`
- hour - `h`, `hour`, `hours`
- day - `d`, `day`, `days`
- week - `w`, `week`, `weeks`
