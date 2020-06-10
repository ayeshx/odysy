import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { IonSlides, AlertController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Component({
  selector: "app-ai-track",
  templateUrl: "./ai-track.component.html",
  styleUrls: ["./ai-track.component.scss"],
})
export class AiTrackComponent implements OnInit, AfterViewInit {
  ifDiagnosis: boolean = false;
  ifSchedule: boolean = false;
  ifRegression: boolean = false;
  ifVision: boolean = false;
  ifWeather: boolean = false;
  ifCarType: boolean = false;
  ifCarColor: boolean = false;
  ifStation: boolean = false;
  ifCarUsers: boolean = false;
  ifDriverInfo: boolean = false;
  ifUnits: boolean = false;
  ifOutliers: boolean = false;
  ifMissing: boolean = false;
  ifFormats: boolean = false;
  ifReal: boolean = false;
  ifAge: boolean = false;
  ifRegion: boolean = false;
  ifNone: boolean = false;
  ifFirstG: boolean = false;
  ifSecondG: boolean = false;
  ifThirdG: boolean = false;
  ifFourthG: boolean = false;
  ifCheap: boolean = false;
  ifExpensive: boolean = false;
  ifMobile: boolean = false;
  ifCloud: boolean = false;
  ifModelA: boolean = false;
  ifModelB: boolean = false;
  ifModelC: boolean = false;
  ifModelD: boolean = false;
  ifModelE: boolean = false;
  ifModelF: boolean = false;
  ifAnotherCity: boolean = false;
  slideOpts = {
    initialSlide: 0,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ["webkitTransitionEnd", "transitionend"];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    },
  };
  @ViewChild("slides", { static: true }) slides: IonSlides;
  slide_remover_count: number = 0;
  current_slide = 0;

  constructor(
    private toastCtrl: ToastController,
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ngAfterViewInit() {
    this.slides.lockSwipeToNext(true);
  }

  async slideChange() {
    console.log("Slide Changed");
    this.current_slide = await this.slides.getActiveIndex();
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
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  async onInfo(choice: string) {
    console.log("Chose: " + choice);
    if (choice == "begin") {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } else if (choice == "exit") {
      this.router.navigate(["/home"], { replaceUrl: true });
    } else if (choice == "diagnosis") {
      this.ifDiagnosis = !this.ifDiagnosis;
      if (this.ifDiagnosis == true) {
        this.ifSchedule = false;
      }
    } else if (choice == "scheduling") {
      this.ifSchedule = !this.ifSchedule;
      if (this.ifSchedule == true) {
        this.ifDiagnosis = false;
      }
    } else if (
      choice == "next" &&
      this.current_slide == 1 &&
      this.slide_remover_count == 0
    ) {
      if (this.ifSchedule) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideNext();
        await this.slides.lockSwipeToNext(true);
      } else if (this.ifDiagnosis) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(18);
        console.log("Reached Slide 5");
        this.slides.getSwiper().then(async (swiper) => {
          swiper.removeSlide([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
          ]);
          swiper.slideTo(0);
          this.slide_remover_count += 2;
          await this.slides.lockSwipeToNext(true);
        });
      }
    } else if (
      choice == "next" &&
      this.current_slide == 2 &&
      this.slide_remover_count == 0
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } else if (choice == "regression") {
      this.ifRegression = !this.ifRegression;
      if (this.ifRegression == true) {
        this.ifVision = false;
      }
    } else if (choice == "vision") {
      this.ifVision = !this.ifVision;
      if (this.ifVision == true) {
        this.ifRegression = false;
      }
    } else if (
      choice == "next" &&
      this.current_slide == 3 &&
      this.slide_remover_count == 0
    ) {
      if (this.ifRegression) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideNext();
        await this.slides.lockSwipeToNext(true);
      } else if (this.ifVision) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(10);
        console.log("Reached Slide 5");
        this.slides.getSwiper().then(async (swiper) => {
          swiper.removeSlide([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          swiper.slideTo(0);
          await this.slides.lockSwipeToNext(true);
          this.slide_remover_count++;
        });
      }
    } else if (
      choice == "next1" &&
      (this.current_slide == 0 || this.current_slide == 1) &&
      this.slide_remover_count == 1
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } else if (
      choice == "next2" &&
      (this.current_slide == 0 ||
        this.current_slide == 1 ||
        this.current_slide == 2) &&
      (this.slide_remover_count == 2 || this.slide_remover_count == 1)
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    }
    // else if(choice == 'next2' && this.current_slide == 0 && this.slide_remover_count == 1){
    //   await this.slides.lockSwipeToNext(false);
    //   await this.slides.slideNext();
    //   await this.slides.lockSwipeToNext(true);
    // }
    else if (
      choice == "next1" &&
      (this.current_slide == 3 ||
        this.current_slide == 4 ||
        this.current_slide == 5 ||
        this.current_slide == 6) &&
      this.slide_remover_count == 1
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(7);
      await this.slides.lockSwipeToNext(true);
    } else if (
      choice == "next1" &&
      this.current_slide == 7 &&
      this.slide_remover_count == 1
    ) {
      this.router.navigate(["/home"], { replaceUrl: true });
    } else if (
      choice == "next1" &&
      this.current_slide == 2 &&
      this.slide_remover_count == 1
    ) {
      if (this.ifModelA) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideNext();
        await this.slides.lockSwipeToNext(true);
      } else if (this.ifModelB) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(4);
        await this.slides.lockSwipeToNext(true);
      } else if (this.ifModelC || this.ifModelE) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(5);
        await this.slides.lockSwipeToNext(true);
      } else if (this.ifModelD) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(6);
        await this.slides.lockSwipeToNext(true);
      } else if (this.ifAnotherCity) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(8);
        this.slides.getSwiper().then(async (swiper) => {
          swiper.removeSlide([0, 1, 2, 3, 4, 5, 6, 7]);
          this.ifModelA,
            this.ifModelB,
            this.ifModelC,
            this.ifModelD,
            (this.ifModelE = false);
          swiper.slideTo(0);

          await this.slides.lockSwipeToNext(true);
          this.slide_remover_count++;
        });
      }
    } else if (
      choice == "next2" &&
      this.current_slide == 3 &&
      this.slide_remover_count == 2
    ) {
      if (this.ifModelA && this.ifModelC && this.ifModelD && this.ifModelE) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(4);
        this.slides.getSwiper().then(async (swiper) => {
          swiper.removeSlide([0, 1, 2, 3, 5, 6, 7, 8]);
          swiper.slideTo(0);
          await this.slides.lockSwipeToNext(true);
          this.slide_remover_count++;
        });
      } else if (this.ifModelA && this.ifModelC && this.ifModelD) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(5);
        this.slides.getSwiper().then(async (swiper) => {
          swiper.removeSlide([0, 1, 2, 3, 4, 6, 7, 8]);
          swiper.slideTo(0);
          await this.slides.lockSwipeToNext(true);
          this.slide_remover_count++;
        });
      } else if (this.ifModelC && this.ifModelD && this.ifModelE) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(6);
        this.slides.getSwiper().then(async (swiper) => {
          swiper.removeSlide([0, 1, 2, 3, 4, 5, 7, 8]);
          swiper.slideTo(0);
          await this.slides.lockSwipeToNext(true);
          this.slide_remover_count++;
        });
      } else if (this.ifModelA && this.ifModelC && this.ifModelE) {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(7);
        this.slides.getSwiper().then(async (swiper) => {
          swiper.removeSlide([0, 1, 2, 4, 3, 5, 6, 8]);
          swiper.slideTo(0);
          await this.slides.lockSwipeToNext(true);
          this.slide_remover_count++;
        });
      } else {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(8);
        this.slides.getSwiper().then(async (swiper) => {
          swiper.removeSlide([0, 1, 2, 3, 4, 5, 6, 7]);
          swiper.slideTo(0);
          await this.slides.lockSwipeToNext(true);
          this.slide_remover_count++;
        });
      }
    } else if (choice == "next3") {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } else if (choice == "next4" || choice == "next5") {
      this.router.navigate(["/home"], { replaceUrl: true });
    } else if (choice == "modelA") {
      this.ifModelA = !this.ifModelA;
      if (this.slide_remover_count == 1) {
        this.ifModelB = false;
        this.ifModelC = false;
        this.ifModelD = false;
        this.ifModelE = false;
        this.ifAnotherCity = false;
      }
      if (this.ifModelA == true && this.slide_remover_count == 2) {
        const t = await this.toastCtrl.create({
          message: "Make sure to select at least 3 steps to get a good result!",
          position: "top",
          duration: 2500,
        });
        t.present();
      }
    } else if (choice == "modelB") {
      this.ifModelB = !this.ifModelB;
      if (this.slide_remover_count == 1) {
        this.ifModelA = false;
        this.ifModelC = false;
        this.ifModelD = false;
        this.ifModelE = false;
        this.ifAnotherCity = false;
      }
      if (this.ifModelB == true && this.slide_remover_count == 2) {
        const al = await this.alertCtrl.create({
          header: "Hold On",
          subHeader: "Your choice is not ideal",
          message:
            "Unstructured data and labeling is time consuming and will cost us more money! Try to select at least 3 more steps to get a meaningful result.",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "modelC") {
      this.ifModelC = !this.ifModelC;
      if (this.slide_remover_count == 1) {
        this.ifModelB = false;
        this.ifModelA = false;
        this.ifModelD = false;
        this.ifModelE = false;
        this.ifAnotherCity = false;
      }
      if (this.ifModelC == true && this.slide_remover_count == 2) {
        const t = await this.toastCtrl.create({
          message: "Make sure to select at least 3 steps to get a good result!",
          position: "top",
          duration: 2500,
        });
        t.present();
      }
    } else if (choice == "modelD") {
      this.ifModelD = !this.ifModelD;
      if (this.slide_remover_count == 1) {
        this.ifModelB = false;
        this.ifModelC = false;
        this.ifModelA = false;
        this.ifModelE = false;
        this.ifAnotherCity = false;
      }
      if (this.ifModelD == true && this.slide_remover_count == 2) {
        const t = await this.toastCtrl.create({
          message: "Make sure to select at least 3 steps to get a good result!",
          position: "top",
          duration: 2500,
        });
        t.present();
      }
    } else if (choice == "modelE") {
      this.ifModelE = !this.ifModelE;
      if (this.slide_remover_count == 1) {
        this.ifModelB = false;
        this.ifModelC = false;
        this.ifModelD = false;
        this.ifModelA = false;
        this.ifAnotherCity = false;
      }
      if (this.ifModelE == true && this.slide_remover_count == 2) {
        const t = await this.toastCtrl.create({
          message: "Make sure to select at least 3 steps to get a good result!",
          position: "top",
          duration: 2500,
        });
        t.present();
      }
    } else if (choice == "modelF") {
      this.ifModelF = !this.ifModelF;
      if (this.ifModelF == true) {
        const al = await this.alertCtrl.create({
          header: "Hold On",
          subHeader: "Your choice is not ideal",
          message:
            "These models will overfit and might not generalize to Springfield! Try to select at least 3 more steps to get a meaningful result.",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "anothercity") {
      this.ifAnotherCity = !this.ifAnotherCity;
      if (this.slide_remover_count == 1) {
        this.ifModelB = false;
        this.ifModelC = false;
        this.ifModelD = false;
        this.ifModelE = false;
        this.ifModelA = false;
      }
    } else if (choice == "cheap") {
      this.ifCheap = !this.ifCheap;
      if (this.ifCheap == true) {
        const al = await this.alertCtrl.create({
          header: "Your Selection Result",
          subHeader: "Cheap and low processing power",
          message:
            "There is not enough processing power on this machine and training algorithms require a lot of memory unfortunately :(",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "mobile") {
      this.ifMobile = !this.ifMobile;
      if (this.ifMobile == true) {
        const al = await this.alertCtrl.create({
          header: "Your Selection Result",
          subHeader: "Mobile and long training time",
          message:
            "Although your team can train models while traveling around, there is no GPU and it will take a longer time to train on a CPU! Yes, GPUs are used for training models !!",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "expensive") {
      this.ifExpensive = !this.ifExpensive;
      if (this.ifExpensive == true) {
        const al = await this.alertCtrl.create({
          header: "Your Selection Result",
          subHeader: "Expensive and short training time",
          message:
            "A fantastic choice! A very capable machine with a solid GPU to train models. But everything good has its cost, and this machine takes up all your budget and is also not portable so keep that in mind!",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "cloud") {
      this.ifCloud = !this.ifCloud;
      if (this.ifCloud == true) {
        const al = await this.alertCtrl.create({
          header: "Your Selection Result",
          subHeader: "Cloud Subscription and Loss Control",
          message:
            "Very flexible option! You can work from anywhere, all data is stored remotely and can be accessed from anywhere, you can conveniently leave models to train and carry out other tasks on your local machines. However, you need to keep the subscription period in mind, your developers might not be happy about deadlines!",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (
      choice == "next" &&
      this.current_slide == 4 &&
      this.slide_remover_count == 0
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();

      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4]);
        swiper.slideTo(0);
        await this.slides.lockSwipeToNext(true);
        this.slide_remover_count++;
      });
    } else if (choice == "weather") {
      this.ifWeather = !this.ifWeather;
    } else if (choice == "car_type") {
      this.ifCarType = !this.ifCarType;
    } else if (choice == "car_color") {
      this.ifCarColor = !this.ifCarColor;
      if (this.ifCarColor == true) {
        const al = await this.alertCtrl.create({
          header: "Oops!",
          subHeader: "That is a bad choice!",
          message:
            "Vehicle color is not a likely explanation for the number of vehicles at a given station. A red vehicle does not mean that the owner is more likely to charge his car! ",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "station") {
      this.ifStation = !this.ifStation;
    } else if (choice == "car_user") {
      this.ifCarUsers = !this.ifCarUsers;
      if (this.ifCarUsers == true) {
        const al = await this.alertCtrl.create({
          header: "Oops!",
          subHeader: "That is a bad choice!",
          message:
            "The number of passengers riding in a vehicle is not a strong factor for the number of vehicles at a given station. You could have a single passenger and need to charge your car, or you can have 4 passengers and still need to charge your car.",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "driver_info") {
      this.ifDriverInfo = !this.ifDriverInfo;
      if (this.ifDriverInfo == true) {
        const al = await this.alertCtrl.create({
          header: "Oops!",
          subHeader: "That is a bad choice!",
          message:
            "The driver’s accident history might make him more attentive or relaxed while driving but it certainly does not influence his charging behavior!",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (
      choice == "next" &&
      this.current_slide == 0 &&
      this.slide_remover_count == 1
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } else if (choice == "units") {
      this.ifUnits = !this.ifUnits;
      if (this.ifUnits == true) {
        const al = await this.alertCtrl.create({
          header: "Oops!",
          subHeader: "That is a bad choice!",
          message:
            "As long as the timezone is consistent within the dataset, there is no need for conversion. Your model does not learn anything extra from GMT time! Same Reasoning if you want to change Temperature Units!",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "missing") {
      this.ifMissing = !this.ifMissing;
    } else if (choice == "formats") {
      this.ifFormats = !this.ifFormats;
    } else if (choice == "outliers") {
      this.ifOutliers = !this.ifOutliers;
    } else if (
      choice == "next" &&
      this.current_slide == 1 &&
      this.slide_remover_count == 1
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } else if (choice == "real") {
      this.ifReal = !this.ifReal;
      if (this.ifReal == true) {
        const al = await this.alertCtrl.create({
          header: "Oops!",
          subHeader: "That is a bad choice!",
          message:
            "Data anonymization is done to hide information in order to protect privacy. Therefore, it is highly recommended to keep personal details like names and contacts anonymized. Besides, your model learns nothing new from unanonymized names.",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (choice == "age") {
      this.ifAge = !this.ifAge;
    } else if (choice == "region") {
      this.ifRegion = !this.ifRegion;
    } else if (choice == "none") {
      this.ifNone = !this.ifNone;
      if (this.ifNone == true) {
        const al = await this.alertCtrl.create({
          header: "Oops!",
          subHeader: "That is a bad choice!",
          message: "Choice A is incorrect!",
          buttons: [
            {
              text: "Understood :)",
              role: "cancel",
            },
          ],
        });
        al.present();
      }
    } else if (
      choice == "next" &&
      this.current_slide == 2 &&
      this.slide_remover_count == 1
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } else if (choice == "firstg") {
      this.ifFirstG = !this.ifFirstG;
      if (this.ifFirstG == true) {
        const t = await this.toastCtrl.create({
          message: "That graph is incorrect!",
          position: "middle",
          duration: 2500,
        });
        await t.present();
        this.ifFirstG = false;
      }
    } else if (choice == "secondg") {
      this.ifSecondG = !this.ifSecondG;
      if (this.ifSecondG == true) {
        const t = await this.toastCtrl.create({
          message: "That graph is incorrect!",
          position: "middle",
          duration: 2500,
        });
        await t.present();
        this.ifSecondG = false;
      }
    } else if (choice == "thirdg") {
      this.ifThirdG = !this.ifThirdG;
    } else if (choice == "fourthg") {
      this.ifFourthG = !this.ifFourthG;
      if (this.ifFourthG == true) {
        const t = await this.toastCtrl.create({
          message: "That graph is incorrect!",
          position: "middle",
          duration: 2500,
        });
        await t.present();
        this.ifFourthG = false;
      }
    } else if (
      choice == "next" &&
      this.current_slide == 3 &&
      this.slide_remover_count == 1
    ) {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } else if (
      choice == "next" &&
      this.current_slide == 4 &&
      this.slide_remover_count == 1
    ) {
      this.router.navigate(["/home"], { replaceUrl: true });
    }
  }
}
