import { Component } from '@angular/core';
import { InfiniteScroll, NavController, Platform, Refresher } from 'ionic-angular';
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
              private platform: Platform,
              private noticiasProvider: NoticiasProvider) {
  }

  ionViewWillEnter() {
    this.platform.ready().then(async () => {
      this.recarregarDados(null);
    });
  }

  private recarregarDados(refresher?: Refresher) {
    console.log(`recarregarDados, $evento: `, refresher);
    // this.noticias = this.noticiasProvider.criarMockDeNoticias();
    this.noticiasProvider.obterNoticias().subscribe(value => {
      this.noticias = value;
      if (refresher) {
        refresher.complete();
      }
    });

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
