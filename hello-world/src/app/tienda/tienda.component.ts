import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaService } from '../tienda.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  products = [
    { name: 'Producto 1', price: 20.00, image: 'assets/rosa.jpeg', color: 'rosa' },
    { name: 'Producto 2', price: 20.00, image: 'assets/blanca.jpeg', color: 'blanca' },
    { name: 'Producto 3', price: 20.00, image: 'assets/negra.jpeg', color: 'negra' },
  ];

  selectedSize: string = ''; // Talla por defecto

  constructor(private tiendaService: TiendaService) { }

  onSizeChange(event: any) {
    this.selectedSize = event.target.value;
  }

  async addToCart(color: string, size: string) {
    // Aquí deberías llamar a tu servicio para decrementar el stock en la base de datos
    // y realizar cualquier otra lógica que necesites para gestionar el carrito.

    // Ejemplo de cómo podrías llamar al servicio (necesitas implementar TiendaService):
    try {
      const resultado = await this.tiendaService.decrementarStock(color, size);
      console.log(`Añadiendo al carrito: ${color} - Talla: ${size}`);
      console.log('Stock decrementado:', resultado);

      // Después de decrementar el stock, añade el producto al carrito
      this.tiendaService.agregarAlCarrito({ name: `Producto ${color}`, price: 20.00, image: `assets/${color}.jpeg`, color }, size);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  }
}
