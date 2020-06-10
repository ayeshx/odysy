import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { JobPageComponent } from './job-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    BrowserModule,
    FormsModule
  ],
  //exporting to be used in another component
  exports: [
    JobPageComponent //<----- this is if it is going to be used else where
  ],
  declarations: [JobPageComponent],  //<---- Needs to be declared
  entryComponents: [JobPageComponent] //<----This means that the Modal will be imperatively(v3 it was IonicPage()
})

export class JobModule {}