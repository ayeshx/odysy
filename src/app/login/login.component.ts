import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { FacebookLoginResponse } from "@rdlabo/capacitor-facebook-login";
import { Router, NavigationExtras } from "@angular/router";
const { Storage } = Plugins;
import {
  NativePageTransitions,
  NativeTransitionOptions,
} from "@ionic-native/native-page-transitions/ngx";
import { IonSlides, LoadingController } from "@ionic/angular";
import { DatabaseOpsService } from "../database-ops.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  users = [];
  opts = {
    autoplay: {
      delay: 2000,
    },
  };

  constructor(
    private router: Router,
    private nativePageTransitions: NativePageTransitions,
    private databaseProvider: DatabaseOpsService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.databaseProvider.getUsers().subscribe((users) => {
      this.users = users;
      this.users.forEach((user) => {
        console.log(user);
      });
    });
  }

  async ngAfterViewInit() {}

  async onLogin(): Promise<void> {
    let googleUser = await Plugins.GoogleAuth.signIn();
    const findUser = this.users.find((user) => user.id == googleUser.id);
    if (findUser) {
      const { value } = await Storage.get({ key: "user" });
      if (value) {
        this.router.navigate(["/home"]);
        
      } else {
        await Storage.set({
          key: "user",
          value: JSON.stringify({
            name:googleUser.name,
            email: googleUser.email,
            imageUrl: googleUser.imageUrl,
            familyName: googleUser.familyName,
            givenName: googleUser.givenName,
            id: googleUser.id,
            resume: {
              interests : [],
              experiences: [],
              education: []
            },
            traits: {
              scientific: [],
              personality: []
            },
            tracks: {
              completed: [],
              ongoing: []
            }
          })
        });
        this.router.navigate(["/home"]);
      }
      
    } else {
      const loading = await this.loadingController.create({
        message: "Please wait...",
      });
      await loading.present();
      await this.databaseProvider.addUser({
        name: googleUser.name,
        email: googleUser.email,
        id: googleUser.id,
        imageUrl: googleUser.imageUrl,
        familyName: googleUser.familyName,
        givenName: googleUser.givenName,
        resume: {
          interests : [],
          experiences: [],
          education: []
        },
        traits: {
          scientific: [],
          personality: []
        },
        tracks: {
          completed: [],
          ongoing: []
        }
      });
      loading.dismiss();
      await Storage.set({
        key: "user",
        value: JSON.stringify({
          name:googleUser.name,
          email: googleUser.email,
          imageUrl: googleUser.imageUrl,
          familyName: googleUser.familyName,
          givenName: googleUser.givenName,
          id: googleUser.id,
          resume: {
            interests : [],
            experiences: [],
            education: []
          },
          traits: {
            scientific: [],
            personality: []
          },
          tracks: {
            completed: [],
            ongoing: []
          }
        })
      });
      await Storage.set({
        key: "first-time",
        value: "yes",
      });
      this.router.navigate(["/home"]);
    }

    console.log(googleUser);

    //   let options: NativeTransitionOptions = {
    //     direction: 'right',
    //     duration: 2000,
    //     slowdownfactor: 3,
    //     slidePixels: 20,
    //     iosdelay: 100,
    //     androiddelay: 150,
    //     fixedPixelsTop: 0,
    //     fixedPixelsBottom: 60
    //    }

    //  this.nativePageTransitions.fade(options).then(()=>{
    //    console.log('Done');

    //  });
  }

  async signOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
  }
}
