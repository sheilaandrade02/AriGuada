import { Component,OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioSearchResult} from '../../models/usuario';
import { SwapiService } from '../swapi.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  //@Input() usuario!: Usuario;
  public usuariosSearchResult?: UsuarioSearchResult;
  public swapiService: SwapiService = inject(SwapiService);

  /*async ngOnInit(){
    this.usuariosSearchResult = await this.swapiService.getUsuarios();
  }*/

  dataLoaded: boolean = false;
questForm: FormGroup= new FormGroup({
 nombre: new FormControl('',{
  validators: Validators.required,
 }),
 apellido: new FormControl('',{
  validators: Validators.required,
 }),
  correoElectronico: new FormControl('',{
    validators: Validators.email,
    updateOn: 'blur'
  }),
  usuario: new FormControl('',{
    validators: Validators.required,
   }),
   contrasena: new FormControl('',{
    validators: Validators.required,
   }),
   codigoPostal: new FormControl('',{
    validators: Validators.required,
   }),
   direccion: new FormControl('',{
    validators: Validators.required,
   }),

 }
);

constructor( private swapiServicePost: SwapiService,private router: Router) { }

async ngOnInit() {
  this.questForm.setValue({
    nombre: '',
    apellido: '',
    correoElectronico: '',
    usuario: '',
    contrasena: '',
    codigoPostal: '',
    direccion: ''
  });
  this.dataLoaded = true;
  // Llama a onSubmit después de cargar los datos
 // this.onSubmit();
}

onSubmit() {
  if (this.questForm.valid) {
    const usuarioData = this.questForm.value;
    console.log('Datos del formulario:', usuarioData);

    this.swapiServicePost.postUsuario(usuarioData)
      .then(response => {
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/iniciar-session']);
        console.log('POST exitoso:', response);
      })
      .catch(error => {
        console.log('Error en el POST:', error);
      });
  } else {
    alert('Faltan campos por llenar');
    console.log('Formulario no válido');
  }
}

}
