import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-popover',
  templateUrl: './map-popover.component.html',
  styleUrls: ['./map-popover.component.scss'],
})
export class MapPopoverComponent implements OnInit {
  @Input() title: string;
  @Input() button: string;
  @Input() link: string;

  async onClick(){
    console.log('Clicked');
    const pop = await this.popCtrl.getTop();
    pop.dismiss();
    this.router.navigate([this.link]);
  }

  constructor(private popCtrl: PopoverController, private router:Router) { }

  ngOnInit() {}

}
