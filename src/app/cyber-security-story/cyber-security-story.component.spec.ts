import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CyberSecurityStoryComponent } from './cyber-security-story.component';

describe('CyberSecurityStoryComponent', () => {
  let component: CyberSecurityStoryComponent;
  let fixture: ComponentFixture<CyberSecurityStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyberSecurityStoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CyberSecurityStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
