import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() info: string;
  src: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.info == 'camera'){
      this.src = '../../../assets/img/6_IoT_Design_2_Cam.gif';
    } else if (this.info == 'micro'){
      this.src = '../../../assets/img/6_IoT_Design_2_Micro.gif';
    } else if (this.info == 'estimote'){
      this.src = '../../../assets/img/14_IoT_Decision_Screen_Info1.gif'
    } else if (this.info == 'bluecharm'){
      this.src = '../../../assets/img/14_IoT_Decision_Screen_Info2.gif'
    } else if (this.info == 'mokosmart'){
      this.src = '../../../assets/img/14_IoT_Decision_Screen_Info3.gif'
    } else if (this.info == 'rpi3'){
      this.src = '../../../assets/img/14_IoT_Decision_Screen_Info4.gif'
    } else if (this.info == 'temphumid'){
      this.src = '../../../assets/img/14_IoT_Decision_Screen_Info5.gif'
    } else if (this.info == 'rpilcd'){
      this.src = '../../../assets/img/14_IoT_Decision_Screen_Info6.gif'
    } else if (this.info == 'rpicamera'){
      this.src = '../../../assets/img/14_IoT_Decision_Screen_Info7.gif'
    }
  }

  async onBack(){
    const top = await this.modalCtrl.getTop()
    top.dismiss();
  }

}
