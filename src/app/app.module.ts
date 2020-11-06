import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PesquisaPage } from "../pages/pesquisa/pesquisa";
import { CriarNoticiaPage } from "../pages/criar-noticia/criar-noticia";
import { NoticiasProvider } from '../providers/noticias/noticias';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from "@ionic-native/sqlite";
import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PesquisaPage,
    CriarNoticiaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PesquisaPage,
    CriarNoticiaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoticiasProvider,
    DatabaseProvider,
    Camera
  ]
})
export class AppModule {}
