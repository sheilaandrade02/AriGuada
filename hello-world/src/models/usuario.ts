export interface Usuario {
  nombre: string;
  apellido: string;
  correoelEctronico: string;
  usuario: string;
  contrasena: string;
  codigoPostal: string;
  direccion: string;
}
export interface UsuarioSearchResult {
  results: Usuario[];
}
