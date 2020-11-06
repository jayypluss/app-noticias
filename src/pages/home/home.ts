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
              private navCtrl: NavController,
              private actionSheetController: ActionSheetController) {
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
  private async recarregarDados(refresher?: Refresher) {
    // this.noticias = this.noticiasProvider.criarMockDeNoticias();
    this.noticiasProvider.obterNoticias().subscribe(async (value) => {
      this.noticias = value;
      if (refresher) {
        await this.delay(2000);
        refresher.complete();
      }
    });

    if (refresher) {
      await this.delay(2000);
      refresher.complete();
    }
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  /**
   * Ação realizada ao clicar em uma notícia.
   * @param {Noticia} noticia que foi clicada
   * @method aoClicarNoticia
   */
  aoClicarNoticia(noticia: Noticia) {
    this.navCtrl.push(`DetalheNoticiaPage`, {noticia: noticia});
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
   * @method aoClicarEditar
   * @param {Noticia} noticia
   */
  async aoClicarEditar(noticia: Noticia) {
    await this.navCtrl.push(CriarNoticiaPage, {edit: true, noticia: noticia});
  }

  /**
   * Ação realizada ao clicar em excluir uma Notícia.
   * @method aoClicarExcluir
   * @param {Noticia} noticia
   */
  async aoClicarExcluir(noticia: Noticia) {
    await this.noticiasProvider.excluirNoticia(noticia.id);
    this.recarregarDados(null);
  }

  /**
   * Exibe lista de ações para a Notícia selecionada.
   * @method apresentarAcoes
   * @param {UIEvent} evento evento disparado
   * @param {Noticia} noticia selecionada
   */
  async apresentarAcoes(evento: UIEvent, noticia: Noticia) {
    evento.stopPropagation();
    const actionSheet = await this.actionSheetController.create({
      title: 'Ações',
      cssClass: 'action-sheet',
      buttons: [{
        text: 'Excluir',
        icon: 'trash',
        role: 'destructive',
        handler: async () => {
          this.aoClicarExcluir(noticia);
        }
      }, {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.aoClicarEditar(noticia);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    await actionSheet.present();
  }


}
