import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvSuperStoryComponent } from './ev-super-story.component';

describe('EvSuperStoryComponent', () => {
  let component: EvSuperStoryComponent;
  let fixture: ComponentFixture<EvSuperStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvSuperStoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvSuperStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
