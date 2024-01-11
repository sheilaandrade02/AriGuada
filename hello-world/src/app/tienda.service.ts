import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private apiUrl = 'http://localhost:3002'; // Reemplaza con la URL de tu servidor

  constructor() {}
      // Método para restar 1 al stock de una camiseta específica según el color y la talla
  async decrementarStock(color: string, talla: string) {
    const url = `${this.apiUrl}/camisetas/decrementar-stock/${color}/${talla}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al decrementar el stock');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private carrito: any[] = [];

  agregarAlCarrito(producto: any, talla: string): void {
    const itemEnCarrito = this.carrito.find((item) => item.producto === producto && item.talla === talla);

    if (itemEnCarrito) {
      itemEnCarrito.cantidad++;
    } else {
      this.carrito.push({ producto, talla, cantidad: 1 });
    }
  }

  obtenerCarrito(): any[] {
    return this.carrito;
  }

  async incrementarStock(color: string, talla: string) {
    const url = `${this.apiUrl}/camisetas/incrementar-stock/${color}/${talla}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al incrementar el stock');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  eliminarDelCarrito(producto: any, talla: string): void {
    const itemEnCarrito = this.carrito.find((item) => item.producto === producto && item.talla === talla);

    if (itemEnCarrito) {
      itemEnCarrito.cantidad--;
    } else {
      this.carrito.push({ producto, talla, cantidad: 1 });
    }
  }
}
