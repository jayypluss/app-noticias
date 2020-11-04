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

  focarNaBarraDePesquisa(): void {
    setTimeout(() => {
      this.barraDePesquisa.setFocus();
    }, 500);
  }

  aoPressionarTecla($event: UIEvent) {
    console.log($event);
    console.log(this.termoPesquisa);
    this.iniciouPesquisa = true;
    console.log( new Date().getMilliseconds() );
  }

  aoCancelar($event: UIEvent) {
    this.termoPesquisa = '';
    console.log($event);
    console.log(this.termoPesquisa);
  }

  dataFormatada(dataCriacao: number) {
    return new Date(dataCriacao).toDateString();
  }
}
