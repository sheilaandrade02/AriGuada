import { Injectable } from "@angular/core";
import { UsuarioSearchResult } from "../models/usuario";
import { Usuario } from "../models/usuario";

@Injectable({
  providedIn: "root"
})

export class SwapiService {
  constructor() {}

  async getUsuarios(): Promise<UsuarioSearchResult> {
    const response = await fetch("http://localhost:3001/users");
    const usuarioSearchResult = await response.json();
    return usuarioSearchResult;
  }
  async postUsuario(usuario: Usuario) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    };

    const response = await fetch("http://localhost:3001/users", requestOptions);
    const data = await response.json();
    return data;
  }
}
