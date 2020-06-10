import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Plugins} from '@capacitor/core';
import {FlashCardComponent} from '../flash-card/flash-card.component';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  logininfo: any;
  user: any;
  constructor(private flash:FlashCardComponent, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.userinfo) {
        this.logininfo = JSON.parse(params.userinfo);
      }
    });
  }

  BeginStory(){
    this.router.navigate(['cyber']);
  }

  ngOnInit(){}
  ionViewWillEnter() {
    this.getUserInfo();
  }

  async signOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
    this.router.navigate(['/login']);
  }

  async getUserInfo() {
    const response = await fetch(`https://graph.facebook.com/${this.logininfo.userId}?fields=id,name,gender,link,picture&type=large&access_token=${this.logininfo.token}`);
    const myJson = await response.json();
    console.log('myjson', myJson);
    this.user = myJson
  }

}
