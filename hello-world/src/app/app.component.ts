import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  providers: [AuthenticationService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'hello-world';
  authService: AuthenticationService; // Agrega esta línea

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  get isAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }

  get authenticatedUser(): string {
    return this.authService.getAuthenticatedUser();
  }
}
