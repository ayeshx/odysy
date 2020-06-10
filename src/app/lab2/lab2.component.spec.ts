import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Lab2Component } from './lab2.component';

describe('Lab2Component', () => {
  let component: Lab2Component;
  let fixture: ComponentFixture<Lab2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lab2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Lab2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
