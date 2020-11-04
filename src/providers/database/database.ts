import { Injectable} from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Observable, Observer } from 'rxjs';

@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
  }

  public async fecharDb() {
    this.db.close();
    this.db = null;
  }

  public getDb = (): SQLiteObject => this.db;

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

  private criarTabelaNoticias(): string {
    return `CREATE TABLE IF NOT EXISTS NOTICIAS
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              idAutor integer NOT NULL,
              titulo text NOT NULL,
              idImagem text,
              texto text NOT NULL
            )`;
  }

  private criarTabelaAutores(): string {
    return `CREATE TABLE IF NOT EXISTS AUTORES
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              nome text NOT NULL
            )`;
  }

}
