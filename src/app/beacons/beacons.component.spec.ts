import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeaconsComponent } from './beacons.component';

describe('BeaconsComponent', () => {
  let component: BeaconsComponent;
  let fixture: ComponentFixture<BeaconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeaconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
