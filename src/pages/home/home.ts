import { Component } from '@angular/core';
import {InfiniteScroll, NavController, Platform, Refresher} from 'ionic-angular';
import { Noticia } from "../../models/noticia/noticia.model";
import { NoticiasProvider } from "../../providers/noticias/noticias";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  noticias: Noticia[] = [];
  urlBaseImagem: string = `assets/imgs/`;

  constructor(public navCtrl: NavController,
              private noticiasProvider: NoticiasProvider,
              private platform: Platform) {
  }

  ionViewDidEnter() {
    this.recarregarDados(null);
  }

  async recarregarDados(refresher?: Refresher) {
    console.log(`recarregarDados, $evento: `, refresher);
    // this.noticias = this.noticiasProvider.criarMockDeNoticias();
    this.noticias = await this.noticiasProvider.obterNoticias();
    if (refresher) {
      refresher.complete();
    }
  }

  aoClicarNoticia(item: Noticia) {
    console.log(`aoClicarNoticia, item: `, item);
  }

  carregarMaisNoticias($evento: InfiniteScroll) {
    console.log(`carregarMaisNoticias, $event: `, $evento);
  }

}
