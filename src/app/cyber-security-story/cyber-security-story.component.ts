import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2
} from "@angular/core";
import { VideoPlayer } from "@ionic-native/video-player/ngx";

import {
  IonSlide,
  IonSlides,
  GestureController,
  ModalController,
  AnimationController,
  NavController,
  ToastController
} from "@ionic/angular";
import {
  StreamingMedia,
  StreamingVideoOptions
} from "@ionic-native/streaming-media/ngx";
import { Router } from "@angular/router";
import { DecisionScreenComponent } from "./decision-screen/decision-screen.component";
import { Plugins } from "@capacitor/core";
import * as PluginLibrary from "capacitor-video-player";
import { QuizscreenComponent } from './quizscreen/quizscreen.component';
const { CapacitorVideoPlayer, Device, Storage } = Plugins;

@Component({
  selector: "app-cyber-security-story",
  templateUrl: "./cyber-security-story.component.html",
  styleUrls: ["./cyber-security-story.component.scss"]
})
export class CyberSecurityStoryComponent implements OnInit, AfterViewInit {
  src: string = "../../assets/img/Cybersecurity_1.PNG";
  kali_slides = [0,1,2,3,4,23,24,25,26,27,28,29,30,31,32,33,34];
  windows_slides = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  pc: string = "";
  status: boolean = false;
  divtw: boolean = true;
  divon: boolean = false;
  pc_dec: string = '';
  button_status: string = "";
  @ViewChild("slide", { static: true }) slide: IonSlides;
  @ViewChild("swipecard", { static: false }) swipecard: ElementRef;
  @ViewChild("cardref", { static: false }) cardref: ElementRef;
  @ViewChild("divone", { static: true }) one: ElementRef;
  @ViewChild("divtwo", { static: true }) two: ElementRef;
 

  _videoPlayer: any;
  _url: string;

  opts2 = {
    direction: "vertical"
  };

