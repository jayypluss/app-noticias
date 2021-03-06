import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';
import { NoticiasProvider } from "../../providers/noticias/noticias";
import { Noticia } from "../../models/noticia/noticia.model";

@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html'
})
export class PesquisaPage {
  @ViewChild('barraDePesquisa') barraDePesquisa : Searchbar;
  termoPesquisa: string = "";
  iniciouPesquisa: boolean = false;
  todasNoticias: Noticia[];
  resultadoPesquisa: Noticia[];

  constructor(private noticiasProvider: NoticiasProvider,
              private navCtrl: NavController) {

  }

  ionViewDidEnter() {
    this.iniciouPesquisa = false;
    this.noticiasProvider.obterNoticias().subscribe(noticias => {
      this.todasNoticias = noticias;
      if (this.barraDePesquisa.value && this.barraDePesquisa.value != "") {
        this.termoPesquisa = this.barraDePesquisa.value;
        this.iniciouPesquisa = true;
        this.resultadoPesquisa = this.filtrarNoticias(this.termoPesquisa);
      }
    });
    this.focarNaBarraDePesquisa();
  }

  /**
   * Ativa o foco na 'Barra de Pesquisa'.
   * @method focarNaBarraDePesquisa
   */
  focarNaBarraDePesquisa(): void {
    setTimeout(() => {
      this.barraDePesquisa.setFocus();
    }, 500);
  }

  /**
   * Ação realizada ao pressionar alguma tecla do input (como o teclado).
   * @param {UIEvent} evento da UI disparado
   * @method aoPressionarTecla
   */
  aoPressionarTecla(evento: UIEvent) {
    this.iniciouPesquisa = true;
    this.resultadoPesquisa = this.filtrarNoticias(this.termoPesquisa);
  }

  /**
   * Realiza filtro de todas as notícias baseado no termo.
   * @param {string} termoPesquisa termo a ser pesquisado
   * @method filtrarNoticias
   */
  private filtrarNoticias(termoPesquisa: string): Noticia[] {
    if (this.termoPesquisa == "") return this.todasNoticias;
    return this.todasNoticias.filter(noticia => {
      return noticia.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
        || noticia.nomeAutor.toLowerCase().includes(termoPesquisa.toLowerCase())
        || noticia.texto.toLowerCase().includes(termoPesquisa.toLowerCase());
    });
  }

  /**
   * Ação realizada ao cancelar a pesquisa.
   * @method aoCancelar
   */
  aoCancelar(evento: UIEvent) {
    this.termoPesquisa = "";
    this.iniciouPesquisa = false;
  }

  /**
   * Retorna a data em millis formatada para String.
   * @param {number} dataMillis
   * @method dataFormatada
   * @return {string} com a data em millis formatada
   */
  dataFormatada(dataMillis: number): string {
    return new Date(dataMillis).toDateString();
  }

  /**
   * Ação realizada ao clicar em uma notícia.
   * @param {Noticia} noticia que foi clicada
   * @method aoClicarNoticia
   */
  aoClicarNoticia(noticia: Noticia) {
    this.navCtrl.push(`DetalheNoticiaPage`, {noticia: noticia});
  }
}
