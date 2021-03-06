import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { ScoringComponent } from './scoring/scoring.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: "Standings", component: StandingsComponent },
  { path: "Scoring", component: ScoringComponent },
  { path: '', redirectTo: '/Standings', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
