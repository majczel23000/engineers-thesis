import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqNavigationComponent } from './faq-navigation.component';

describe('FaqNavigationComponent', () => {
  let component: FaqNavigationComponent;
  let fixture: ComponentFixture<FaqNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
