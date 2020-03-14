## Prerequisite
* An IDE e.g Visual studio Code
* A browser e.g Chrome
* Node JS installed
*  Download Ionic DevApp from playstore onto your phone
* Create an Ionic Account:- it is free to create an account
* Create a firebase account: It helps for the connection of your application
  to firebase datastore which will allow you to persist data in the cloud

## Installing Ionic
* Open your IDE terminal and type
```
npm install -g @ionic/cli
```
You can confirm that it is well instored by checking out the installed version using

```
ionic -v
```
## Creating a project on the Desktop
* From your IDE terminal, type
```
$ cd Desktop/
$ ionic start
```
Add your project name and select the type of template you want to start with.
In my case, am going with tabs for the project am developing.

* After creating your project, you make sure you are in the created project directory, then type
```
$ ionic serve
```
You can type ionic lab also as this helps you view side by side your app in android and ios form.




## Managing a child route while maintaining the tabs at the foot of the page
> Steps to follow
* Create the page that would be routed to. in my case it is activity-detail
```
$ ionic generate page activity-detail
```
* In my tab1.page.html, i add the routerLink to the element that is to be clicked and i
add the page it will be routed to. In my case **activity-detail** page

```
<ion-content>
  <ion-card button routerLink="activity-detail" *ngFor="let activity of (activityList | async)">
    <ion-img [src]="activity.cropped"></ion-img>
    <ion-card-header>
      <ion-card-title>{{ activity.name}}</ion-card-title>
    </ion-card-header>
  </ion-card>
</ion-content>
```
**NOTE**: There is no / inside the routerLink quotes as it is a child route

* In app-routing-module.ts, copy the route link of the interested page e.g in my case activity-detail
```
 {
    path: 'activity-detail',
    loadChildren: () => import('./activity-detail/activity-detail.module').then( m => m.ActivityDetailPageModule)
  }
```
* In tabs-routing-module.ts, paste the copied path under the tab you want it to appear 
as child e.g
Since i want it to appear as a child of tab1, i will paste the copied link of activity-detail 
under the children path of tab1

```
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path: 'activity-detail',
            loadChildren: () => import('../activity-detail/activity-detail.module').then( m => m.ActivityDetailPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      }
    ]
  }
];
```
## Passing parameters using RouterLink

* Firstly, modify the link to be routed to so it can accept a parameter.
In my Case, this

```
{
    path: 'activity-detail',
    loadChildren: () => import('../activity-detail/activity-detail.module').then( m => m.ActivityDetailPageModule)
}
```
**Becomes**

```
{
    path: 'activity-detail/:activityID',
    loadChildren: () => import('../activity-detail/activity-detail.module').then( m => m.ActivityDetailPageModule)
}
```
Note that i added /:activityID to my path as a placeholder for the parameter that will be passed to it

* Then in my tab1.page.html, i will rewrite my routerLink as follows
```
 <ion-card 
    button 
    [routerLink]="['activity-detail', activity.id]" 
    *ngFor="let activity of (activityList | async">
</ion-card>
```
NOTE: From the above, i now wrap my routerLink in square brackets since dynamic values will be passed to it
so it becomes [routerLink].
Also i will rewrite my link so it accepts the parameter that will be passed. In this case __activity.id__.
So it becomes:

```
"['activity-detail', activity.id]" 
```
* Then in the page to be routed to, in my case activity-detail.page.ts, do the following

* Import ActivatedRoute and inject it into the constructor i.e

```
import { ActivatedRoute } from '@angular/router';

 constructor(
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute

  ) { 
    const activityID = activatedRoute.snapshot.params['activityID'];
  }
```
NOTE: inside the constructor, am saving a snapshot of activatedRoute parameters into a variable. Then i passed
a parameter into params but the parameter i passed is activityID which is the name i used in the path link of activity-detail routing.

