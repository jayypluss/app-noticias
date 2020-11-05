/**
 * Model/Classe para objetos Noticia
 */
export class Noticia {
  id: number;
  idAutor: number;
  nomeAutor?: string;
  titulo: string;
  idImagem?: string;
  texto: string;
  dataCriacao: number;
}
