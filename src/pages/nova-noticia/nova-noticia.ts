import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {NoticiasProvider} from "../../providers/noticias/noticias";

@Component({
  selector: 'page-nova-noticia',
  templateUrl: 'nova-noticia.html'
})
export class NovaNoticiaPage {
  autor: string = "";
  titulo: string = "";
  texto: string = "";

  constructor(public navCtrl: NavController,
              private noticiasProvider: NoticiasProvider,
              private alertCtrl: AlertController) {

  }

  async aoClicarPublicar() {
    let resultado;
    if (this.autor.length > 0 && this.titulo.length > 0 && this.texto.length > 0) {
      resultado = await this.noticiasProvider.cadastrarNoticiaNoDb(this.autor, this.titulo, this.texto);
    }
    this.apresentarMensagemResultado(resultado);
  }

  private apresentarMensagemResultado(resultado: any) {
    let titulo = "Não foi possível cadastrar item.";
    let mensagem = "Verifique se há algum campo não preenchido.";
    if (resultado) {
      titulo = "Item cadastrado com sucesso.";
      mensagem = null;
    }
    var alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }
}
