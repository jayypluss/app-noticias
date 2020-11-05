import { Component } from '@angular/core';
import { ActionSheetController, InfiniteScroll, NavController, Platform, Refresher } from 'ionic-angular';
import { Noticia } from "../../models/noticia/noticia.model";
import { NoticiasProvider } from "../../providers/noticias/noticias";
import { CriarNoticiaPage } from "../criar-noticia/criar-noticia";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // TODO excluir e editar post
  // TODO criar página de detalhamento da notícia
  // TODO componentizar item de Notícia
  // TODO estilizar
  // TODO estilizar mensagem de nenhuma notícia a ser exibida
  // TODO estilizar mensagem de nenhuma notícia a ser exibida
  noticias: Noticia[] = [];
  urlBaseImagem: string = `assets/imgs/`;

  constructor(private platform: Platform,
              private noticiasProvider: NoticiasProvider,
              private actionSheetController: ActionSheetController,
              private navCtrl: NavController) {
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
  async aoClicarEditar(noticia: any) {
    console.log(`aoClicarEditar, evento: `, noticia);
    await this.navCtrl.push(CriarNoticiaPage, {edit: true, noticia: noticia});
  }

  /**
   * Ação realizada ao clicar em excluir uma Notícia.
   * @method aoClicarExcluir
   * @param {any} evento
   */
  async aoClicarExcluir(noticia: Noticia) {
    console.log(`aoClicarExcluir, evento: `, noticia);
    await this.noticiasProvider.excluirNoticia(noticia.id);
    this.recarregarDados(null);
  }

  /**
   * Exibe lista de ações para a Notícia selecionada.
   * @method presentActionSheet
   * @param {Noticia} noticia selecionada
   */
  async presentActionSheet(noticia: Noticia) {
    const actionSheet = await this.actionSheetController.create({
      title: 'Ações',
      cssClass: 'action-sheet',
      buttons: [{
        text: 'Excluir',
        icon: 'trash',
        role: 'destructive',
        handler: async () => {
          console.log('Delete clicked');
          this.aoClicarExcluir(noticia);
        }
      }, {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          console.log('Editar clicked');
          this.aoClicarEditar(noticia);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
