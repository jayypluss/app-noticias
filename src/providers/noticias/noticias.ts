import { Injectable } from '@angular/core';
import { Noticia } from "../../models/noticia/noticia.model";
import { DatabaseProvider } from "../database/database";
import { Observable, Observer } from "rxjs";

@Injectable()
export class NoticiasProvider {

  constructor(private database: DatabaseProvider) {
  }

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

  private procurarAutorDb(autor: string): Promise<any> {
    return this.database.getDb().executeSql(`SELECT * FROM AUTORES WHERE nome = ?`, [autor]).catch(reason => {
      console.log(`ERRO em procurarAutorDb(${autor}): `, reason);
    });
  }

  private inserirNovoAutorDb(autor: string): Promise<any> {
    let params = [ autor ];
    return this.database.getDb()
      .executeSql(`INSERT INTO AUTORES (nome) VALUES (?)`, params).catch(reason => {
        console.log(`ERRO em inserirNovoAutorDb(${autor}): `, reason);
      });
  }

  async cadastrarNoticiaNoDb(autor: string, titulo: string, texto: string): Promise<any> {
    let autorResultado = await this.procurarAutorDb(autor);
    if (!autorResultado || !autorResultado.rows || !autorResultado.rows.length || autorResultado.rows.length < 1)
      autorResultado = this.inserirNovoAutorDb(autor);

    autorResultado = await this.procurarAutorDb(autor);

    if (autorResultado && autorResultado.rows && autorResultado.rows.length && autorResultado.rows.length > 0) {
      autorResultado = autorResultado.rows.item(0);
      let millisHoje = Date.now();
      let params = [ autorResultado.id, titulo, texto, millisHoje ];
      return this.database.getDb()
        .executeSql(`INSERT INTO NOTICIAS (idAutor, titulo, texto, dataCriacao) VALUES (?, ?, ?, ?)`, params).catch(reason => {
          console.log(`ERRO em cadastrarNoticiaNoDb(${autor}, ${titulo}, ${texto}): `, reason);
        });
    } else {
      return Promise.reject(autorResultado);
    }
  }

  obterNoticias(): Observable<any> {
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

}
