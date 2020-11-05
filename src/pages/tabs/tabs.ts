import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { PesquisaPage } from "../pesquisa/pesquisa";
import { CriarNoticiaPage } from "../criar-noticia/criar-noticia";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  /**
   * Página Home de 'Notícias'
   */
  tab1Root = HomePage;

  /**
   * Página de 'esquisa de Notícias'
   */
  tab2Root = PesquisaPage;

  /**
   * Página de 'Criar Nova Notícia'
   */
  tab3Root = CriarNoticiaPage;

  constructor() {

  }
}
