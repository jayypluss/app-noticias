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
  resultadoPesquisa: Noticia[];

  constructor(public navCtrl: NavController,
              private noticiasProvider: NoticiasProvider) {

  }

  ionViewDidEnter() {
    this.noticiasProvider.obterNoticias().subscribe(noticias => {
      this.resultadoPesquisa = noticias;
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
    console.log(evento);
    console.log(this.termoPesquisa);
    this.iniciouPesquisa = true;
    console.log( new Date().getMilliseconds() );
  }

  /**
   * Ação realizada ao cancelar a pesquisa.
   * @method aoCancelar
   */
  aoCancelar($event: UIEvent) {
    this.termoPesquisa = '';
    console.log($event);
    console.log(this.termoPesquisa);
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
}
