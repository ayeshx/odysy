import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Plugins } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from '@angular/router';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

  
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      // StatusBar.hide();
    });
  }

  ngOnInit() {
  }

  onQuest(){
    this.router.navigate(['/map'], {state: {start: 'Cyber'}});
    this.menuCtrl.close();
  }

  onUserProfile(){
    this.router.navigate(['/user']);
    this.menuCtrl.close();
  }

  onHome(){
    this.router.navigate(['/home']);
    this.menuCtrl.close();
  }
}
