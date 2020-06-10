import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lab2',
  templateUrl: './lab2.component.html',
  styleUrls: ['./lab2.component.scss'],
})
export class Lab2Component implements OnInit, AfterViewInit {
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
  tap_choices = [];
  ifGain1: boolean = false;
  ifGain2: boolean = false;
  ifGain3: boolean = false;
  ifGain4: boolean = false;
  ifTerm1: boolean = false;
  ifTerm2: boolean = false;
  ifRes1: boolean = false;
  ifRes2: boolean = false;
  ifRes3: boolean = false;
  ifRes4: boolean = false;
  ifRec1: boolean = false;
  ifRec2: boolean = false;
  ifRec3: boolean = false;
  ifRec4: boolean = false;
  

  constructor(private router:Router) { }

  ngOnInit() {  }
  async ngAfterViewInit() {
    this.slides.lockSwipeToNext(true);
  }

  async slideChange(){
    this.current_slide = await this.slides.getActiveIndex();
  }

  async onInfo(choice:string){
    //very first slide 0, 1, 2, 3, 4 next button
    if(choice == 'next' && this.slide_remover_count == 0 && (this.current_slide == 0 || this.current_slide == 1 || this.current_slide == 2)){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'gain1'){
      this.ifGain1 = true;
      this.ifGain2 = false;
      this.ifGain3 = false;
      this.ifGain4 = false;
    }
    else if(choice == 'gain2'){
      this.ifGain1 = false;
      this.ifGain2 = true;
      this.ifGain3 = false;
      this.ifGain4 = false;
    }
    else if(choice == 'gain3'){
      this.ifGain1 = false;
      this.ifGain2 = false;
      this.ifGain3 = true;
      this.ifGain4 = false;
    }
    else if(choice == 'gain4'){
      this.ifGain1 = false;
      this.ifGain2 = false;
      this.ifGain3 = false;
      this.ifGain4 = true;
    }
    else if(choice == 'next' && this.current_slide == 3 && this.slide_remover_count == 0){
      if(this.ifGain1 == true){
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(5);
        await this.slides.lockSwipeToNext(true);
      } else {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(4);
        await this.slides.lockSwipeToNext(true);
      }
    }
    else if(choice == 'next' && this.slide_remover_count == 0 && (this.current_slide == 4 || this.current_slide == 5)){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(6);
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4, 5]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
        await this.slides.lockSwipeToNext(true);
      });
    }
    //next section starting with terminal question, 1 removal so far
    else if(choice == 'terminal1'){
      this.ifTerm1 = true;
      this.ifTerm2 = false;
    } else if(choice == 'terminal2'){
      this.ifTerm1 = false;
      this.ifTerm2 = true;
    }
    else if(choice == 'next1' && this.current_slide == 0 && this.slide_remover_count == 1){
      if(this.ifTerm1 == true){
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(2);
        await this.slides.lockSwipeToNext(true);
      } else {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(1);
        await this.slides.lockSwipeToNext(true);
      }
    }
    else if(choice == 'next1' && this.slide_remover_count == 1 && (this.current_slide == 1 || this.current_slide == 2)){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(3);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next1' && this.slide_remover_count == 1 && this.current_slide == 3){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next1' && this.slide_remover_count == 1 && this.current_slide == 4){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(5);
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
        await this.slides.lockSwipeToNext(true);
      });
    }
    else if(choice == 'res1'){
      this.ifRes1 = true;
      this.ifRes2 = false;
      this.ifRes3 = false;
      this.ifRes4 = false;
    }
    else if(choice == 'res2'){
      this.ifRes1 = false;
      this.ifRes2 = true;
      this.ifRes3 = false;
      this.ifRes4 = false;
    }
    else if(choice == 'res3'){
      this.ifRes1 = false;
      this.ifRes2 = false;
      this.ifRes3 = true;
      this.ifRes4 = false;
    }
    else if(choice == 'res4'){
      this.ifRes1 = false;
      this.ifRes2 = false;
      this.ifRes3 = false;
      this.ifRes4 = true;
    }
    else if(choice == 'next2' && this.slide_remover_count == 2 && this.current_slide == 0){
      if(this.ifRes1 == true){
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(2);
        await this.slides.lockSwipeToNext(true);
      } else {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(1);
        await this.slides.lockSwipeToNext(true);
      }
    }
    else if(choice == 'next2' && this.slide_remover_count == 2 && (this.current_slide == 1 || this.current_slide == 2)){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(3);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'rec1'){
      this.ifRec1 = true;
      this.ifRec2 = false;
      this.ifRec3 = false;
      this.ifRec4 = false;
    }
    else if(choice == 'rec2'){
      this.ifRec1 = false;
      this.ifRec2 = true;
      this.ifRec3 = false;
      this.ifRec4 = false;
    }
    else if(choice == 'rec3'){
      this.ifRec1 = false;
      this.ifRec2 = false;
      this.ifRec3 = true;
      this.ifRec4 = false;
    }
    else if(choice == 'rec4'){
      this.ifRec1 = false;
      this.ifRec2 = false;
      this.ifRec3 = false;
      this.ifRec4 = true;
    }
    else if(choice == 'next2' && this.current_slide == 3 && this.slide_remover_count == 2){
      if(this.ifRec2 == true){
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(5);
        await this.slides.lockSwipeToNext(true);
      } else {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(4);
        await this.slides.lockSwipeToNext(true);
      }
    }
    else if(choice == 'next2' && this.slide_remover_count == 2 && (this.current_slide == 4 || this.current_slide == 5)){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(6);
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4, 5]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
        await this.slides.lockSwipeToNext(true);
      });
    }
    //final section, 3 removals so far, inverted section again
    else if(choice == 'invert1'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(1);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'invert2'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(2);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'invert3'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(3);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'invert4'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(4);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next3' && this.slide_remover_count == 3){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(5);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next3_1'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'done'){
      this.router.navigate(["/home"], {replaceUrl: true});
    }
  }

}
