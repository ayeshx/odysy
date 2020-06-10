import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent implements OnInit, AfterViewInit {
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
  ifNonInv1: boolean = false;
  ifNonInv2: boolean = false;

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
    if(choice == 'next' && (this.current_slide == 0 || this.current_slide == 1 || this.current_slide == 2 || this.current_slide == 3 || this.current_slide == 4 ) && this.slide_remover_count == 0){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    } 
    //second set tap three times section first removal
    else if(choice == 'strong' || choice == 'weak' || choice == 'source'){
      this.tap_choices.push(choice);
      if(this.tap_choices.length >= 3){
        await this.slides.lockSwipeToNext(false);
        if(this.tap_choices[0] == 'weak' && this.tap_choices[1] == 'strong'){
          await this.slides.slideTo(6);
          console.log("Reached Slide 5");
          this.slides.getSwiper().then(async (swiper) => {
            swiper.removeSlide([0, 1, 2, 3, 4, 5]);
            swiper.slideTo(0);
            this.slide_remover_count ++;
            await this.slides.lockSwipeToNext(true);
          });
        } else {
          await this.slides.slideTo(7);
          console.log("Reached Slide 5");
          this.slides.getSwiper().then(async (swiper) => {
            swiper.removeSlide([0, 1, 2, 3, 4, 5]);
            swiper.slideTo(1);
            this.slide_remover_count ++;
            await this.slides.lockSwipeToNext(true);
          });
        }

      }

    }
    //in between till amplifier gain question only one removal till now
    else if(choice == 'next1' && this.slide_remover_count == 1 && (this.current_slide == 0 || this.current_slide == 1)){
      await this.slides.lockSwipeToNext(false);
      if(this.current_slide == 0){
        await this.slides.slideTo(2);
        await this.slides.lockSwipeToNext(true);
      } else {
        await this.slides.slideNext();
        await this.slides.lockSwipeToNext(true);
      }
    }
    //amplifier gain question
    else if(choice == 'gain1'){
      this.ifGain1 = true;
      this.ifGain2 = false;
      this.ifGain3 = false;
      this.ifGain4 = false;
    } else if(choice == 'gain2'){
      this.ifGain1 = false;
      this.ifGain2 = true;
      this.ifGain3 = false;
      this.ifGain4 = false;
    } else if (choice == 'gain3'){
      this.ifGain1 = false;
      this.ifGain2 = false;
      this.ifGain3 = true;
      this.ifGain4 = false;
    } else if (choice == 'gain4'){
      this.ifGain1 = false;
      this.ifGain2 = false;
      this.ifGain3 = false;
      this.ifGain4 = true;
    }
    else if (choice == 'next1' && this.current_slide == 2 && this.slide_remover_count == 1){
      if(this.ifGain2 == true){
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(4);
        await this.slides.lockSwipeToNext(true);
      } else {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(3);
        await this.slides.lockSwipeToNext(true);
      }
    }
    else if(choice == 'next1' && (this.current_slide == 3 || this.current_slide == 4) && this.slide_remover_count == 1){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(5);
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
        await this.slides.lockSwipeToNext(true);
      });
    }
    //inverting gain section, 2 removals at this point, new start
    else if(choice == 'next2' && this.current_slide == 0 && this.slide_remover_count == 2){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'invert1') {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(2);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'invert2') {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(3);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'invert3') {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(4);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'invert4') {
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(5);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next2' && this.slide_remover_count == 2){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(6);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next2_1'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(7);
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4, 5, 6]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
        await this.slides.lockSwipeToNext(true);
      });
    }
    //new section non inverting amplifers part, 3 removals so far
    else if(choice == 'noninv1'){
      this.ifNonInv1 = true;
      this.ifNonInv2 = false;
    } else if(choice == 'noninv2'){
      this.ifNonInv2 = true;
      this.ifNonInv1 = false;
    }
    else if(choice == 'next3' && this.current_slide == 0 && this.slide_remover_count == 3){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(1);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next3' && this.slide_remover_count == 3 && this.current_slide ==1) {
      if(this.ifNonInv1 == true){
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(2);
        await this.slides.lockSwipeToNext(true);
      } else {
        await this.slides.lockSwipeToNext(false);
        await this.slides.slideTo(3);
        await this.slides.lockSwipeToNext(true);
      }
    }
    else if(choice == 'next3' && (this.current_slide == 2 || this.current_slide == 3) && this.slide_remover_count == 3){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(4);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next3' && this.current_slide == 4){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(5);
      this.slides.getSwiper().then(async (swiper) => {
        swiper.removeSlide([0, 1, 2, 3, 4]);
        swiper.slideTo(0);
        this.slide_remover_count ++;
        await this.slides.lockSwipeToNext(true);
      });
    }
    //resistors giving gain of 10, 4 removals so far
    else if(choice == 'res1'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(1);
      await this.slides.lockSwipeToNext(true);
    } else if(choice == 'res2'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(2);
      await this.slides.lockSwipeToNext(true);
    } else if(choice == 'res3'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(3);
      await this.slides.lockSwipeToNext(true);
    } else if(choice == 'res4'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(4);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next4' && this.slide_remover_count == 4){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideTo(5);
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'next4_1'){
      await this.slides.lockSwipeToNext(false);
      await this.slides.slideNext();
      await this.slides.lockSwipeToNext(true);
    }
    else if(choice == 'continue'){
      this.router.navigate(["/lab2"], {replaceUrl: true});
    }
    else if(choice == 'done'){
      this.router.navigate(["/home"], {replaceUrl:true});
    }
  }

}
