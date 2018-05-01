import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostgresPlv8SideEffectsComponent } from './postgres-plv8-side-effects.component';
import { NgxGistModule } from 'ngx-gist/dist/ngx-gist.module';

describe('PostgresPlv8SideEffectsComponent', () => {
  let component: PostgresPlv8SideEffectsComponent;
  let fixture: ComponentFixture<PostgresPlv8SideEffectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostgresPlv8SideEffectsComponent ],
      imports: [ NgxGistModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostgresPlv8SideEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