## Understanding Ionic Modals
* Create a button that will be used to activate the modal. In my case i used the below
```
 <ion-fab vertical="top" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon name="play"></ion-icon>
    </ion-fab-button>
  </ion-fab>
```
* Then generate the modal page using the below command. In my case i called my modal page activity-video

```
ionic generate page your-modal-page-name
```
NOTE: Anytime you create a page using ionic cli, a routing path is automatically added to your
app-routing.module.ts. But in this case we don't need the routing. So open your app-routing.module.ts
and delete the route for the newly created modal page. In my case, i deleted the below path
```
  {
    path: 'activity-video',
    loadChildren: () => import('./activity-video/activity-video.module').then( m => m.ActivityVideoPageModule)
  }
  ```
* In app.module.ts, under @NgModule and under imports tab, add the module of your modal page.
Here the name of my modal module page is ActivityVideoPageModule. Make sure you import it at the
top of your app.module.ts page also. Also add the typescript page of the module that controls
the logic of the module inside the **entryComponents** array. Here my typescript page is **ActivityVideoPage**. So you will have something similar to this

```
import { ActivityVideoPageModule } from './activity-video/activity-video.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ActivityVideoPage],
  imports: [
    ActivityVideoPageModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
* Then in the typescript page that controls the opening and closing of your modal in my case it is
activity-detail.page.ts, inject the modal controller into its constructor. In my case, it is the activity-detail.module.ts page. Also ensure that the { ModalController } is imported at the top of the page

```
import { ModalController } from '@ionic/angular';

constructor(
    private modalController: ModalController, 
  ) {}
```
*  Then create your asyn function in that controls the modal e.g This a sample of my modal code

```
  async openModal() {
    const videoModal = await this.modalController.create({
      component: ActivityVideoPage
    });
    return videoModal.present();
  }
```
**NOTE**: You can pass more parameters into the create method. You can consult ionic documentation
to know more. The OpenModal() function is the function that is linked to the button on my html page which
activates the modal.

* You have to add a close button that closes your modal. But note that the close button should be on the 
modal page as you will be in the modal page once you have navigated into it. In my case, my modal page html
is activity-video.page.html. So i will add a close button as follows

```
<ion-content color="dark">

  <ion-fab vertical="bottom" horizontal="center" slot="fixed">
    <ion-fab-button color="danger" (click)="closeModal()">
      <ion-icon name="close-circle-outline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
  
</ion-content>
```
From the above, on clicking on the ion-fab-button, i called on the function closeModal(). The closeModal()
function is declared in my **activity-video.page.ts** as follows
In **activity-video.page.ts**

```
import { ModalController } from '@ionic/angular';

constructor(
    private modalController: ModalController
  ) { }

closeModal() {
    this.modalController.dismiss();
  }
```
I injected ModalController into the constructor and then imported it at the top of my page.
Then i defined the closeModal() function.

**IMPORTANT**
* In activity-detail.page.ts, when i opened the modal i passed in some parameters as follows

```
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
  ```
  I subscribed activityDetail and then i used **componentProps** to pass properties to the 
  instance of my model which is videoModal and finally i returned videoModal.present() inside the
  subscribe function

* Then in my modal page which is **acticity-video.page.ts** i injected NavParams which is used to capture passed in parameters into its constructor and i imported the NavParams from angular into the top of the page.
Then i defined a public attribute to hold the result as ** public activityVideoURL**.
Then inside the curly brackets of the constructor, i assigned the value i got from NavParams.
```
import { NavParams } from '@ionic/angular';

public activityVideoURL: string;

constructor(private navParams: NavParams){
  this.activityVideoURL = navParams.get('videoUrl');
}
```
* Then in the html page of my modal, i used the value passed in as follows
  **activity-video.page.html**

```
 <video autoplay class="activity-video">
    <source [src]="activityVideoURL">
  </video>
```

## Understanding and using Ionic Alert
In the typescript page that controls the alert, inject AlertController into the constructor as 
shown below: Also make sure the AlertController is imported at the top of the page.

```
import { AlertController } from '@ionic/angular';

