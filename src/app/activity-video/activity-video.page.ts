import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-activity-video',
  templateUrl: './activity-video.page.html',
  styleUrls: ['./activity-video.page.scss'],
})
export class ActivityVideoPage implements OnInit {
  public activityVideoURL: string;

  constructor(
    private modalController: ModalController,
    public navParams: NavParams
  ) {
    // videoUrl is the const declared in openModal() in activity-detail.page.ts

    this.activityVideoURL = navParams.get('videoUrl');
   }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
