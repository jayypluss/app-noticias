import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { NoticiasProvider } from "../../providers/noticias/noticias";

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

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private noticiasProvider: NoticiasProvider) {

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
