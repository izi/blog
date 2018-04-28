import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { NgxGistModule } from 'ngx-gist/dist/ngx-gist.module';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListComponent ],
      imports: [ NgxGistModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