constructor(private alertController: AlertController){}
```
* Then create an asyn function with the necesaary parameters you need passed into it.
  In my case, i will add a sample code of what i used. You can consult ionic document
  for more parameters

```
  async selectImageSource() {
    const alert = await this.alertController.create({
      header: 'Select source',
      message: 'Pick a source for your image',
      buttons: [
        {
          text: 'Camera',
          handler: () => {

          }
        },
        {
          text: 'Gallery',
          handler: () => {

          }
        }
      ]
    });
    await alert.present();
  }
```
**Explanation**: I created an async function called selectImageSource() and 
i defined a const called alert and passed to it an instance of AlertController. Then
i passed the parameters i needed like buttons, message and header. Finally i called the
alert with the method present();

## USING CAMERA IN YOUR PROJECT
> To use a camera in your project, after setting up the button that will invoke the camera, like
i did in the alert box above, then you need to install camera plugins. Follow the below steps

* Visit [Ionic Framework](https://ionicframework.com/docs/native/camera)
* enter the below codes in your terminal to install camera plugin

```
$ ionic cordova plugin add cordova-plugin-camera
$ npm install @ionic-native/camera
```
**NOTE**: If you receive the error message __The cordova  CLI was not found on your PATH__.
Then install it using the below command:

```
$ npm i -g cordova
```
Then after the installation, you should re-run your camera installation command i.e
```
$ ionic cordova plugin add cordova-plugin-camera
$ npm install @ionic-native/camera
```

* After the installation of the camera, you need to import it into app.module.ts as shown below

```
import { Camera } from '@ionic-native/camera/ngx';
```
Then add the **Camera** package you imported into the provider space in app.module.ts.
That is as shown below:

```
providers: [
Camera
]
```
* Then in the typescript page that controls the camera, in my case **tab3.page.ts**, import
Camera and CameraOptions and also inject Camera into the constructor. i.e

```
import { CameraOptions, Camera} from '@ionic-native/camera/ngx';

constructor(private camera: Camera) {}

```

* Then in the selectImageSource() function you should setup your galleryOptions and cameraOptions
similar to what i have done if using just the two options of gallery and camera.

```
public myProfileImage;


async selectImageSource() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    const galleryOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    const alert = await this.alertController.create({
      header: 'Select source',
      message: 'Pick a source for your image',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera.getPicture(cameraOptions)
            .then((ImageData) => {
              this.myProfileImage = 'data:image/jpeg;base64,' + ImageData;
            });
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.camera.getPicture(galleryOptions)
            .then((ImageData) => {
              this.myProfileImage = 'data:image/jpeg;base64,' + ImageData;
            });
          }
        }
      ]
    });
    await alert.present();
  }
```
**NOTE**:
* The encoding type is just the image format either jpeg or png
* quality is the quality of the image. it ranges from 0  to 100
* SourceType is the origin of the image. either from CAMERA or from album as SAVEDPHOTOALBUM
* correctOrientation is set to true so it gives you the same orientation as the picture you
 have saved in your phone.
* targetHeight: it's the height of the placeholder you have already defined to hold the image 
  in your html page. That is the image height you defined for the photo.
* mediaType is the type of file you intend using. either PICTURE, VIDEO or ALLMEDIA

* Then in my __tab3.page.html__ page, i have a default image which i have to change dynamically.

```
<ion-avatar (click)="selectImageSource()" class="profile-pix">
  <ion-img src="https://tse2.mm.bing.net/th?id=OIP.Lqo6-5-nWEcsQv-N06HPGAHaFk&pid=Api&P=0&w=227&h=172"></ion-img>
</ion-avatar>
```
The image above is by default, so i will change it dynamically and bind it to myProfileImage
as shown below:

```
<ion-avatar (click)="selectImageSource()" class="profile-pix">
  <ion-img [src]="myProfileImage"></ion-img>
