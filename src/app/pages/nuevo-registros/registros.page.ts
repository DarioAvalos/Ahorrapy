import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistroService } from 'src/app/services/registros.service';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  registroForm: FormGroup;

  tuModelo: number;

  allItems: string[] = [];

  private categoriesChangedSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService,
    private router: Router,
    private alertController: AlertController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      monto: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required]
    });

    this.getAllItems();
    this.categoriesChangedSubscription = this.dataService.categoriesChanged$.subscribe(() => {
      this.getAllItems(); // Actualizar las opciones del ion-select-option
    });
  }

  ngOnDestroy() {
    this.categoriesChangedSubscription.unsubscribe();
  }

  getAllItems() {
    this.allItems = [];
    this.dataService.groups.forEach(group => {
      this.allItems = this.allItems.concat(group.items);
    });
  }

  formatInput(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    this.tuModelo = value;
  }

  async guardarRegistro() {
    if (this.registroForm.valid) {
      const monto = parseFloat(this.registroForm.value.monto.replace(/\./g, '').replace(',', '.'));
      const fecha = new Date().toISOString();
      const cuenta = this.registroForm.value.tipo;
      const categoria = this.registroForm.value.categoria;
  
      this.registroService.restarMonto(monto, fecha, cuenta, categoria);
      this.registroForm.reset();
      this.router.navigate(['/home']);
    } else {
      console.log("Por favor completa todos los campos");
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Por favor completa todos los campos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}

