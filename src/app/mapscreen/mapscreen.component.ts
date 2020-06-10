import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PopoverController, ToastController } from "@ionic/angular";
import { MapPopoverComponent } from "./map-popover/map-popover.component";
import { CyberSecurityStoryComponent } from "../cyber-security-story/cyber-security-story.component";
import {Plugins} from "@capacitor/core";
const {Storage} = Plugins;

@Component({
  selector: "app-mapscreen",
  templateUrl: "./mapscreen.component.html",
  styleUrls: ["./mapscreen.component.scss"],
})
export class MapscreenComponent implements OnInit {
  x: any;
  y: any;

  constructor(
    private router: Router,
    private popCtrl: PopoverController,
    private toastCtrl: ToastController
  ) {
    const start = this.router.getCurrentNavigation().extras.state.start;
    if (start == "Cyber") {
      this.x = 196;
      this.y = 228;
    } else if (start == "Music") {
      this.x = 689;
      this.y = 390;
    }
  }

  async ngOnInit() {
    const { value } = await Storage.get({ key: "user" });
    if (!value) {
      const toast = await this.toastCtrl.create({
        message: "You need to login first!",
        duration: 2000,
      });
      toast.present();
      this.router.navigate(["/login"]);
    }
  }

  async onClickCyber(ev: any) {
    // this.router.navigate(['/cyber']);
    const pop = await this.popCtrl.create({
      component: MapPopoverComponent,
      componentProps: {
        title: "Green EV Company",
        button: "Time to be a CEO?",
        link: "/cyber",
      },
      event: ev,
    });
    pop.present();
  }

  async onClickSpeech(ev: any) {
    // this.router.navigate(['/cyber']);
    const pop = await this.popCtrl.create({
      component: MapPopoverComponent,
      componentProps: {
        title: "Speechless",
        button: "Overcome fear",
        link: "/speech",
      },
      event: ev,
    });
    pop.present();
  }

  async onClickBeacons(ev: any) {
    // this.router.navigate(['/cyber']);
    const pop = await this.popCtrl.create({
      component: MapPopoverComponent,
      componentProps: {
        title: "Do you IoT?",
        button: "Connect Everything!",
        link: "/beacons",
      },
      event: ev,
    });
    pop.present();
  }
  async onClickAi(ev: any) {
    // this.router.navigate(['/cyber']);
    const pop = await this.popCtrl.create({
      component: MapPopoverComponent,
      componentProps: {
        title: "AI World!",
        button: "Be a machine genius :)",
        link: "/ai",
      },
      event: ev,
    });
    pop.present();
  }
}
