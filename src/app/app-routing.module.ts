import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { GameOfLifeComponent } from './post/game-of-life/game-of-life.component';
import { PostgresPlv8SideEffectsComponent } from './post/postgres-plv8-side-effects/postgres-plv8-side-effects.component';

const routes: Routes = [
  { path: 'game-of-life', component: GameOfLifeComponent },
  { path: 'plv8', component: PostgresPlv8SideEffectsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'game-of-life', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

RouterModule.forRoot([

]);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
