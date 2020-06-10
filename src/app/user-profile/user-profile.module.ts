import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { JobModule } from './job-page/job-page.module';
import { JobPageComponent } from './job-page/job-page.component';
import { ClarityModule } from '@clr/angular';
import { ChartModule } from 'primeng/chart';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    JobModule,
    FormsModule,
    ChartModule,
    ClarityModule,
    BrowserModule,
    FormsModule,
    BrowserModule
  ],
  entryComponents: [JobPageComponent],
  exports: [
    UserProfileComponent
  ]
})

export class UserProfileModule {}