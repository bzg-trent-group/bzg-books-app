import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRelatedComponent } from './book-related.component';

describe('BookRelatedComponent', () => {
  let component: BookRelatedComponent;
  let fixture: ComponentFixture<BookRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
