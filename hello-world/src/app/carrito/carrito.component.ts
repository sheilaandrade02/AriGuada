import { Component,OnInit } from '@angular/core';
import { TiendaService } from '../tienda.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private tiendaService: TiendaService) {}

  ngOnInit(): void {
    this.carrito = this.tiendaService.obtenerCarrito();
  }

  async eliminarItem(color: string, talla: string) {
    try {
      const resultado = await this.tiendaService.incrementarStock(color, talla);
      console.log(`Eliminando del carrito: ${color} - Talla: ${talla}`);
      console.log('Stock incrementado:', resultado);

      // Filtrar el carrito para eliminar el elemento correspondiente
      this.carrito = this.carrito.filter((item) => !(item.producto.color === color && item.talla === talla));
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  }

  realizarPago() {
    // Implementa la lógica para realizar el pago
    console.log('Realizando pago...');
    // Puedes redirigir al usuario a una página de pago, mostrar un formulario, etc.
  }

}
