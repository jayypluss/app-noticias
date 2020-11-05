import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { NoticiasProvider } from "../../providers/noticias/noticias";
import { Noticia } from "../../models/noticia/noticia.model";

@Component({
  selector: 'page-criar-noticia',
  templateUrl: 'criar-noticia.html'
})
export class CriarNoticiaPage {
  // TODO estilizar
  // TODO adiconar validações no HTML
  autor: string = "";
  titulo: string = "";
  texto: string = "";

  constructor(public navParams: NavParams,
                    private alertCtrl: AlertController,
                    private noticiasProvider: NoticiasProvider) {

  }

  async ionViewWillEnter() {
    let edit = this.navParams.get('edit');
    if (edit) {
      let noticia: Noticia = this.navParams.get('noticia');
      let autorFromDb = await this.noticiasProvider.procurarAutorPorId(noticia.id);
      if (autorFromDb && autorFromDb.nome) {
        this.autor = autorFromDb.nome;
        this.titulo = noticia.titulo;
        this.texto = noticia.texto;
      }
    }
  }

  /**
   * Ação realizada ao clicar no botão 'Publicar'.
   * @method aoClicarPublicar
   */
  async aoClicarPublicar() {
    let resultado;
    if (this.autor.length > 0 && this.titulo.length > 0 && this.texto.length > 0) {
      resultado = await this.noticiasProvider.cadastrarNoticiaNoDb(this.autor, this.titulo, this.texto).catch(reason => {
        console.log(`ERRO em aoClicarPublicar()`, reason)
      });
    }
    this.apresentarMensagemResultado(resultado);
    if (resultado) {
      this.limparCampos();
    }
  }

  /**
   * Apresenta alerta com mensagem de acordo com o resultado da opreação de 'Publicar'.
   * @param {any} resultado da operação
   * @method apresentarMensagemResultado
   */
  private apresentarMensagemResultado(resultado: any) {
    let titulo = "Não foi possível cadastrar item.";
    let mensagem = "Verifique se há algum campo não preenchido.";
    if (resultado) {
      titulo = "Item cadastrado com sucesso.";
      mensagem = null;
    }
    var alerta = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alerta.present();
  }

  /**
   * Limpa todos os campos.
   * @method limparCampos
   */
  private limparCampos() {
    this.autor = "";
    this.titulo = "";
    this.texto = "";
  }
}
