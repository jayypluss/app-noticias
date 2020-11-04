import {Component, forwardRef, Inject} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {DatabaseProvider} from "../providers/database/database";
import {NoticiasProvider} from "../providers/noticias/noticias";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              @Inject(forwardRef(() => DatabaseProvider)) private database: DatabaseProvider,
              @Inject(forwardRef(() => NoticiasProvider)) private noticiasProvider: NoticiasProvider) {

    platform.ready().then(() => {
      this.database.criarDatabase().subscribe(async () => {
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }
}
