import { Component } from '@angular/core';
import { InfiniteScroll, NavController, Platform, Refresher } from 'ionic-angular';
import { Noticia } from "../../models/noticia/noticia.model";
import { NoticiasProvider } from "../../providers/noticias/noticias";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // TODO excluir e editar post
  // TODO estilizar
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

  /**
   * Carrega/Recarrega a listagem de dados, ou seja, a lista de notícias.
   * @param {Refresher} refresher componente de refresh
   * @method recarregarDados
   */
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

  /**
   * Ação realizada ao clicar em uma notícia.
   * @param {Noticia} noticia que foi clicada
   * @method aoClicarNoticia
   */
  aoClicarNoticia(noticia: Noticia) {
    console.log(`aoClicarNoticia, item: `, noticia);
  }

  /**
   * Carrega mais notícias.
   * @param {InfiniteScroll} infiniteScroll, o componente que foi acionado
   * @method carregarMaisNoticias
   */
  carregarMaisNoticias(scroll: InfiniteScroll) {
    // TODO utilizar infinite scroll
    console.log(`carregarMaisNoticias, $event: `, scroll);
  }

}
