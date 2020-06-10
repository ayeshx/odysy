import {
  Component,
  OnInit,
  Renderer2,
  AfterViewChecked,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { GestureController, IonSlides, AlertController, ToastController } from "@ionic/angular";
import { Gesture } from "@ionic/core";
import * as PluginLibrary from "capacitor-video-player";
import Swiper from "swiper";
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { UserMetricsService } from '../user-metrics.service';
import { User } from '../user';
const { CapacitorVideoPlayer, Device, Storage } = Plugins;

@Component({
  selector: "app-speech",
  templateUrl: "./speech.component.html",
  styleUrls: ["./speech.component.scss"],
})
export class SpeechComponent implements OnInit, AfterViewInit {
  @ViewChild("slide", { static: true }) slides: IonSlides;
  slide_remover_count = 0;
  _videoPlayer: any;
  _url: any;
  choice = {
    opening: 0,
    premise: 0,
    body: 0,
    callforaction: 0,
    close: 0
  }
  traits = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  speech_mappings = {
    opening: {
      optionA: [+0.6, -0.4, +0.2, 0, 0, -0.8, +0.7, +0.2, +0.1, 0, -0.5, 0, -0.3, +0.2, -0.1, +0.5, 0, 0, 0, 0, -0.6 ,-0.6, -0.5, -0.8, +0.7, +0.6, +0.4, +0.5, +0.8, +0.2],
      optionB: [-0.9, 0, -0.9, 0, 0, -0.5, +1.0, +0.9, +0.9, +0.3, +0.7, 0, -0.6, -0.8, 0, +0.8, -0.8, -0.1, -0.8 ,-0.7, -0.9, -0.6, -0.9, -0.7, -0.6, -0.5, -0.7 ,-0.7],
      optionC: [+0.1, +0.7, +0.9, +0.3, -0.1, +0.3, +0.7, +0.2, +0.1, +0.6, +0.5, 0, +0.8, +0.8 ,+0.2, 0, +0.8, +0.9, +0.1, +0.2, +0.2, +0.3, +0.8, +0.7, 0, 0, 0, 0, 0, 0]
    },
    premise: {
      optionA: [-0.6, +0.1, -0.4, 0.5, +0.7, 0, +1.0, +0.8, +0.7, 0.9, +0.5, 0.4, -0.2, 0, +0.7, +0.5, 0, 0 ,-0.2, -0.4, -0.6, -0.6, -0.5, -0.8, +0.1 ,+0.1, -0.4, +0.3, 0 ,0],
      optionB: [+0.1, +0.4, 0.8, 0, -0.4 ,+0.9 ,+0.4 +0.2, +0.1, 0 ,+0.1, +0.2, +0.6, +0.2 ,-0.1 ,+0.3 ,+1.0 ,+1.0, +0.2, +0.3, +0.1 ,+0.6 ,+0.5, +0.7 ,+0.7, +0.4, 0, 0 ,0 ,0],
      optionC: [+0.7, +0.4 ,+0.5, +0.4, +0.4, 0 ,+0.7, +0.3, +0.6, +1.0, +0.2, 0, +0.3 ,+0.5, +0.8, +0.5, 0.1, +0.1, -0.2, -0.3, -0.4, 0.3, -0.8, -0.6, 0, 0, +0.5, +0.2, +0.2]
    },
    body: {
      optionA:[+0.2, +0.2, +0.4, +0.5, +0.7, 0, +0.9, +0.8 ,+0.7, +1.0, +0.5, +0.9, -0.2, +0.3, +0.7, +0.6, -0.3 ,-0.1, -0.2, -0.4 ,-0.6 ,-0.1 ,-0.5, -0.3, +0.3, +0.2, +0.1, +0.3, +0.2, +0.1],
      optionB: [+0.1 ,+0.4 ,+0.8, +1.0 ,-0.4 ,+0.9, +0.6 ,+0.2 ,+0.1 ,-0.3, +0.2 ,-0.2 ,+0.2 ,+0.3 ,+0.1 ,+0.2 ,+0.9 ,+0.8 ,+1.0, +0.9, +0.6 ,+1.0 ,0, +0.8, 0 ,0, 0, 0, 0, 0],
      optionC: [+0.3, +0.2, +0.1, -0.9, +0.4, -0.5, +0.7, +0.3, +0.4, +0.7, +0.7, 1.0, +0.3, -0.2, +0.4, +0.5, -0.1, -0.2, -0.2, -0.3, -0.4 ,-0.3 ,  -0.2, -0.3, 0, 0 ,-0.1, +0.1, 0]
    },
    callforaction: {
      optionA: [-0.6 ,-0.2, -0.4 ,+0.9, +0.9, +0.4, +0.3, +0.8 ,+0.7, +1.0, +0.5, +0.4, +0.2 ,+0.3, +0.7, +0.6, 0, 0 ,+0.5, +0.3, +0.6, +0.9, +0.3 ,+0.1 ,0 ,0, 0 ,0, 0 ,0],
      optionB: [0 ,-0.1, +0.2, +0.7, 0, -0.1, +0.6 ,+0.2, +0.1, +0.2, +0.1, -0.2, -0.2, -0.3, -0.2, +0.2, -0.2 ,-0.2 ,-0.9, -0.6 ,-0.5 ,-0.4 ,-0.2 , -0.6, 0, 0, 0 ,0, 0, 0],
      optionC: [+0.4 ,+0.4, +0.6, 0, -0.4, +0.7, +0.1, +0.1 ,-0.1 ,-0.7, +0.3, -0.6, +0.6, -0.2, -0.1, -0.5 ,+0.8 ,+0.6, +0.9, +0.8 ,+0.9 ,+0.9 ,+0.7 ,+0.7, 0 ,0 ,0, 0, 0]
    },
    close: {
      optionA: [+0.6, +0.4, +0.4, +0.3, +0.2, +0.4, +0.3, +0.3, +0.3, +0.7, +0.5, +0.4, +0.6, +0.6, +0.7, +0.6, 0.4, 0.3, +0.1, +0.1, +0.6, +0.5, +0.3, +0.1, 0, 0, 0, 0, 0, 0],
      optionB: [+0.4, +0.1, +0.4 ,+0.1, 0.3, -0.1, +0.6, +0.2, +0.1, +0.5, +0.5, +0.3, +0.1, +0.3, +0.4, +0.7, -0.1, -0.1 ,+0.3, +0.2, +0.5, +0.9, -0.2, -0.1, 0, 0, 0 ,0, 0, 0],
      optionC: [-0.5, 0, -0.3, 0.3, +0.8, 0, +0.5, +0.2, +0.2, +0.8, +0.4 ,+0.8, +0.3, +0.2, +0.9, +0.5, +0.1, +0.2, +0.3, +0.3 ,+0.2, +0.5, +0.5, +0.6, 0, 0, 0, 0, 0]
    }
  }

  // @ViewChild('divtwo', {static:false}) divtwo: ElementRef;

  constructor(
    private rederer: Renderer2,
    private gestureCtrl: GestureController,
    private alertCtrl: AlertController,
    private router: Router,
    private toastCtrl: ToastController,
    private userSrv: UserMetricsService
  ) {
    console.log(this.traits.length);
  }

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

  async slideChange() {
    console.log("Slide Changed");
    const slideno = await this.slides.getActiveIndex();
    if (slideno == 4 && (this.slide_remover_count == 1 || this.slide_remover_count == 0)) {
      console.log("Reached Slide 5");
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
      });
    }
    else if(slideno == 7 && this.slide_remover_count == 2) {
      console.log("Reached Slide 5");
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4, 5, 6]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
      });
    }
    else if (slideno == 2 && this.slide_remover_count == 3) {
      setTimeout(async ()=>{
        const alert = await this.alertCtrl.create({
          header: 'Your Speech',
          subHeader: 'This is how you chose to speak!',
          message: 'Are you ready? The crowd is waiting, lets do this, we know what to say!!',
          buttons: [
            {
              text: 'Okay'
            }
          ]
        });
        alert.present();
        alert.onDidDismiss().then(async ()=>{
          console.log(this.choice);
          const info = await Device.getInfo();
          if (info.platform === "ios" || info.platform === "android") {
            this._videoPlayer = CapacitorVideoPlayer;
            this._url = "/raw/testvideo";
          } else {
            this._videoPlayer = PluginLibrary.CapacitorVideoPlayer;
            this._url = "../../assets/testvideo.mp4"
          }
          console.log(this.traits);
          const { value } = await Storage.get({ key: 'user' });
          var user:User = JSON.parse(value);
          var openness = 0;
          var consc = 0;
          var extroversion = 0;
          var agree = 0;
          var neurotic = 0;
          for(var i = 0; i<6; i++){
            openness+= this.traits[i];
          }
          for(var i = 6; i< 12; i++){
            consc+= this.traits[i];
          }
          for(var i = 12; i<18; i++){
            extroversion+= this.traits[i];
          }
          for(var i = 18; i<24; i++){
            agree+= this.traits[i];
          }
          for(var i = 24; i<30; i++){
            neurotic+= this.traits[i];
          }
          if(openness > 3 && !user.traits.personality.find(trait=> trait.toLowerCase() == "openness")) {
            
            user.traits.personality.push("Openness");
          }
          if(consc > 3 && !user.traits.personality.find(trait=> trait.toLowerCase() == "conscientiousness")) {
            user.traits.personality.push("Conscientiousness");
          }
          if(extroversion > 3 && !user.traits.personality.find(trait=> trait.toLowerCase() == "extroversion")) {
            user.traits.personality.push("Extroversion");
          }
          if(agree > 3 && !user.traits.personality.find(trait=> trait.toLowerCase() == "agreeableness")) {
            user.traits.personality.push("agreeableness");
          }
          if(neurotic > 3 && !user.traits.personality.find(trait=> trait.toLowerCase() == "neuroticism")) {
            user.traits.personality.push("neuroticism");
          }
          user.tracks.completed.push("speech");
          this.userSrv.updateUser(user);
          const res: any = await this._videoPlayer.initPlayer({
            mode: "fullscreen",
            url: this._url
          });

          this.router.navigate(['/map'], {replaceUrl: true,state: {start:"Cyber"}});
        });
      }, 5000)
    } else if ((slideno == 2 || slideno == 3 || slideno == 4 || slideno == 5 || slideno == 6) && this.slide_remover_count == 2){
      await this.slides.lockSwipeToNext(true);
    } 
  }
  ngAfterViewInit() {}

  async onChoice(decision: string, choice: number) {
    if (decision == "opening") {
      switch (choice) {
        case 1: this.choice.opening = 1;
          for(var i = 0; i<this.traits.length; i++){
            this.traits[i] += this.speech_mappings.opening.optionA[i];
          }
          break;
        case 2: this.choice.opening = 2;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.opening.optionB[i];
        }
          break;
        case 3: this.choice.opening = 3;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.opening.optionC[i];
        }
          break;
      }
      console.log(this.traits);
      await this.slides.lockSwipeToNext(false);
    } else if (decision == "premise") {
      switch (choice) {
        case 1: this.choice.premise = 1;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.premise.optionA[i];
        }
          break;
        case 2: this.choice.premise = 2;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.premise.optionB[i];
        }
          break;
        case 3: this.choice.premise = 3;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.premise.optionC[i];
        }
          break;
      }
      console.log(this.traits);
      await this.slides.lockSwipeToNext(false);
    } else if (decision == "body") {
      switch (choice) {
        case 1: this.choice.body = 1;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.body.optionA[i];
        }
          break;
        case 2: this.choice.body = 2;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.body.optionB[i];
        }
          break;
        case 3: this.choice.body = 3;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.body.optionC[i];
        }
          break;
      }
      console.log(this.traits);
      await this.slides.lockSwipeToNext(false);
    } else if (decision == "callforaction") {
      switch (choice) {
        case 1: this.choice.callforaction = 1;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.callforaction.optionA[i];
        }
          break;
        case 2: this.choice.callforaction = 2;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.callforaction.optionB[i];
        }
          break;
        case 3: this.choice.callforaction = 3;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.callforaction.optionC[i];
        }
          break;
      }
      console.log(this.traits);
      await this.slides.lockSwipeToNext(false);
    } else if (decision == "close") {
      switch (choice) {
        case 1: this.choice.close = 1;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.close.optionA[i];
        }
          break;
        case 2: this.choice.close = 2;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.close.optionB[i];
        }
          break;
        case 3: this.choice.close = 3;
        for(var i = 0; i<this.traits.length; i++){
          this.traits[i] += this.speech_mappings.close.optionC[i];
        }
          break;
      }
      console.log(this.traits);
      await this.slides.lockSwipeToNext(false);
    }
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
}
