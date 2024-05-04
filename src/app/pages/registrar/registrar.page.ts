import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  
  regForm: FormGroup;

  dateTimeValue: string;

  constructor( public formBuilder: FormBuilder, 
               public loadingCtrl: LoadingController,
               public toastController: ToastController,
               public authService: AutenticacionService,
               public router: Router, 
               private alertController: AlertController) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      nombre : ['', [Validators.required]], 
      fecha : ['', [Validators.required]], 
      email : ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]
      ],
      password : ['',[
      Validators.required,
      Validators.pattern("(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}")]
    ]
    });

  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async registrar(){
    const loading = await this.loadingCtrl.create({
      message: 'Registrando...'
    });
    await loading.present();

    if(this.regForm?.valid){
      const user = await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch((error)=>{
        console.log(error);
        loading.dismiss();
      });

      if(user){
        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Registro exitoso. Por favor, inicia sesión.',
          duration: 2000,
          position: 'top'
        });
        await toast.present();
        this.router.navigate(['/login']);
      } else {
        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Error al registrar usuario. Por favor, inténtalo de nuevo.',
          duration: 2000,
          position: 'top'
        });
        await toast.present();
      }
    }
  }
  
  async openDateTimePicker() {
    const alert = await this.alertController.create({
      header: 'Seleccionar Fecha',
      inputs: [
        {
          name: 'date',
          type: 'date',
          label: 'Fecha',
          value: new Date().toISOString().split('T')[0]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data: { date: any; }) => {
            this.dateTimeValue = `${data.date}`;
          }
        }
      ]
    });

    await alert.present();
  }

}
