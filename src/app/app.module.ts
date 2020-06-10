import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FlashCardComponent } from "./flash-card/flash-card.component";
import { TestPageComponent } from "./test-page/test-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { LoginComponent } from "./login/login.component";
import { EvSuperStoryComponent } from "./ev-super-story/ev-super-story.component";
import { CyberSecurityStoryComponent } from "./cyber-security-story/cyber-security-story.component";
import { DecisionScreenComponent } from "./cyber-security-story/decision-screen/decision-screen.component";
import { CyberSecurityStoryModule } from "./cyber-security-story/cyber-security-story.module";
import { StreamingMedia } from "@ionic-native/streaming-media/ngx";
import { VideoPlayer } from "@ionic-native/video-player/ngx";
import { MapscreenComponent } from "./mapscreen/mapscreen.component";
import { MapPopoverComponent } from "./mapscreen/map-popover/map-popover.component";
import { PathOptionsComponent } from "./path-options/path-options.component";
import { NativePageTransitions } from "@ionic-native/native-page-transitions/ngx";
import { SpeechComponent } from "./speech/speech.component";
import { HomeComponent } from "./home/home.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { ChartModule } from "primeng/chart";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BeaconModule } from "./beacons/beacons.module";
import { UserProfileModule} from "./user-profile/user-profile.module";
import { AiTrackComponent } from './ai-track/ai-track.component';
import { MainLandingComponent } from './main-landing/main-landing.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { credentials } from '../../config';
import { DatabaseOpsService } from './database-ops.service';
import { FormsModule } from '@angular/forms';
import { UserMetricsService } from './user-metrics.service';
import { LabComponent } from './lab/lab.component';
import { Lab2Component } from './lab2/lab2.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashCardComponent,
    TestPageComponent,
    LandingPageComponent,
    LoginComponent,
    EvSuperStoryComponent,
    MapscreenComponent,
    MapPopoverComponent,
    PathOptionsComponent,
    SpeechComponent,
    HomeComponent,
    AiTrackComponent,
    MainLandingComponent,
    LabComponent,
    Lab2Component
  ],
  entryComponents: [TestPageComponent, MapPopoverComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CyberSecurityStoryModule,
    BeaconModule,
    ChartModule,
    ClarityModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    UserProfileModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation,
    StreamingMedia,
    VideoPlayer,
    NativePageTransitions,
    DatabaseOpsService,
    UserMetricsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
