/**
 * Model/Classe para objetos Noticia
 */
export class Noticia {
  id: number;
  idAutor: number;
  nomeAutor?: string;
  titulo: string;
  imagemBase64?: string;
  texto: string;
  dataCriacao: number;
}
