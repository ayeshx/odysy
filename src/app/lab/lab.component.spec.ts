import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabComponent } from './lab.component';

describe('LabComponent', () => {
  let component: LabComponent;
  let fixture: ComponentFixture<LabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
