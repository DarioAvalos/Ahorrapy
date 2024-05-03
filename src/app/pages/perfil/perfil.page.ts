import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfilForm: FormGroup;
  nombreUsuario: string;

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Bienvenido';
    
    this.perfilForm = this.formBuilder.group({
      nombre: [this.nombreUsuario, [Validators.required]],
    });
  }

  async guardarPerfil() {
    if (this.perfilForm.valid) {
      localStorage.setItem('nombreUsuario', this.perfilForm.value.nombre);
      const alert = await this.alertController.create({
        header: '¡Felicidades!',
        message: 'Has cambiado el nombre de tu perfil, ahora ve y mira la barra de menú',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}


