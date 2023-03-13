declare module 'verbose-time-travel' {
  export class VerboseTimeTravel {
    constructor(fluctuation: string, fixed: Date | number = Date.now());
    public back(fluctuation?: string): Date;
    public forward(fluctuation?: string): Date;
  }
  export const travel = (fluctuation: string) => VerboseTimeTravel;
  export const travelFrom = (from: Date) => VerboseTimeTravel;
}
