import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Noticia } from "../../models/noticia/noticia.model";
import { CriarNoticiaPage } from "../criar-noticia/criar-noticia";
import { NoticiasProvider } from "../../providers/noticias/noticias";

@IonicPage()
@Component({
  selector: 'page-detalhe-noticia',
  templateUrl: 'detalhe-noticia.html',
})
export class DetalheNoticiaPage {
  noticia: Noticia;
  urlBaseImagem: string = `assets/imgs/`;

  constructor(public navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private noticiasProvider: NoticiasProvider,
              private navCtrl: NavController) {
    this.noticia = this.navParams.get('noticia');
  }

  /**
   * Exibe lista de ações para a Notícia selecionada.
   * @method apresentarAcoes
   * @param {Noticia} noticia selecionada
   */
  async apresentarAcoes(noticia: Noticia) {
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

  /**
   * Ação realizada ao clicar em excluir uma Notícia.
   * @method aoClicarExcluir
   * @param {Noticia} noticia
   */
  private async aoClicarExcluir(noticia: Noticia) {
    await this.noticiasProvider.excluirNoticia(noticia.id);
    await this.navCtrl.pop();
  }

  /**
   * Ação realizada ao clicar em editar uma Notícia.
   * @method aoClicarEditar
   * @param {Noticia} noticia
   */
  private async aoClicarEditar(noticia: Noticia) {
    await this.navCtrl.push(CriarNoticiaPage, {edit: true, noticia: noticia});
  }
}