  slideOpts = {
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
          virtualTranslate: true
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
              opacity: slideOpacity
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
      }
    }
  };

  constructor(
    private renderer: Renderer2,
    private gestureCtrl: GestureController,
    private router: Router,
    private ModalCtrl: ModalController,
    private streamingMedia: StreamingMedia,
    private videoPlayer: VideoPlayer,
    private animateCtrl: AnimationController,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}


  async ngOnInit() {
    console.log('Init');
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

  async onBagiz() {
    const modal = await this.ModalCtrl.create({
      component: DecisionScreenComponent,
      componentProps: {
        title: "Okay here are your options, choose wisely ..",
        subtitle: "Choose either profile for Bagiz..",
        first_choice: "active",
        second_choice: "passive",
        first_choice_img: "../../../assets/img/bagiz_active.jpeg",
        second_choice_img: "../../../assets/img/bagiz_passive.jpeg"
      }
    });
    modal.onDidDismiss().then(async detail => {
      if (detail !== null) {
        console.log("The result:", detail);
        if (detail.data.choice == "active") {
          this.button_status = "";
          const info = await Device.getInfo();
          if (info.platform === "ios" || info.platform === "android") {
            this._videoPlayer = CapacitorVideoPlayer;
            this._url = "/raw/testvideo";
          } else {
            this._videoPlayer = PluginLibrary.CapacitorVideoPlayer;
            this._url = "../../assets/testvideo.mp4"
          }
          const res: any = await this._videoPlayer.initPlayer({
            mode: "fullscreen",
            url: this._url
          });
          this.router.navigate(['/map'], {replaceUrl: true,state: {start:"Cyber"}});
          // this.navCtrl.pop();
          await this.slide.lockSwipeToPrev(true);
        } else {
          this.button_status = '';
          await this.slide.lockSwipeToNext(false);
          // this.slide.getSwiper().then(swiper => {
          //   swiper.removeSlide(this.windows_slides);
          // });
          await this.slide.slideTo(3);
          console.log('Slid');
          await this.slide.lockSwipeToPrev(true);
        }
      }
    });
    modal.present();
  }

  async onKeygen() {
    const modal = await this.ModalCtrl.create({
      component: DecisionScreenComponent,
      componentProps: {
        title: "Okay here are your options, choose wisely ..",
        subtitle: "Choose either software carefully..",
        first_choice: "keygen",
        second_choice: "trial version",
        first_choice_img: "../../../assets/img/keygen.jpg",
        second_choice_img: "../../../assets/img/mcafee.jpg"
      }
    });
    modal.onDidDismiss().then(async detail => {
      if (detail !== null) {
        console.log("The result:", detail);
        if (detail.data.choice == "keygen") {
          this.button_status = "";
          const info = await Device.getInfo();
          if (info.platform === "ios" || info.platform === "android") {
            this._videoPlayer = CapacitorVideoPlayer;
            this._url = "/raw/testvideo";
          } else {
            this._videoPlayer = PluginLibrary.CapacitorVideoPlayer;
            this._url = "../../assets/testvideo.mp4"
          }
          const res: any = await this._videoPlayer.initPlayer({
            mode: "fullscreen",
            url: this._url
          });
          this.router.navigate(['/map'], {replaceUrl: true,state: {start:"Cyber"}})
          // this.navCtrl.pop();
          await this.slide.lockSwipeToPrev(true);
        } else {
          this.button_status = '';
          // this.slide.getSwiper().then(swiper => {
          //   swiper.removeSlide(this.windows_slides);
          // });
          await this.slide.slideTo(6);
          console.log('Slid');
          await this.slide.lockSwipeToPrev(true);
        }
      }
    });
    modal.present();
  }

  async onKaliQuiz(){
    console.log('Kali Quiz');
    const modal = await this.ModalCtrl.create({
      component: QuizscreenComponent,
      componentProps: {
        title: "Is Kali your weapon?",
        subtitle: "Let's review what you've picked up",
      }
    });
    modal.onDidDismiss().then(async detail => {
      await this.slide.lockSwipeToNext(false);
      await this.slide.slideNext(500);
      setTimeout(()=>{
        this.router.navigate(['/map'], {replaceUrl: true,state: {start: 'Cyber'}});
      },5000)
    });
    await modal.present();
    this.slide.getSwiper().then(async swiper => {
      swiper.removeSlide([0,1,2,3,4,5,6,7,8,9]);
      await this.slide.lockSwipeToNext(true);
      // await this.slide.lockSwipeToPrev(false);
      // await this.slide.lockSwipeToNext(false);
      // await this.slide.slideTo(0);
    });
  }

  async onWinQuiz(){
    console.log('Win Quiz');
    const modal = await this.ModalCtrl.create({
      component: QuizscreenComponent,
      componentProps: {
        title: "Is Windows your weapon?",
        subtitle: "Let's review what you've picked up",
      }
    });
    modal.onDidDismiss().then(async detail => {
      await this.slide.lockSwipeToNext(false);
      await this.slide.slideNext(500);
      setTimeout(()=>{
        this.router.navigate(['/map'], {replaceUrl: true,state: {start: 'Cyber'}});
      },5000)
    });
    modal.present();
  }

  async onDecision() {
    const modal = await this.ModalCtrl.create({
      component: DecisionScreenComponent,
      componentProps: {
        title: "Okay here are your options, choose wisely ..",
        subtitle: "Choose either machine by swiping them on their sides!",
        first_choice: "Windows",
        second_choice: "Kali",
        first_choice_img: "../../../assets/img/Windows-10.png",
        second_choice_img: "../../../assets/img/Kali-1.png"
      }
    });
    modal.onDidDismiss().then(async detail => {
      if (detail !== null) {
        console.log("The result:", detail);
        if (detail.data.choice == "Windows") {
          this.button_status = "";
          this.pc_dec = 'windows';
          this.slide.getSwiper().then(async swiper => {
            swiper.removeSlide(this.kali_slides);
            await this.slide.lockSwipeToPrev(false);
            await this.slide.slideTo(0);
            const slid = await this.slide.getActiveIndex();
          console.log(slid);
          });
          // await this.slide.slideTo(5);
          
          // this.slide.lockSwipeToNext(true);

          await this.slide.lockSwipeToPrev(true);
        } else {
          this.pc_dec = 'kali';
          this.slide.getSwiper().then(async swiper => {
            swiper.removeSlide(this.windows_slides);
            await this.slide.lockSwipeToPrev(false);
            await this.slide.lockSwipeToNext(false);
            await this.slide.slideTo(0);
            const slid = await this.slide.getActiveIndex();
          console.log(slid);
          });

          

          this.slide.lockSwipeToPrev(true);
        }
      }
    });
    modal.present();
  }

  onTap() {
    this.status = !this.status;
  }

  async slideChange(){
    const slideno = await this.slide.getActiveIndex();
    console.log('Slide changed to Slide: ' + slideno);
    if(slideno == 4){
      this.button_status = 'pc'
    } else if (slideno == 5){
      this.button_status = 'keygen';
    } else if (slideno == 2 && this.pc_dec == 'windows'){
      this.button_status = 'windows_quiz';
    }  else if (slideno == 2 && this.button_status != ''){
      await this.slide.lockSwipeToNext(true);
      this.button_status = 'bagiz';
    } else if (slideno == 10 && this.pc_dec == 'kali'){
      
      
      this.button_status = 'kali_quiz';
    } else if (slideno == 14 && this.pc_dec == 'windows'){
      this.slide.getSwiper().then(async swiper => {
        swiper.removeSlide([0,1,2,3,4,5,6,7,8,9,10,11,12,13]);
        await this.slide.lockSwipeToPrev(false);
        await this.slide.lockSwipeToNext(false);
        await this.slide.slideTo(0);
      });
    }
  }

  async ngAfterViewInit() {
    // await this.slide.slideTo(21);
    const animation1 = this.animateCtrl.create()
    .addElement(this.one.nativeElement)
    .duration(500)
    .fromTo('opacity', '1', '0')
    .easing('ease-in');

    const animation2 = this.animateCtrl.create()
    .addElement(this.two.nativeElement)
    .duration(500)
    .fromTo('opacity', '0', '1')
    .easing('ease-out');
    const gesture2 = await this.gestureCtrl.create({
      el: this.one.nativeElement,
      gestureName: "swipe",
      
      onEnd: ev => {
        console.log('End');
        console.log(this.one + ' ' + this.two);
        this.divtw = false;
        animation1.play();
        animation2.play();
        // this.renderer.setStyle(this.one.nativeElement, "transition", "0.3s ease-out");
        // this.renderer.setStyle(this.one.nativeElement, 'opacity', '0');
        // this.renderer.setStyle(this.two.nativeElement, 'transition', '0.5s ease-in');
        // this.renderer.setStyle(this.two.nativeElement, 'opacity', '1');
        this.divon = true;
      }
    });
    gesture2.enable(true);
  }
}
