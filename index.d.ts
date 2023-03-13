declare module 'verbose-time-travel' {
  export class VerboseTimeTravel {
    constructor(fluctuation: string, fixed: Date | number = Date.now());
    public back(fluctuation?: string): Date;
    public forward(fluctuation?: string): Date;
  }
  export function travel(fluctuation: string): VerboseTimeTravel;
  export function travelFrom(from: Date): VerboseTimeTravel;
}
