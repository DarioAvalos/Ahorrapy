import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup;

  constructor(public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public authService: AutenticacionService,
    private alertController: AlertController,
    public router: Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email : ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]
      ],
      password : ['',[
      Validators.required,
      Validators.pattern("(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}")],
      ],
      rememberMe: [false]
    });

    // Cargar credenciales guardadas si existen
    const savedCredentials = this.authService.getSavedCredentials();
    if (savedCredentials) {
      this.loginForm.patchValue(savedCredentials);
    }

  }

  get errorControl(){
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    if (this.loginForm?.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      try {
        await loading.present();
        await this.authService.loginUser(email, password);
        // Guardar credenciales si el usuario marcó "Recuérdame"
        this.authService.saveCredentials(email, password, rememberMe);
        this.router.navigate(['/home']);
      } catch (error) {
        console.log(error);
        const alert = await this.alertController.create({
          header: 'Aviso',
          message: 'Correo o contraseña incorrecta.',
          buttons: ['OK']
        });
        await alert.present();
      } finally {
        loading.dismiss();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Correo o contraseña incorrecta.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  
}