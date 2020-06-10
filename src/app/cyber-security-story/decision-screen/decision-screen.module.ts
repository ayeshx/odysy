import { DecisionScreenComponent } from './decision-screen.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    IonicModule,
    BrowserModule
  ],
  //exporting to be used in another component
  exports: [
    DecisionScreenComponent //<----- this is if it is going to be used else where
  ],
  declarations: [DecisionScreenComponent],  //<---- Needs to be declared
  entryComponents: [DecisionScreenComponent] //<----This means that the Modal will be imperatively(v3 it was IonicPage()
})

export class DecisionScreenModule {}