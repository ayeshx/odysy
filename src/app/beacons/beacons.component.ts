import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';
import { InfoComponent } from './info/info.component';
import { Router } from '@angular/router';

import * as PluginLibrary from "capacitor-video-player";
import { Plugins } from '@capacitor/core';
const { CapacitorVideoPlayer, Device, Storage } = Plugins;

@Component({
  selector: 'app-beacons',
  templateUrl: './beacons.component.html',
  styleUrls: ['./beacons.component.scss'],
})
export class BeaconsComponent implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;
  slide_remover_count: number = 0;
  final_items = [];
  _videoPlayer: any;
  _url: any;

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

  public choices = [
    { val: 'Built from high quality materials so it can last long', isChecked: true },
    { val: 'Ability to connect to edge devices like sensors', isChecked: false },
    { val: 'Has internet connectivity', isChecked: true },
    { val: 'Has great computing capabilities that can solve complex problems', isChecked: false },
    { val: 'Lightweight and portable devices', isChecked: true },
    { val: 'Relatively inexpensive', isChecked: false }
  ];

  async onMicroAss(){
    await this.slides.lockSwipeToNext(false);
    if(this.choices[0].isChecked == true && this.choices[3].isChecked == true) {
      await this.slides.slideTo(1);
    } else if (this.choices[0].isChecked == true && this.choices[3].isChecked == false){
      this.slides.getSwiper().then(async (swiper) => {
        await swiper.removeSlide([2]);
        await swiper.slideNext();
        this.slide_remover_count ++;
      });
    } else if (this.choices[0].isChecked == false && this.choices[3].isChecked == true){
      this.slides.getSwiper().then(async (swiper) => {
        await swiper.removeSlide([1]);
        await swiper.slideNext();
        this.slide_remover_count ++;
      });
    } else if (this.choices[0].isChecked == false && this.choices[3].isChecked == false){
      await this.slides.slideTo(3);
    }
  }

  constructor(private toastCtrl: ToastController,private router: Router, private ModalCtrl: ModalController) { }

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

  async slideChange() {
    console.log("Slide Changed");
    const slideno = await this.slides.getActiveIndex();
    if (slideno == 3 && this.slide_remover_count == 0) {
      console.log("Reached Slide 5");
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
      });
    } else if (slideno == 5 && this.slide_remover_count == 1){
      console.log("Reached Slide 5");
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
      });
    } else if (slideno == 5 && this.slide_remover_count == 2){
      console.log("Reached Slide 5");
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
      });
      await this.slides.lockSwipeToNext(true);
    } else if (slideno == 4 && this.slide_remover_count == 3){
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
      });
    } else if(slideno == 3 && this.slide_remover_count == 4){
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
      });
    }
  }

  async onAddItem(item:string){
    this.final_items.push(item);
    const toast = await this.toastCtrl.create({
      message: `${item} has been added to your list!`,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async onDeviceInfo(){
    await this.slides.slideNext();
    await this.slides.lockSwipeToNext(true);
  }

  async onFinalItemForward(){
    await this.slides.lockSwipeToNext(false);
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
    await this.slides.slideNext();
    setTimeout(()=>{
      this.router.navigate(['/map'], {replaceUrl: true,state: {start:"Cyber"}});
    }, 20000)
  }

  async onInfo(info: string){
    console.log('Info asked for: ' + info);
    if(info == 'camera'){
      console.log('Camera');
    } else if (info == 'micro'){
      console.log('Micro');
    }
    const modal = await this.ModalCtrl.create({
      component: InfoComponent,
      componentProps: {
        info: info
      }
    });
    // modal.onDidDismiss().then(async detail => {
    //   await this.slides.lockSwipeToNext(false);
    //   await this.slides.slideNext(500);
    //   setTimeout(()=>{
    //     this.router.navigate(['/map'], {replaceUrl: true,state: {start: 'Cyber'}});
    //   },5000)
    // });
    await modal.present();
    // this.slides.getSwiper().then(async swiper => {
    //   swiper.removeSlide([0,1,2,3,4,5,6,7,8,9]);
    //   await this.slides.lockSwipeToNext(true);
    // });
  }

  async onSkipIntro(){
    await this.slides.slideTo(5);
  }

  async onIntro(){
    await this.slides.slideTo(3);
  }

  async onCorrect(){
    await this.slides.slideNext();
  }

  async onWrong(){
    await this.slides.slideTo(2);
  }

  onOne(){
    console.log('One was clicked');
  }

  onTwo(){
    console.log('Two was clicked');
  }

  onThree(){
    console.log('Three was clicked');
  }

  onFour(){
    console.log('Four was clicked');
  }
}
