import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapscreenComponent } from './mapscreen.component';

describe('MapscreenComponent', () => {
  let component: MapscreenComponent;
  let fixture: ComponentFixture<MapscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapscreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
