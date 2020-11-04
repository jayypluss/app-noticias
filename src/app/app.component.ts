import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { DatabaseProvider } from "../providers/database/database";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private database: DatabaseProvider) {

    platform.ready().then(() => {
      this.database.criarDatabase().subscribe(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }
}
