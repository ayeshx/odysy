import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Plugins} from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    autoplay: {
      delay: 2000
    },
    speed: 400
  }

  async getFirstTime(){
    const ret = await Storage.get({key:'first-time'});
    if(ret.value == 'yes'){
      this.router.navigate(['login']);
      console.log('YEESSSSSSSS');
    } else {
      await Storage.set({
        key: 'first-time',
        value: 'yes'
      });
      console.log('NOOOOOOOOOOOOO');
    }
  }

  constructor(private router:Router) { }

  ngOnInit() {
    // this.getFirstTime();
  }

  onBeginJournery(){
    this.router.navigate(['landing']);
  }

}
