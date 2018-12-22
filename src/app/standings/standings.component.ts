import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { ITeam } from "../interfaces/i-team";
import { IRanking } from "../interfaces/i-ranking";
import { ISchedule } from "../interfaces/i-schedule";
import { SoccerService } from "../services/soccer.service";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
  providers: [ Title, SoccerService]
})
export class StandingsComponent implements OnInit {
  public LeagueName : string;
  public UsingAsync: boolean = false;
  public MySchedule : ISchedule[];
  public Standings : IRanking[];
  public MyTeams : ITeam[];

  constructor(private _titleService : Title, private _soccerService: SoccerService) {
    this._titleService.setTitle("422 Sportsplex");
    this.LeagueName = "Over 30 men's league";
    this.UsingAsync = true;
  }

  ngOnInit() {
    this.getTeams();
    this.getSchedule();
    // this.ComputeRankings();
    // this.SortStandings();
  }

  getTeams() {
    if (this.UsingAsync) {
      let xx = this._soccerService.getTeamsAsync();
      xx.then((Teams:ITeam[])=> this.MyTeams =Teams );
    }
    else {
      this.MyTeams = this._soccerService.getTeams();
    }
  }

  /**
   * getSchedule
   */
  // private getSchedule() {
  //   if (this.UsingAsync) {
  //     let xx = this._soccerService.getScheduleAsnyc();
  //     xx.then((Schedules:ISchedule[]) => {
  //       this.MySchedule = Schedules;
  //       this.ComputeRankings();
  //       this.SortStandings();
  //     });
  //   }
  //   else {
  //     this.MySchedule = this._soccerService.getSchedule();
  //     this.ComputeRankings();
  //     this.SortStandings();
  //   }
  // }

  /**
   * getSchedule using RxJs Observale
   */
  private getSchedule() {
    if (this.UsingAsync) {
      this._soccerService.getScheduleAsnyc()
      .subscribe(data => {  // (data : ISchedule[]) veya (data : any) veya data
        this.MySchedule = data;
        this.ComputeRankings();
        this.SortStandings();
      });
    }
    else {
      this.MySchedule = this._soccerService.getSchedule();
      this.ComputeRankings();
      this.SortStandings();
    }
  }


  /**
   * ComputeRankings
   */
  public ComputeRankings() {
    var curDate: Date = new Date();
    var TeamAt: number;
    this.Standings = []; // Empty the array

    this.MySchedule.forEach(element => {
      // If game has already been played
      if (element.PlayingDate < curDate && element.HomeScore>=0) {
        TeamAt = this.FindTeam(element.HomeTeam);

        if (TeamAt<0) {
          this.Standings.push( {
              TeamName: element.HomeTeam,
              GamesPlayed:0,
              Wins:0,
              Ties:0,
              GoalsFor:0,
              GoalsAgainst:0
            });

            TeamAt = this.Standings.length-1;
          }

          this.UpdCurrentRow(element,TeamAt,"H");
          TeamAt = this.FindTeam(element.AwayTeam);

          if (TeamAt<0) {
            this.Standings.push( {
              TeamName: element.AwayTeam,
              GamesPlayed:0,
              Wins:0,
              Ties:0,
              GoalsFor:0,
              GoalsAgainst:0
            });

            TeamAt = this.Standings.length-1;
          }

          this.UpdCurrentRow(element,TeamAt,"A");
        }
      });
  }

  /**
   * SortStandings
   */
  public SortStandings() {
    this.Standings.sort((left, right): number => {
      if (left.Wins*3+left.Ties<right.Wins*3+right.Ties)
        return 1;
      if (left.Wins*3+left.Ties>right.Wins*3+right.Ties)
        return -1;

        // Else, then are tied, typically we'd add addition logic to break Ties
        if (left.GoalsFor<right.GoalsFor)
          return 1;

        if (left.GoalsFor>right.GoalsFor)
          return -1;

        // Finally, return zero if still tied.
        return 0;
      })
    };

  private UpdCurrentRow(element:ISchedule,TeamAt:number,HomeAway:string) {
    this.Standings[TeamAt].GamesPlayed ++;

    if (HomeAway=="H") {
      this.Standings[TeamAt].GoalsFor += element.HomeScore;
      this.Standings[TeamAt].GoalsAgainst += element.AwayScore;

      // Win
      if (element.HomeScore>element.AwayScore) {
        this.Standings[TeamAt].Wins++;
      }
    }

    if (HomeAway=="A") {
      this.Standings[TeamAt].GoalsFor += element.AwayScore;
      this.Standings[TeamAt].GoalsAgainst += element.HomeScore;

      if (element.AwayScore>element.HomeScore) {
        this.Standings[TeamAt].Wins++;
      }
    }

    if (element.HomeScore==element.AwayScore) {
      this.Standings[TeamAt].Ties++;
    }
  }

  // Find the team or -1
  private FindTeam(TeamName:string) : number {
    var FoundAt: number = -1;

    for (var _x=0;_x < this.Standings.length;_x++) {
      if (this.Standings[_x].TeamName==TeamName) {
        return _x;
      }
    }

    return FoundAt;
  }
}
