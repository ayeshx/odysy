import {
  Component,
  OnInit,
  Renderer2,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  Input
} from "@angular/core";
import {
  GestureController,
  ModalController,
  IonSlides,
  ToastController,
  AnimationController,
  DomController
} from "@ionic/angular";
import { Gesture } from "@ionic/core";


@Component({
  selector: "app-quizscreen",
  templateUrl: "./quizscreen.component.html",
  styleUrls: ["./quizscreen.component.scss"]
})
export class QuizscreenComponent implements AfterViewInit, OnInit {
  @ViewChild("quizslides", { static: true }) slides: IonSlides;
  @ViewChild("quizslides2", { static: true }) slides2: IonSlides;
  @Input() title: string;
  @Input() subtitle: string;
  answer1: string = "";
  username: any = "false";
  hashing: any = "false";
  port_scan:any = "false";
  ip:any = "true";
  dos:any = "false";
  next: boolean = true;
  next2: boolean = true;
  quiz_win = true;
  quiz_kali = false;
  public displayAchievement: boolean = true;
  @ViewChild('container', {static: false}) container: ElementRef;
  @ViewChild('badge', {static: false}) badge: ElementRef;
  @ViewChild('message', {static: false}) message: ElementRef;
  items = ['Trojan', 'Worm', 'Virus'];
  button_status: boolean = true;
  button_status2: boolean = true;
  async letsGo() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

  ngOnInit(){

    if(this.title == 'Is Windows your weapon?'){
      this.quiz_win = false;
      this.quiz_kali = true;
    } else if (this.title == 'Is Kali your weapon?'){
      this.quiz_kali = false;
      this.quiz_win = true;
    }
  }

  opts = {
    initialSlide: 0,
    speed: 400
  }

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    // console.log(ev.detail.complete());
    this.items = ev.detail.complete(this.items);
    ev.detail.complete();

