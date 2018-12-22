import { Injectable } from '@angular/core';
import { SEASON_SCHEDULE, TEAMS } from "./schedule-data";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SoccerService {

  constructor() { }

  /**
   * using Promise
   */
  // getScheduleAsnyc() : any {
  //   return Promise.resolve(SEASON_SCHEDULE);
  // }

  /**
   * using RxJs Observables
   */
  getScheduleAsnyc() : any {  /*Observable<ISchedule[]> çalışmıyor neden?*/
    return of(SEASON_SCHEDULE);
  }

  getSchedule() : any {
    return SEASON_SCHEDULE;
  }

  getTeamsAsync() : any {
    return Promise.resolve(TEAMS);
  }

  getTeams() : any {
    return TEAMS;
  }  
}
