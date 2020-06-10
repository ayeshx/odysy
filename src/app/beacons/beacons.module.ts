import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { InfoModule } from './info/info.module';
import { InfoComponent } from './info/info.component';
import { BeaconsComponent } from './beacons.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BeaconsComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    InfoModule,
    FormsModule
  ],
  entryComponents: [InfoComponent],
  exports: [
    BeaconsComponent
  ]
})

export class BeaconModule {}