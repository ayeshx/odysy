import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AiTrackComponent } from './ai-track.component';

describe('AiTrackComponent', () => {
  let component: AiTrackComponent;
  let fixture: ComponentFixture<AiTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiTrackComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AiTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
