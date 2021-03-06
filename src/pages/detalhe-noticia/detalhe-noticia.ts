import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Noticia } from "../../models/noticia/noticia.model";
import { CriarNoticiaPage } from "../criar-noticia/criar-noticia";
import { NoticiasProvider } from "../../providers/noticias/noticias";
import { DomSanitizer } from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-detalhe-noticia',
  templateUrl: 'detalhe-noticia.html',
})
export class DetalheNoticiaPage {
  // TODO adicionar padding ao final da página
  noticia: Noticia;

  constructor(public navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private noticiasProvider: NoticiasProvider,
              private navCtrl: NavController,
              private sanitizer: DomSanitizer) {
    this.noticia = this.navParams.get('noticia');
    console.log(`Abrindo detalhe de notícia: `, this.noticia)
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

  obterUrlSanitizada(imagemBase64: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imagemBase64);
  }
}
