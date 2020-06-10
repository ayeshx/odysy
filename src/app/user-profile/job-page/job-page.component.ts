import { Component, OnInit, Input } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { UserMetricsService } from "src/app/user-metrics.service";
import { User } from "src/app/user";
import { LoadingController, ModalController, ToastController } from "@ionic/angular";
const { Storage } = Plugins;

@Component({
  selector: "app-job-page",
  templateUrl: "./job-page.component.html",
  styleUrls: ["./job-page.component.scss"],
})
export class JobPageComponent implements OnInit {
  @Input() type;
  edit: boolean = false;
  user: User;
  education: string = "";
  interests = [];
  experience: string = "";

  constructor(
    private userSrv: UserMetricsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    console.log(this.type);
    if (this.type == "edit") {
      this.edit = true;
      const { value } = await Storage.get({ key: "user" });
      this.user = JSON.parse(value);
      console.log(this.user);
    }
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: "Saving Updates...",
      spinner: "bubbles",
    });
    await loading.present();
    this.user.resume.education.push(this.education);
    this.interests.forEach((interest) => {
      this.user.resume.interests.push(interest);
    });
    this.user.resume.experiences.push(this.experience);
    const modal = await this.modalCtrl.getTop();
    const toast = await this.toastCtrl.create({
      message: "Resume Updated Successfully!",
      duration: 2000
    });
    this.userSrv.updateUser(this.user);
    loading.dismiss();
    toast.present();
    console.log(this.user);
    modal.dismiss();
    
  }
}
