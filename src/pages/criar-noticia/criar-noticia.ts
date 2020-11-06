import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { NoticiasProvider } from "../../providers/noticias/noticias";
import { Noticia } from "../../models/noticia/noticia.model";

enum RESULTADO_OPERACAO {
  ERRO,
  SUCESSO_CADASTRO,
  SUCESSO_EDICAO
}

@Component({
  selector: 'page-criar-noticia',
  templateUrl: 'criar-noticia.html'
})
export class CriarNoticiaPage {
  // TODO estilizar
  // TODO adiconar validações no HTML
  // TODO fazer box de "texto" da notícia expandir com o texto
  autor: string = "";
  titulo: string = "";
  texto: string = "";
  private editando: boolean;
  private noticia: Noticia;

  constructor(public navParams: NavParams,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private noticiasProvider: NoticiasProvider) {

  }

  async ionViewWillEnter() {
    this.editando = this.navParams.get('edit');
    if (this.editando) {
      this.noticia = this.navParams.get('noticia');
      let autorFromDb = await this.noticiasProvider.procurarAutorPorId(this.noticia.idAutor);
      if (autorFromDb && autorFromDb.nome) {
        this.autor = autorFromDb.nome;
        this.titulo = this.noticia.titulo;
        this.texto = this.noticia.texto;
      }
    }
  }

  /**
   * Ação realizada ao clicar no botão 'Publicar'.
   * @method aoClicarPublicar
   */
  async aoClicarPublicar() {
    if (this.editando) {
      this.noticia.texto = this.texto;
      this.noticia.titulo = this.titulo;
      await this.noticiasProvider.editarNoticia(this.noticia).then(_ => {
        this.apresentarMensagemResultado(RESULTADO_OPERACAO.SUCESSO_EDICAO);
        if (this.navCtrl.canGoBack()) this.navCtrl.pop();
      });
    } else {
      if (this.autor.length > 0 && this.titulo.length > 0 && this.texto.length > 0) {
        await this.noticiasProvider.cadastrarNoticiaNoDb(this.autor, this.titulo, this.texto).then(_ => {
          this.apresentarMensagemResultado(RESULTADO_OPERACAO.SUCESSO_CADASTRO);
          this.limparCampos();
        }).catch(reason => {
          console.log(`ERRO em aoClicarPublicar()`, reason)
        });
      } else {
        this.apresentarMensagemResultado(RESULTADO_OPERACAO.ERRO);
      }
    }
  }

  /**
   * Apresenta alerta com mensagem de acordo com o resultado da opreação de 'Publicar'.
   * @param {any} resultado da operação
   * @method apresentarMensagemResultado
   */
  private apresentarMensagemResultado(resultado: RESULTADO_OPERACAO) {
    let tituloAlerta = "";
    let mensagemAlerta = "";

    switch (resultado) {
      case RESULTADO_OPERACAO.ERRO:
        tituloAlerta = "Não foi possível concluir essa operação.";
        mensagemAlerta = "Verifique se há algum campo não preenchido.";
        break;
      case RESULTADO_OPERACAO.SUCESSO_EDICAO:
        tituloAlerta = "Item editado com sucesso.";
        break;
      default:
        tituloAlerta = "Item cadastrado com sucesso.";
        break;
    }
    var alerta = this.alertCtrl.create({
      title: tituloAlerta,
      subTitle: mensagemAlerta,
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
