import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Observable, Observer } from 'rxjs';

@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
  }

  /**
   * Fecha o Banco de Dados.
   * @method fecharDb
   */
  public async fecharDb() {
    this.db.close();
    this.db = null;
  }

  /**
   * Obtem o objeto do Banco de Dados.
   * @method getDb
   * @return {SQLiteObject} banco de dados
   */
  public getDb(): SQLiteObject {
    return this.db;
  }

  /**
   * Cria os Bancos de Dados.
   * @method criarDatabase
   * @return {Observable<any>} Observável com o resultado
   */
  public criarDatabase(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.sqlite.create({
        name: `local.db`,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;

          var sqls = [
            this.criarTabelaNoticias(),
            this.criarTabelaAutores()
          ];

          db.sqlBatch(sqls)
            .then(() => {
                observer.next('ready');
                observer.complete();
              }
            )
            .catch(e => console.error('[ERRO] Ao criar tabelas do DB', e));
        })
        .catch(e => console.error('[ERRO] Ao criar tabelas do DB', e));
    });
  }

  /**
   * Retorna string da query para criar Tabela de Noticias.
   * @method criarTabelaNoticias
   * @return {string} da query
   */
  private criarTabelaNoticias(): string {
    return `CREATE TABLE IF NOT EXISTS NOTICIAS
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              idAutor integer NOT NULL,
              titulo text NOT NULL,
              idImagem text,
              texto text NOT NULL,
              dataCriacao integer NOT NULL
            )`;
  }

  /**
   * Retorna string da query para criar Tabela de Autores.
   * @method criarTabelaAutores
   * @return {string} da query
   */
  private criarTabelaAutores(): string {
    return `CREATE TABLE IF NOT EXISTS AUTORES
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome text NOT NULL
            )`;
  }

}
