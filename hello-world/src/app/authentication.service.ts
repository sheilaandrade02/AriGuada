// authentication.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated: boolean = false;
  private authenticatedUser: string = '';

  private apiUrl = 'http://localhost:3001'; // Reemplaza con la URL de tu servidor

  async verificarUsuarioRegistrado(usuario: string, contrasena: string) {
    const url = `${this.apiUrl}/users/${usuario}`;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'contrasena': contrasena,
    });

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        alert('Usuario o contraseña incorrectos');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      // Lógica adicional según tu necesidad
      this.login(usuario);

      return responseData;
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
      throw error;
    }
  }

  login(usuario:string):void{
    this.isAuthenticated = true;
    this.authenticatedUser = usuario;
  }

  logout():void{
    this.isAuthenticated = false;
    this.authenticatedUser = '';
  }

  getIsAuthenticated():boolean{
    return this.isAuthenticated;
  }

  getAuthenticatedUser():string{
    return this.authenticatedUser;
  }
}
