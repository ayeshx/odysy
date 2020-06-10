import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobPageComponent } from './job-page.component';

describe('JobPageComponent', () => {
  let component: JobPageComponent;
  let fixture: ComponentFixture<JobPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
