import { Component } from '@angular/core';
import { ActionSheetController, AlertController, NavController, NavParams } from 'ionic-angular';
import { NoticiasProvider } from "../../providers/noticias/noticias";
import { Noticia } from "../../models/noticia/noticia.model";
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';
import { DomSanitizer } from "@angular/platform-browser";


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
  // TODO adiconar validações no HTML
  // TODO fazer box de "texto" da notícia expandir com o texto
  // TODO melhorar estilização
  autor: string = "";
  titulo: string = "";
  texto: string = "";
  editando: boolean;
  private noticia: Noticia;
  selecionouImagem: boolean = false;
  imagemBase64: any;

  constructor(public navParams: NavParams,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private noticiasProvider: NoticiasProvider,
              private camera: Camera,
              private sanitizer: DomSanitizer,
              private actionSheetController: ActionSheetController) {

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
        if (this.noticia.imagemBase64) {
          this.imagemBase64 = this.noticia.imagemBase64;
          this.selecionouImagem = true;
        }
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
      this.noticia.imagemBase64 = this.imagemBase64;
      let resultado;
      await this.noticiasProvider.editarNoticia(this.noticia).then(_ => {
        resultado = RESULTADO_OPERACAO.SUCESSO_EDICAO;
        this.apresentarMensagemResultado(RESULTADO_OPERACAO.SUCESSO_EDICAO);
      });
      if (resultado && this.navCtrl.canGoBack()) await this.navCtrl.pop();
    } else {
      if (this.autor.length > 0 && this.titulo.length > 0 && this.texto.length > 0) {
        await this.noticiasProvider.cadastrarNoticiaNoDb(this.autor, this.titulo, this.texto, this.imagemBase64).then(_ => {
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
    if (!this.editando) this.autor = "";
    this.titulo = "";
    this.selecionouImagem = false;
    this.imagemBase64 = null;
    this.texto = "";
  }

  /**
   * Obtem foto utilizando o plugin Camera.
   * @param {PictureSourceType} fonteDaImagem
   * @method obterFoto
   */
  obterFoto(fonteDaImagem: PictureSourceType) {
    const opcoes: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: fonteDaImagem,
    }

    this.camera.getPicture(opcoes).then((imagemBase64) => {
      this.imagemBase64 = 'data:image/jpeg;base64,' + imagemBase64;

      let elementoHtml = document.getElementById('imagemSelecionada');
      let imagemHtml = elementoHtml as HTMLImageElement;
      if (imagemHtml && imagemHtml.src) {
        imagemHtml.src = this.imagemBase64;
      } else if (elementoHtml) {
        elementoHtml.setAttribute("src", this.imagemBase64);
      }
      this.selecionouImagem = true;
    }, (erro) => {
      console.log(`ERRO em obterFoto(${fonteDaImagem}): `, erro);
    });
  }

  /**
   * Ação realizada ao clicar no botão da galeria.
   * @method aoClicarCamera
   */
  aoClicarSelecionarFoto() {
    this.obterFoto(PictureSourceType.PHOTOLIBRARY);
  }

  /**
   * Ação realizada ao digitar no input.
   * @param {any} evento disparado
   * @method aoDigitar
   */
  aoDigitar(evento: any) {
    evento.currentTarget.style.height = "";
    evento.currentTarget.style.height = Math.min(evento.currentTarget.scrollHeight, 20) + "rem";
  }

  /**
   * Ação realizada ao clicar para limpar os campos.
   * @method aoClicarLimpar
   */
  aoClicarLimpar() {
    this.limparCampos();
  }

  /**
   * Retorna url sanitizada.
   * @param {string} url a ser sanitizada
   * @method obterUrlSanitizada
   */
  obterUrlSanitizada(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  aoClicarNaImagem() {
    this.apresentarAcoesImagem();
  }

  /**
   * Exibe lista de ações para a imagem clicada.
   * @method apresentarAcoesImagem
   */
  async apresentarAcoesImagem() {
    const actionSheet = await this.actionSheetController.create({
      title: 'Ações',
      cssClass: 'action-sheet',
      buttons: [{
        text: 'Excluir',
        icon: 'trash',
        role: 'destructive',
        handler: async () => {
          this.aoClicarExcluirImagem();
        }
      }, {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.aoClicarEditarImagem();
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
   * Ação realizada ao clicar para excluir a imagem.
   * @method aoClicarExcluirImagem
   */
  aoClicarExcluirImagem() {
    this.imagemBase64 = "";
    this.selecionouImagem = false;
  }


  /**
   * Ação realizada ao clicar para editar a imagem.
   * @method aoClicarEditarImagem
   */
  aoClicarEditarImagem() {
    this.obterFoto(PictureSourceType.PHOTOLIBRARY);
  }
}
