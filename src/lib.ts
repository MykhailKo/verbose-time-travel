import { aliases } from './alias';

export class VerboseTimeTravel {
  private fixedPoint: number;
  private fluctuation: number;
  private static timeParticles: { [key: string]: number } = Object.freeze({
    ms: 1,
    s: 1000,
    m: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24,
    w: 1000 * 60 * 60 * 24 * 7,
  });

  constructor(fluctuation: string, fixed: Date | number = Date.now()) {
    this.fixedPoint = fixed instanceof Date ? fixed.getTime() : fixed;
    this.fluctuation = this.translateFluctuation(fluctuation);
  }

  private translateFluctuation(verbose: string): number {
    const partRegExp = /(\d+)\s*([^\s\d]+)/gm;
    let fluctuation = 0;
    const timeParts = verbose.matchAll(partRegExp);
    if (!timeParts) return 0;
    for (const time of timeParts) {
      const particle = aliases[time[2]];
      if (particle) fluctuation += parseInt(time[1]) * VerboseTimeTravel.timeParticles[particle];
    }
    return fluctuation;
  }

  public back(fluctuation?: string): Date {
    if (fluctuation) return new Date(this.fixedPoint - this.translateFluctuation(fluctuation));
    return new Date(this.fixedPoint - this.fluctuation);
  }
  public forward(fluctuation?: string): Date {
    if (fluctuation) return new Date(this.fixedPoint + this.translateFluctuation(fluctuation));
    return new Date(this.fixedPoint + this.fluctuation);
  }
}

export const travel = (fluctuation: string) => new VerboseTimeTravel(fluctuation);
export const travelFrom = (from: Date) => new VerboseTimeTravel('0ms', from);
