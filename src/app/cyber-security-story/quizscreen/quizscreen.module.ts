import { QuizscreenComponent } from './quizscreen.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    BrowserModule,
    FormsModule
  ],
  //exporting to be used in another component
  exports: [
    QuizscreenComponent //<----- this is if it is going to be used else where
  ],
  declarations: [QuizscreenComponent],  //<---- Needs to be declared
  entryComponents: [QuizscreenComponent] //<----This means that the Modal will be imperatively(v3 it was IonicPage()
})

export class QuizscreenModule {}