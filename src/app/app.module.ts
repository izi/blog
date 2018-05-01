import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGistModule } from 'ngx-gist/dist/ngx-gist.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';
import { GameOfLifeComponent } from './post/game-of-life/game-of-life.component';
import { PostgresPlv8SideEffectsComponent } from './post/postgres-plv8-side-effects/postgres-plv8-side-effects.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PostComponent,
    ContactComponent,
    GameOfLifeComponent,
    PostgresPlv8SideEffectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxGistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
