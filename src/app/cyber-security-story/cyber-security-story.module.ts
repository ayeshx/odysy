import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CyberSecurityStoryComponent } from './cyber-security-story.component';
import { DecisionScreenComponent } from './decision-screen/decision-screen.component';
import { DecisionScreenModule } from './decision-screen/decision-screen.module';
import { QuizscreenComponent } from './quizscreen/quizscreen.component';
import { QuizscreenModule } from './quizscreen/quizscreen.module';

@NgModule({
  declarations: [
    CyberSecurityStoryComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    DecisionScreenModule,
    QuizscreenModule
  ],
  entryComponents: [DecisionScreenComponent, QuizscreenComponent],
  exports: [
    CyberSecurityStoryComponent
  ]
})

export class CyberSecurityStoryModule{}