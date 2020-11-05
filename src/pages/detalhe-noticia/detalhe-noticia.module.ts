import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheNoticiaPage } from './detalhe-noticia';

@NgModule({
  declarations: [
    DetalheNoticiaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheNoticiaPage),
  ],
})
export class DetalheNoticiaPageModule {}
