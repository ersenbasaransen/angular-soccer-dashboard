import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorIpComponent } from './visitor-ip.component';

describe('VisitorIpComponent', () => {
  let component: VisitorIpComponent;
  let fixture: ComponentFixture<VisitorIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
