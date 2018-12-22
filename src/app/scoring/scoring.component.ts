import { Component, OnInit } from '@angular/core';
import { ISchedule } from "../interfaces/i-schedule";
import { Title } from '@angular/platform-browser';
import { SoccerService } from '../services/soccer.service';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.css'],
  providers: [Title, SoccerService]
})
export class ScoringComponent implements OnInit {
  private UsingAsync: boolean = false;
  private CurGame: number = 0;
  public MySchedule: ISchedule[];
  public LeagueName: string;
  public HomeTeam : string;
  public AwayTeam : string;
  public HomeScore : number = 0;
  public AwayScore : number = 0;
  public SeasonStart: Date = new Date;
  public CurrentRole: number = 1;

  public constructor(private _soccerService: SoccerService ) {
    this.LeagueName = "Over 30 men's league";
    this.getSchedule();
    this.SeasonStart.setTime( this.SeasonStart.getTime() + 4 * 86400000 );

    if (this.MySchedule.length>0) {
      this.UpdVariables(0); // Default to first game
      this.CurGame = 1;
    }
  }

  ngOnInit() {
  }

  public onSchedChange(GameValue:number) {
    if (GameValue > 0) {
      this.UpdVariables(GameValue);
      this.CurGame = GameValue;
    }
  }

// Get the score from the form and update it
public onRecordScores() {
  this.MySchedule[this.CurGame - 1].AwayScore = Number(this.AwayScore);
  this.MySchedule[this.CurGame - 1].HomeScore = Number(this.HomeScore);
}

// Update screen variable based on current game
private UpdVariables(GameID: number) {
  // Need to search Schedule array, looking for game ID
  var x : number = 0;
  if (GameID > 0) {
    x = GameID - 1;
  }

  this.HomeTeam = this.MySchedule[x].HomeTeam;
  this.AwayTeam = this.MySchedule[x].AwayTeam;
  this.HomeScore = this.MySchedule[x].HomeScore;
  this.AwayScore = this.MySchedule[x].AwayScore;
}

// Get the schedule (only showing games not yet scored)
  private getSchedule() {
    if (this.UsingAsync) {
      let xx = this._soccerService.getScheduleAsnyc();
      xx.then((Schedules:ISchedule[])=> this.MySchedule = Schedules );
    }
    else {
      this.MySchedule = this._soccerService.getSchedule();
    }
  }
}
