import { Injectable } from '@angular/core';
import { Noticia } from "../../models/noticia/noticia.model";
import { DatabaseProvider } from "../database/database";
import { Observable, Observer } from "rxjs";

@Injectable()
export class NoticiasProvider {

  constructor(private database: DatabaseProvider) {
  }

  /**
   * Retorna um array de objetos de notícia mocados.
   * @method criarMockDeNoticias
   * @return {Noticia[]} array de notícias
   */
  criarMockDeNoticias() : Noticia[] {
    let mockArray = [];
    for (let i = 0; i < 15; i++) {
      let item = {
        id: i,
        idAutor: i,
        titulo: `Post Titulo ${i}`,
        idImagem: `image_${i}`,
        texto: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
      }
      mockArray.push(item);
    }
    return mockArray;
  }

  /**
   * Retorna do DB um autor.
   * @method procurarAutorDb
   * @param {string} nome do autor a ser pesquisado
   * @return {Promise<any>} Promise com resultado do DB
   */
  procurarAutorDb(nome: string): Promise<any> {
    // TODO refatorar busca e insterção de autor (adicionar validações)
    return this.database.getDb().executeSql(`SELECT * FROM AUTORES WHERE nome = ?`, [nome]).catch(reason => {
      console.log(`ERRO em procurarAutorDb(${nome}): `, reason);
    });
  }

  /**
   * Retorna do DB um autor.
   * @method procurarAutorPorId
   * @param {number} id do autor a ser pesquisado
   * @return {Promise<any>} Promise com resultado do DB
   */
  procurarAutorPorId(id: number): Promise<any> {
    // TODO refatorar busca e insterção de autor (adicionar validações)
   return this.database.getDb().executeSql(`SELECT * FROM AUTORES WHERE id = ?`, [id]).then(autor => {
      if (autor && autor.rows && autor.rows.length > 0) {
        return Promise.resolve(autor.rows.item(0));
      }
    }).catch(reason => {
      console.log(`ERRO em procurarAutorPorId(${id}): `, reason);
    });
  }

  /**
   * Insere no DB um autor.
   * @method inserirNovoAutorDb
   * @param {string} nome do autor a ser inserido
   * @return {Promise<any>} Promise com resultado do DB
   */
  private inserirNovoAutorDb(nome: string): Promise<any> {
    let params = [ nome ];
    return this.database.getDb()
      .executeSql(`INSERT INTO AUTORES (nome) VALUES (?)`, params).catch(reason => {
        console.log(`ERRO em inserirNovoAutorDb(${nome}): `, reason);
      });
  }

  /**
   * Cadastra nova notícia no Banco de Dados.
   * @method cadastrarNoticiaNoDb
   * @param {string} nomeAutor nome do autor
   * @param {string} titulo do autor a ser inserido
   * @param {string} texto do autor a ser inserido
   * @return {Promise<any>} Promise com resultado do DB
   */
  async cadastrarNoticiaNoDb(nomeAutor: string, titulo: string, texto: string): Promise<any> {
    let autorResultado = await this.procurarAutorDb(nomeAutor);
    if (!autorResultado || !autorResultado.rows || !autorResultado.rows.length || autorResultado.rows.length < 1)
      autorResultado = this.inserirNovoAutorDb(nomeAutor);

    autorResultado = await this.procurarAutorDb(nomeAutor);

    if (autorResultado && autorResultado.rows && autorResultado.rows.length && autorResultado.rows.length > 0) {
      autorResultado = autorResultado.rows.item(0);
      let millisHoje = Date.now();
      let params = [ autorResultado.id, titulo, texto, millisHoje ];
      return this.database.getDb()
        .executeSql(`INSERT INTO NOTICIAS (idAutor, titulo, texto, dataCriacao) VALUES (?, ?, ?, ?)`, params).catch(reason => {
          console.log(`ERRO em cadastrarNoticiaNoDb(${nomeAutor}, ${titulo}, ${texto}): `, reason);
        });
    } else {
      return Promise.reject(autorResultado);
    }
  }

  /**
   * Busca listagem de notícias do DB.
   * @method obterNoticias
   * @return {Observable<any>} Observável com resultado do DB
   */
  obterNoticias(): Observable<any> {
    // TODO adicionar suporte a busca por limit/range (para ser utilizado com o infiniteScroll)
    return Observable.create((observer: Observer<any>) => {
      let noticias: Noticia[] = [];
      setTimeout(() => {
        this.database.getDb().executeSql(`SELECT * FROM NOTICIAS`, []).then(resultadoDb => {
          if (resultadoDb && resultadoDb.rows && resultadoDb.rows.length && resultadoDb.rows.length > 0) {
            for (let i = 0; i < resultadoDb.rows.length; i++) noticias.push(resultadoDb.rows.item(i));
          }
          observer.next(noticias);
          observer.complete();
        }).catch(reason => {
          console.log("Error:", reason);
        });
      }, 500);
    });
  }

  /**
   * Exclui uma Notícia do DB.
   * @method excluirNoticia
   * @param {number} id da Notícia a ser excluída
   * @return {Promise<any>} Promise com resultado do DB
   */
  excluirNoticia(id: number): Promise<any> {
    let params = [ id ];
    return this.database.getDb()
      .executeSql(`DELETE FROM NOTICIAS WHERE id = ?`, params).catch(reason => {
        console.log(`ERRO em excluirNoticia(${id}): `, reason);
      });
  }

  /**
   * Edita uma Notícia do DB.
   * @method editarNoticia
   * @param {string} texto novo da Notícia
   * @param {number} id da Notícia a ser editada
   * @return {Promise<any>} Promise com resultado do DB
   */
  editarNoticia(texto: string, id: number): Promise<any> {
    let params = [ texto, id ];
    return this.database.getDb()
      .executeSql(`UPDATE NOTICIAS SET texto = ? WHERE id = ?`, params).catch(reason => {
        console.log(`ERRO em editarNoticia(${id}): `, reason);
      });
  }

}
