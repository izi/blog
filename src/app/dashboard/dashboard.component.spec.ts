import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { PostListComponent } from '../post-list/post-list.component';
import { ContactComponent } from '../contact/contact.component';

import { APP_BASE_HREF } from '@angular/common';
import { GameOfLifeComponent } from '../post/game-of-life/game-of-life.component';
import { NgxGistModule } from 'ngx-gist/dist/ngx-gist.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, PostListComponent, ContactComponent, GameOfLifeComponent],
      imports: [AppRoutingModule, NgxGistModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
