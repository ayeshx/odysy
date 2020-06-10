import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { IonSlides, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  cardLoaded: boolean = false;

  opts = {
    speed: 1000,
    autoplay: {
      delay: 3000,
    },
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

  ionViewDidEnter() {
    setTimeout(() => {
      this.cardLoaded = true;
      console.log("Card Loaded");
    }, 500);
  }

  constructor(
    private router: Router,
    private screenOrientation: ScreenOrientation,
    private toastCtrl: ToastController
  ) {}

  onQuest() {
    this.router.navigate(["/map"], { state: { start: "Cyber" } });
  }

  onUserProfile() {
    this.router.navigate(["/user"], { replaceUrl: true });
  }
  async ngOnInit() {
    const { value } = await Storage.get({ key: "user" });
    if (!value) {
      const toast = await this.toastCtrl.create({
        message: "You need to login first!",
        duration: 2000
      });
      toast.present();
      this.router.navigate(["/login"]);
    }
  }

  ionViewWillEnter() {
    console.log("Screen Ori" + this.screenOrientation.type);
    console.log("Whatsup");
    if (this.screenOrientation.type === "portrait-primary") {
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.LANDSCAPE
      );
    }
  }

  async ngAfterViewInit() {
    await this.slides.startAutoplay();
  }
}
