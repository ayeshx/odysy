import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController, AlertController, ModalController, IonGrid } from "@ionic/angular";
import {
  Plugins,
  FilesystemDirectory,
  FilesystemEncoding,
} from "@capacitor/core";
import { User } from "../user";
import { UserMetricsService } from '../user-metrics.service';
import { JobPageComponent } from './job-page/job-page.component';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

const { Filesystem, Storage } = Plugins;

// import {MenuModule} from 'primeng/menu';
// import {MenuItem} from 'primeng/api';
// import {MegaMenuItem} from 'primeng/api';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  seg = 0;
  data: any;
  job_updates: boolean = true;
  jobdocs: any;
  jobs: any = [];
  currentUser:User;
  jobsCollectionRef: AngularFirestoreCollection;
  manual_update: boolean = false;
  user_updates= {
    education_opp: [],
    track_recos: [],
    updates: [],
    futurejob_updates: []
  };
  grid: IonGrid;
  updates = [];
  futurejob_updates = [];
  education_opp = [
    {
      type: 'Masters',
      field: ['iot'],
      description: "American University of Sharjah have recently launched a new Graduate Program which allows you to specialize in IoT topics ranging from Smart Cities to Electric Vehicles. Go to www.aus.edu to learn more!"
    },
    {
      type: 'Bachelors',
      field: ['Artifical Intelligence', 'Machine Learning', 'computer science','media', 'communication'],
      description: 'Khalifa University has a new bachelors program which allows you to pursue a double major in both communications media and computer science'
    }
  ]
  track_recos = [
    {
      field: ['machine learning', 'ai', 'artifical intelligence', 'data science', 'computer vision'],
      description: 'If you are interested in Machine Learning, we have a track which shows you what it is like to be a Data Scientist in the professional world!'
    },
    {
      field: ['iot'],
      description: "If you are looking for what it's like to be in the field of IoT and the future of smart technology and the inter connected world, we have a specially crafted track just for you. Head over to the map to select it and start your adventure!"
    }
  ]
  //Should be returned by the user service getUser()
  user: User = {
    imageUrl:
      "https://lh3.googleusercontent.com/a-/AOh14GgxbUesmFD9f5_5WR_UMwTwRoP2N4d8AI5r0prq=s96-c",
    email: "astra.careers.ae@gmail.com",
    name: "Astra Asteroid",
    familyName: "Asteroid",
    givenName: "Astra",
    id: "118318891300047249434",
    resume: {
      experiences: [
        "Data Scientist",
        "Entreprenuer",
        "CEO",
        "Computer Engineer",
      ],
      interests: ["IoT", "Machine Learning", "Software", "Business"],
      education: ["American University of Sharjah"],
    },
    traits: {
      personality: ["Conscientiousness", "Openness"],
      scientific: ["Problem Solving"]
    },
    tracks: {
      completed: ["speech","ai"],
      ongoing: ["cyber-security"]
    }
  };

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private userSrv: UserMetricsService,
    private modalCtrl: ModalController,
    private afs: AngularFirestore
  ) {
    this.jobsCollectionRef = this.afs.collection('jobs');
    this.jobdocs = this.jobsCollectionRef.valueChanges();

    console.log(this.job_updates);
    this.data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  }

  toggleChange() {
    console.log(this.job_updates);
  }

  async ngOnInit() {
    setInterval(this.jobUpdates,300000);
  }

  async ionViewWillEnter(){
    const { value } = await Storage.get({ key: "user" });
    if (value) {
      this.user = JSON.parse(value);
    }
    // this.updates = this.jobs[0].;
    this.jobdocs.subscribe(jobdoc => {
      this.jobs = jobdoc;
      this.updates = this.jobs[0].jobs;
      this.futurejob_updates = this.jobs[0].future;
      console.log(this.futurejob_updates);
      console.log(this.updates);
    });
    this.jobUpdates();
  }

  async jobUpdates() {
    // var user_updates = [];
    //education recs && track recos, can be split later on
    if (this.job_updates == true || this.manual_update == true) {
      if (
        this.user.resume.interests.find(
          (interest) => interest.toLowerCase() == "iot"
        ) &&
        this.user.resume.education.find(
          (edu) => edu.toLowerCase() == "american university of sharjah"
        )
      ) {
        this.user_updates.education_opp.push(this.education_opp[0]);
        
      }
      if(this.user.resume.interests.find(
        (interest) => interest.toLowerCase() == "machine learning"
      )){
        this.user_updates.education_opp.push(this.education_opp[1]);
        this.user_updates.track_recos.push(this.track_recos[0]);
      }
      //iot track reco w/o AUS
      if(this.user.resume.interests.find(
        (interest) => interest.toLowerCase() == "iot"
      )){
        this.user_updates.track_recos.push(this.track_recos[1]);
      }
      //
      console.log(this.user_updates);
      // this.user_updates = user_updates;
      const alert = await this.alertCtrl.create({
        header: "Job Alerts",
        subHeader: "The Job Page has been updated",
        message: "Based on your recent progress and updates, new jobs and career advice has been added, you can view this on the Job/Careers Page",
        buttons: [
          "Great, thanks!",
          {
            text:"View Job/Careers",
            handler: async ()=>{
              await this.viewJobUpdatesPage();
            }
          }
        ],
        mode: "ios"
      });
      alert.present();
      this.manual_update = false;
    }
  }

  onManualUpdate(){
    this.manual_update = true;
    this.jobUpdates();
  }

  async viewJobUpdatesPage(){
    // const modal = await this.modalCtrl.create({
    //   component: JobPageComponent,
    //   componentProps: {
    //     updates: this.user_updates
    //   }
    // });
    // modal.present();
    this.seg = 2;
  }

  onSubmitForm() {}
  async fileRead(path) {
    let contents = await Filesystem.readFile({
      path: path,
      encoding: FilesystemEncoding.UTF8,
    });
    console.log(contents);
  }

  onQuest() {
    this.router.navigate(["/map"], { state: { start: "Cyber" } });
  }

  segmentChanged(event) {
    console.log(event.detail.value);
    if (event.detail.value == "profile") {
      this.seg = 0;
    } else if (event.detail.value == "progress") {
      this.seg = 1;
    } else {
      this.seg = 2;
    }
  }

  //Other Options
  async onEditProfile(){
    const modal = await this.modalCtrl.create({
      component: JobPageComponent,
      componentProps:{type: "edit"}
    });
    modal.present();
    modal.onDidDismiss().then(async ()=>{
      const { value } = await Storage.get({ key: "user" });
      if (value) {
        this.user = JSON.parse(value);
      }
      this.manual_update = true;
      this.jobUpdates();
    });
  }
}
