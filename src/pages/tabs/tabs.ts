import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PesquisaPage } from "../pesquisa/pesquisa";
import { NovaNoticiaPage } from "../nova-noticia/nova-noticia";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PesquisaPage;
  tab3Root = NovaNoticiaPage;

  constructor() {

  }
}
