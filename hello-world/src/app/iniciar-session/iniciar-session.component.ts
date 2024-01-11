import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-iniciar-session',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './iniciar-session.component.html',
  styleUrl: './iniciar-session.component.css'
})
export class IniciarSessionComponent {

  @Input() usuario!: string;
  contrasena: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  async onSubmit() {
    try {
      const response = await this.authService.verificarUsuarioRegistrado(this.usuario, this.contrasena);

      if (response.error) {
        alert('Usuario o contraseña incorrectos');
        console.log('Ha ocurrido un error');
        return;
      }

      this.authService.login(this.usuario);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al tener verificar usuario:', error);
    }
  }
}
