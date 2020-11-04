import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PesquisaPage } from "../pages/pesquisa/pesquisa";
import { NovaNoticiaPage } from "../pages/nova-noticia/nova-noticia";
import { NoticiasProvider } from '../providers/noticias/noticias';
import { DatabaseProvider } from '../providers/database/database';
import {SQLite} from "@ionic-native/sqlite";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PesquisaPage,
    NovaNoticiaPage,
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
    NovaNoticiaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoticiasProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
