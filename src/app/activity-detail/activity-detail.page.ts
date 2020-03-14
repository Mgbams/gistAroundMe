import { ActivityVideoPage } from './../activity-video/activity-video.page';
import { ActivityService } from './../activity.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../types';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  public activityDetail: Observable<Activity>;

  constructor(
    private modalController: ModalController, 
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute

  ) {
    const activityID = this.activatedRoute.snapshot.params['activityID'];
    this.activityDetail = this.activityService.getActivity(activityID);
    console.log(this.activityDetail);
   }

  ngOnInit() {
  }

  async openModal() {
    const videoModal = await this.modalController.create({
      component: ActivityVideoPage
    });

    return await this.activityDetail.subscribe((activity) => {
      videoModal.componentProps = {
        videoUrl: activity.video_url
      };
      return videoModal.present();
    });
  }

}
