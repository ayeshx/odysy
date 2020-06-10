import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestPageComponent } from './test-page/test-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { EvSuperStoryComponent } from './ev-super-story/ev-super-story.component';
import { CyberSecurityStoryComponent } from './cyber-security-story/cyber-security-story.component';
import { DecisionScreenComponent } from './cyber-security-story/decision-screen/decision-screen.component';
import { MapscreenComponent } from './mapscreen/mapscreen.component';
import { PathOptionsComponent } from './path-options/path-options.component';
import { SpeechComponent } from './speech/speech.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BeaconsComponent } from './beacons/beacons.component';
import { AiTrackComponent } from './ai-track/ai-track.component';
import { MainLandingComponent } from './main-landing/main-landing.component';
import { LabComponent } from './lab/lab.component';
import { Lab2Component } from './lab2/lab2.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'landing',
    component: MainLandingComponent
  },
  {
    path: 'ai',
    component: AiTrackComponent
  },
  {
    path: 'beacons',
    component: BeaconsComponent
  },
  {
    path: 'user',
    component: UserProfileComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'speech',
    component: SpeechComponent
  },
  {
    path: 'path',
    component: PathOptionsComponent
  },
  {
    path: 'map',
    component: MapscreenComponent
  },
  {
    path: 'lab',
    component: LabComponent
  },
  {
    path: 'lab2',
    component: Lab2Component
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cyber',
    component: CyberSecurityStoryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