    console.log(this.items);
  }

  async slideChange2() {
    const slideno = await this.slides2.getActiveIndex();
    console.log("Slide changed to Slide: " + slideno);
    if (slideno == 2) {
      this.button_status = true;
      this.next2 = false;
    } else if (slideno == 1){
      this.button_status2 = false;
    }
  }

  async slideChange() {
    const slideno = await this.slides.getActiveIndex();
    console.log("Slide changed to Slide: " + slideno);
    if (slideno == 2) {
      this.button_status = true;
      this.next = false;
    } else if (slideno == 1){
      this.button_status = false;
    }
  }

  async onAnswer2() {
    console.log("Yes it is the end");
    if (
      this.items[0].toLowerCase() == "virus" &&
      this.username == "false" &&
      this.hashing == "false"
    ) {
      this.toastCtrl
        .create({
          message: "Achievement unlocked!",
          duration: 2000
        })
        .then(toast => {
          toast.present();
        });

      this.displayAchievement = false;
      // @ViewChild('badge', {static: false}) badge: ElementRef;
      const animation = this.animateCtrl.create()
    .addElement(this.badge.nativeElement)
    .duration(2200).easing('ease-out')
    .fromTo('transform', 'translateY(400%)', 'translateY(0)');
    // transition(":enter", [
    //   style({ transform: "translateY(400%)" }),
    //   animate("500ms ease-out", style({ transform: "translateY(0)" }))
    // ]),
    const animation2 = this.animateCtrl.create()
    .addElement(this.badge.nativeElement)
    .duration(1500)
    .fromTo('transform', 'translateY(0)', 'translateY(400%)');
    // transition(":leave", [
    //   animate("500ms ease-in", style({ transform: "translateY(400%)" }))
    // ])
    const animation3 = this.animateCtrl.create()
    .addElement(this.message.nativeElement)
    .duration(2500).keyframes([
      {offset:0, opacity: '0'},
      {offset:0.5, opacity: '0.5'},
      {offset: 1, opacity: '1'}
    ])
    // .duration(1000).easing('ease-out')
    // .fromTo('opacity', '0','1');

    const animation4 = this.animateCtrl.create()
    .addElement(this.message.nativeElement)
    .duration(1500)
    .fromTo('opacity', '1', '0');

    animation.play().then(()=>{
      console.log('In here1');
      setTimeout(()=>{
        animation2.play();
      },2500)
      
    })
    animation3.play().then(()=>{
      console.log('Here 2');
      setTimeout(()=>{
        animation4.play();
      },2500)
    })



    // transition(":enter", [
    //   style({ opacity: "0" }),
    //   animate("500ms 1000ms ease-out", style({ opacity: "1" }))
    // ]),
    // transition(":leave", [animate("500ms ease-in", style({ opacity: "0" }))])

      setTimeout(() => {
        this.displayAchievement = false;
        setTimeout(()=>{
          this.letsGo();
        },1000);
      }, 8000);
    } else {
      this.letsGo();
    }
  }

  async onAnswerKali2() {
    console.log("Yes it is the end twoooooo");

    if (
      this.port_scan == "false" &&
      this.ip == "true" &&
      this.dos == "false"
    ) {
      console.log('Inh ere');
      this.toastCtrl
        .create({
          message: "Achievement unlocked!",
          duration: 2000
        })
        .then(toast => {
          toast.present();
        });

      this.displayAchievement = false;
      // @ViewChild('badge', {static: false}) badge: ElementRef;
      const animation = this.animateCtrl.create()
    .addElement(this.badge.nativeElement)
    .duration(2200).easing('ease-out')
    .fromTo('transform', 'translateY(400%)', 'translateY(0)');
    // transition(":enter", [
    //   style({ transform: "translateY(400%)" }),
    //   animate("500ms ease-out", style({ transform: "translateY(0)" }))
    // ]),
    const animation2 = this.animateCtrl.create()
    .addElement(this.badge.nativeElement)
    .duration(1500)
    .fromTo('transform', 'translateY(0)', 'translateY(400%)');
    // transition(":leave", [
    //   animate("500ms ease-in", style({ transform: "translateY(400%)" }))
    // ])
    const animation3 = this.animateCtrl.create()
    .addElement(this.message.nativeElement)
    .duration(2500).keyframes([
      {offset:0, opacity: '0'},
      {offset:0.5, opacity: '0.5'},
      {offset: 1, opacity: '1'}
    ])
    // .duration(1000).easing('ease-out')
    // .fromTo('opacity', '0','1');

    const animation4 = this.animateCtrl.create()
    .addElement(this.message.nativeElement)
    .duration(1500)
    .fromTo('opacity', '1', '0');

    animation.play().then(()=>{
      console.log('In here1');
      setTimeout(()=>{
        animation2.play();
      },2500)
      
    })
    animation3.play().then(()=>{
      console.log('Here 2');
      setTimeout(()=>{
        animation4.play();
      },2500)
    })



    // transition(":enter", [
    //   style({ opacity: "0" }),
    //   animate("500ms 1000ms ease-out", style({ opacity: "1" }))
    // ]),
    // transition(":leave", [animate("500ms ease-in", style({ opacity: "0" }))])

      setTimeout(() => {
        this.displayAchievement = false;
        setTimeout(()=>{
          this.letsGo();
        },1000);
      }, 8000);
    } else {
      this.letsGo();
    }
  }

  async onAnswer() {
   await this.slides.lockSwipeToNext(false);
   
    await this.slides.lockSwipeToPrev(true);
   
    await this.slides.slideTo(1);
    console.log(this.answer1 + " " + this.username + " " + this.hashing);
    await this.slides.lockSwipeToNext(true);
  }

  async onAnswerKali() {
    // await this.slides2.lockSwipeToNext(false);
    
    //  await this.slides2.lockSwipeToPrev(true);
    
    //  await this.slides2.slideTo(1);
     console.log(this.port_scan + " " + this.ip + " " + this.dos);
    //  await this.slides2.lockSwipeToNext(true);
   }

  constructor(
    private gestureCtrl: GestureController,
    private rederer: Renderer2,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private animateCtrl: AnimationController,
    private domCtrl: DomController
  ) {
    // this.el = this.swipecard.nativeElement;
    // console.log(this.first_choice_img);
  }

  ngAfterViewInit(){}

  async ionViewWillEnter() {
    // await this.slides.lockSwipeToNext(true);
    console.log(this.slides);
    const content = document.querySelector('#mycontent');
    const innerScroll = content.shadowRoot.querySelector('.inner-scroll');
    console.log(content);
    console.log(innerScroll);
    this.domCtrl.write(() => {
      console.log('Done style');
      (innerScroll as any).style.backgroundImage = "url('../../../assets/img/testbackground.gif')";
      // (innerScroll as any).style.backgroundColor = "black";
      (innerScroll as any).style.backgroundRepeat = "no-repeat";
      (innerScroll as any).style.backgroundPosition = "center";
      (innerScroll as any).style.backgroundSize = "cover";
    });
  }
}
