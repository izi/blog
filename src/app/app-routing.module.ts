import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { GameOfLifeComponent } from './post/game-of-life/game-of-life.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'post-list', component: PostListComponent },
  { path: 'game', component: GameOfLifeComponent },
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
