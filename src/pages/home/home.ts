import { Component } from '@angular/core';
import { InfiniteScroll, Platform, Refresher } from 'ionic-angular';
import { Noticia } from "../../models/noticia/noticia.model";
import { NoticiasProvider } from "../../providers/noticias/noticias";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // TODO excluir e editar post
  // TODO componentizar item de Notícia
  // TODO estilizar
  noticias: Noticia[] = [];
  urlBaseImagem: string = `assets/imgs/`;

  constructor(private platform: Platform,
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

  /**
   * Ação realizada ao clicar em editar uma Notícia.
   * @method carregarMaisNoticias
   * @param {any} evento
   */
  aoClicarEditar(evento: any) {
    console.log(`aoClicarEditar, evento: `, evento);
  }

  /**
   * Ação realizada ao clicar em excluir uma Notícia.
   * @method aoClicarExcluir
   * @param {any} evento
   */
  aoClicarExcluir(evento: any) {
    console.log(`aoClicarExcluir, evento: `, evento);
  }

}
