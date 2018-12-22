import { Injectable } from '@angular/core';
import { SEASON_SCHEDULE, TEAMS } from "./schedule-data";
import { of } from "rxjs";
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SoccerService {

  constructor(private messageService : MessageService) { }

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
    this.messageService.add(`SoccerService: fetched schedule`);
    return of(SEASON_SCHEDULE);
  }

  getSchedule() : any {
    return SEASON_SCHEDULE;
  }

  getTeamsAsync() : any {
    return Promise.resolve(TEAMS);
  }

  getTeams() : any {
    this.messageService.add(`SoccerService: fetched teams`);
    return TEAMS;
  }  
}
