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
import { GestureController, ModalController } from "@ionic/angular";
import { Gesture } from "@ionic/core";

@Component({
  selector: "app-decision-screen",
  templateUrl: "./decision-screen.component.html",
  styleUrls: ["./decision-screen.component.scss"]
})
export class DecisionScreenComponent implements AfterViewInit {
  @ViewChild("swipecard", { static: false }) swipecard: ElementRef;
  @ViewChild("Windows", { static: false }) windows: ElementRef;
  @ViewChild("Kali", { static: false }) kali: ElementRef;
  @Input() title:string;
  @Input() subtitle:string;
  @Input() first_choice:string;
  @Input() second_choice:string;
  @Input() first_choice_img:string;
  @Input() second_choice_img:string;
  el: ElementRef;
  el2: ElementRef;
  constructor(
    private gestureCtrl: GestureController,
    private rederer: Renderer2,
    private modalCtrl: ModalController
  ) {
    // this.el = this.swipecard.nativeElement;
    // console.log(this.first_choice_img);
  }

  onMoveWindows(ev) {
    // const style = this.swipecard.nativeElement.style;
    if(ev.deltaX > 0){
      console.log(ev.deltaX + ' ' + ev.deltaY);
      this.rederer.setStyle(
        this.el,
        "transform",
        `translateX(-${ev.deltaX}px) translateY(${
          ev.deltaY
        }px) rotate(${ev.deltaY / 20}deg)`
      );
    } else {
      this.rederer.setStyle(
        this.el,
        "transform",
        `translateX(${ev.deltaX}px) translateY(${
          ev.deltaY
        }px) rotate(${ev.deltaY / 20}deg)`
      );
    }

    // style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX/20}deg)`;
  }

  onMoveKali(ev) {
    // const style = this.swipecard.nativeElement.style;
    if(ev.deltaX < 0){
      console.log(ev.deltaX + ' ' + ev.deltaY);
      this.rederer.setStyle(
        this.el2,
        "transform",
        `translateX(-${ev.deltaX}px) translateY(${
          ev.deltaY
        }px) rotate(${ev.deltaY / 20}deg)`
      );
    } else {
      this.rederer.setStyle(
        this.el2,
        "transform",
        `translateX(${ev.deltaX}px) translateY(${
          ev.deltaY
        }px) rotate(${ev.deltaY / 20}deg)`
      );
    }

    // style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX/20}deg)`;
  }

  async ngAfterViewInit() {
    const modal = await this.modalCtrl.getTop();
    // const style = this.swipecard.nativeElement.style;
    console.log(this.first_choice_img);
    this.el = this.windows.nativeElement;
    this.el2 = this.kali.nativeElement;
    console.log(this.el);
    const windowWidth = window.innerWidth;
    const gesture1: Gesture = await this.gestureCtrl.create({
      el: this.windows.nativeElement,
      gestureName: "swipe",
      onMove: ev => {
        this.onMoveWindows(ev);
      },
      onEnd: ev => {
        this.rederer.setStyle(this.el, "transition", "0.3s ease-out");
        if (ev.deltaX < -windowWidth / 3) {
          this.rederer.setStyle(
            this.el,
            "transform",
            `translateX(-${windowWidth * 1.5}px)`
          );
          modal.dismiss({
            'choice': this.first_choice
          });

        } else {
          this.rederer.setStyle(this.el, "transform", "");
        }
      }
    });
    const gesture2: Gesture = await this.gestureCtrl.create({
      el: this.kali.nativeElement,
      gestureName: "swipe",
      onMove: ev => {
        this.onMoveKali(ev);
      },
      onEnd: ev => {
        this.rederer.setStyle(this.el2, "transition", "0.3s ease-out");
        // renderer.transition = "0.3s ease-out";

        if (ev.deltaX > windowWidth / 3) {
          this.rederer.setStyle(
            this.el2,
            "transform",
            `translateX(${windowWidth * 1.5}px)`
          );
            modal.dismiss({
              'choice': this.second_choice
            });

        }  else {
          this.rederer.setStyle(this.el2, "transform", "");
        }
      }
    });
    gesture1.enable();
    gesture2.enable();
  }
}