</ion-avatar>
```

## Using firebase with Ionic

* Install firebase using the following command

```
npm install firebase @angular/fire --save
```
* Visit [Firebase google](https://firebase.google.com)
* Click on __signin__.
> You must have a google accout to use firebase e.g a Gmail account.
* Once you're logged in, click __Go to console__.
* Click __Add Project__ to add a project.
* Add your project name and check the conditions checkbox at the bottom of the page.
**NOTE**: You also have the options to change your location and project ID
* Click on __Create Project__.
> You also have the option here of using __Google Analytics__. Here i won't be using it.
* Click **Continue__ to complete project creation.
 You can refresh your browser if the screen doesn't give you a side menu. And then you can
 click on the project Name you created earlier.

* To connect your application to firebase, Click on __web__. It is represented by the 
symbol </> at the righthand side of the firebase window.
* Add a nickname to your project in the box provided for it.
* Click __Register App__.
* You will see a screen with some outputs similar to this.
You will need to copy the object.
```
{
    apiKey: "sdtyfguihjlk;kjhgfcxdfgchjhbkl",
    authDomain: "projectName.firebaseapp.com",
    databaseURL: "https://projectname.firebaseio.com",
    projectId: "projectName",
    storageBucket: "projectName.appspot.com",
    messagingSenderId: "345678909876",
    appId: "3: 23456789009876543"
  };
```
* Open your project, go to **environments** file. Open **environment.ts**
Then after the production property, paste your firebase object with the property
name as __firebase__. Below is a sample of it.

```
export const environment = {
  production: false,
  firebase: {
    apiKey: "sdtyfguihjlk;kjhgfcxdfgchjhbkl",
    authDomain: "projectName.firebaseapp.com",
    databaseURL: "https://projectname.firebaseio.com",
    projectId: "projectName",
    storageBucket: "projectName.appspot.com",
    messagingSenderId: "345678909876",
    appId: "3: 23456789009876543"
  } 
};
```
* Then open your app.module.ts and import __AngularFireModule__ as follows:
Also add it inside the imports options.
Also import the environments file that contains the firebase object.

```
import { AngularFireModule} from "@angular/fire";
import { environment } from "../environments/environment";

imports: [
  AngularFireModule.initializeApp(environment.firebase)
]
```
NOTE: I passed the object stored in __environment__ as a property to the __AngularFireModule__.


## Sharing Your app On social Media
> Note, am using the community edition and you can get it with this link below.
 The usage is similar to taht of a camera.

* Visit [Ionic Framework](https://ionicframework.com/docs/native/social-sharing)
* Copy this code and execute it on your project terminal

```
$ ionic cordova plugin add cordova-plugin-x-socialsharing
$ npm install @ionic-native/social-sharing
```
* Then go to app.module.ts and import **SocialSharing** as shown below.
Also add **SocialSharing** as a provider in app.module.ts.

```
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

providers: [
  SocialSharing
]
```
**NOTE**: For a complete documentation of socialsharing, you can visit the below
official github documentation
[GITHUB-SocialSharing]( https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)

* In the html page where the share button is located, in my case it's
__activity-detail.page.html__, add a click event to the button and give it a function e.g

```
<ion-fab-button (click)="share()">
  <ion-icon color="dark" name="share"></ion-icon>
</ion-fab-button>
```
* Then in the typescript page that controls the share button in my case __activity-detail.page.ts_, you can do the following:

```
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

constructor(private socialShare: SocialSharing) {}

share() {
  this.activityDetail.subscribe((activity) => {
    this.socialShare.share("Look what i found on kingsley's app", activity.name, "", activity.cropped )
  })
}
```

**EXPLANATION**: 
* The first parameter of the share() method is the message we want others to see.
* The second parameter is the __subject__ which we can leave as blank i.e "". from the above code,
  i passed in the name of our activity as the subject.
* The third parameter is for file, that is if we are willing to send a file during the share.
 We can also leave it as blank i.e "" in cases where we are not sending files.
* the fourth parameter is for url for specicific resources like image url e.t.c. Note, from
the above code, i passed in the url of my image since i wished for the image to be shared.



