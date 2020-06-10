import { Component, OnInit } from "@angular/core";
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from "@capacitor/core";
import { DatabaseOpsService } from "../database-ops.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-main-landing",
  templateUrl: "./main-landing.component.html",
  styleUrls: ["./main-landing.component.scss"],
})
export class MainLandingComponent implements OnInit {
  scrollTop = 0;
  hideNav = false;
  showNav2 = false;
  users = [];
  constructor(private databaseProvider: DatabaseOpsService, private router: Router) {}

  ngOnInit() {
    this.databaseProvider.getUsers().subscribe(users => {
      this.users = users;
      this.users.forEach(user => {
        console.log(user);
      })
    });
  }

  async googleSignIn() {
    this.router.navigate(["/login"]);
    // let googleUser = await Plugins.GoogleAuth.signIn();
    // this.databaseProvider.addUser({
    //   name: googleUser.name,
    //   email: googleUser.email,
    //   id: googleUser.id,
    //   imageUrl: googleUser.imageUrl,
    //   familyName: googleUser.familyName,
    //   givenName: googleUser.givenName
    // });
    // console.log(googleUser);
  }
  onScroll(event) {
    console.log("Scrolled");
    console.log(event);
    this.hideNav = this.scrollTop < event.detail.scrollTop;
    if (this.hideNav == true) {
      console.log("First one hidden");
      this.showNav2 = true;
    } else {
      console.log("Second one hidden");
      this.showNav2 = false;
    }
    console.log(this.hideNav);
    this.scrollTop = event.detail.scrollTop;
    console.log(this.scrollTop);
  }

  // var prevScrollpos = window.pageYOffset;
  //   window.onscroll = function () {
  //     var currentScrollPos = window.pageYOffset;
  //     if (prevScrollpos > currentScrollPos) {
  //       document.getElementById("navbar").style.top = "0";
  //     } else {
  //       document.getElementById("navbar").style.top = "-50px";
  //     }
  //     prevScrollpos = currentScrollPos;
  //   };
}
