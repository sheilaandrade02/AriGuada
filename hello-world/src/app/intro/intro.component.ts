import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutMeComponent } from '../about-me/about-me.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [RouterModule,AboutMeComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {

}
