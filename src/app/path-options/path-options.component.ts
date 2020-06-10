import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Plugins } from "@capacitor/core";
import { ToastController } from "@ionic/angular";
const { Storage } = Plugins;

@Component({
  selector: "app-path-options",
  templateUrl: "./path-options.component.html",
  styleUrls: ["./path-options.component.scss"],
})
export class PathOptionsComponent implements OnInit {
  chipcolor1: boolean = false;
  chipcolor2: boolean = false;
  chipcolor3: boolean = false;
  chipcolor4: boolean = false;
  chipcolor5: boolean = false;
  chipcolor6: boolean = false;
  chips = [];
  startPath = "";

  constructor(private router: Router, private toastCtrl: ToastController) {}

  onProceed() {
    if (this.chips.includes("Ambitious") && this.chips.includes("Artistic")) {
      this.startPath = "Music";
    } else if (this.chips.includes("Environmental")) {
      this.startPath = "Cyber";
    } else if (this.chips.includes("Researcher")) {
      this.startPath = "Cyber";
    } else if (this.chips.includes("Agreeableness")) {
      this.startPath = "Music";
    }
    this.router.navigate(["/map"], { state: { start: this.startPath } });
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

  onClick1() {
    console.log("Clicked");
    this.chipcolor1 = !this.chipcolor1;
    if (this.chipcolor1 == true) {
      this.chips.push("Ambitious");
    } else {
      this.chips.splice(
        this.chips.findIndex((res) => res == "Ambitious"),
        1
      );
    }
    console.log(this.chips);
  }
  onClick2() {
    console.log("Clicked");
    this.chipcolor2 = !this.chipcolor2;
    if (this.chipcolor2 == true) {
      this.chips.push("Artistic");
    } else {
      this.chips.splice(
        this.chips.findIndex((res) => res == "Artistic"),
        1
      );
    }
    console.log(this.chips);
  }
  onClick3() {
    console.log("Clicked");
    this.chipcolor3 = !this.chipcolor3;
    if (this.chipcolor3 == true) {
      this.chips.push("Opinionated");
    } else {
      this.chips.splice(
        this.chips.findIndex((res) => res == "Opinionated"),
        1
      );
    }
    console.log(this.chips);
  }
  onClick4() {
    console.log("Clicked");
    this.chipcolor4 = !this.chipcolor4;
    if (this.chipcolor4 == true) {
      this.chips.push("Environmental");
    } else {
      this.chips.splice(
        this.chips.findIndex((res) => res == "Environmental"),
        1
      );
    }
    console.log(this.chips);
  }
  onClick5() {
    console.log("Clicked");
    this.chipcolor5 = !this.chipcolor5;
    if (this.chipcolor5 == true) {
      this.chips.push("Agreeableness");
    } else {
      this.chips.splice(
        this.chips.findIndex((res) => res == "Agreeableness"),
        1
      );
    }
    console.log(this.chips);
  }

  onClick6() {
    console.log("Clicked");
    this.chipcolor6 = !this.chipcolor6;
    if (this.chipcolor6 == true) {
      this.chips.push("Researcher");
    } else {
      this.chips.splice(
        this.chips.findIndex((res) => res == "Researcher"),
        1
      );
    }
    console.log(this.chips);
  }
}
