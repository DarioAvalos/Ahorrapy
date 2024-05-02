import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { RegistroService } from 'src/app/services/registros.service';
import { Presupuesto } from 'src/app/models/presupuesto.model';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.page.html',
  styleUrls: ['./presupuesto.page.scss'],
})
export class PresupuestoPage implements OnInit, OnDestroy {

  presupForm: FormGroup;
  monto: number;
  allItems: string[] = [];
  presupuestos: Presupuesto[] = [];
  totalGasto: number = 0;
  private categoriesChangedSubscription: Subscription;
  avisoMostrado: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private dataService: DataService,
    private registroService: RegistroService,
    private alertController: AlertController,
    private presupuestoService: PresupuestoService,
  ) { }

  ngOnInit() {
    this.presupForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
    });

    this.getAllItems();
    this.categoriesChangedSubscription = this.dataService.categoriesChanged$.subscribe(() => {
      this.getAllItems(); // Actualizar las opciones del ion-select-option
    });

    this.presupuestos = this.presupuestoService.obtenerPresupuestos();
    this.calcularTotalGasto();
  }

  ngOnDestroy() {
    this.categoriesChangedSubscription.unsubscribe();
  }

  formatInput(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.monto = value;
  }

  getAllItems() {
    this.allItems = [];
    this.dataService.groups.forEach(group => {
      this.allItems = this.allItems.concat(group.items);
    });
  }

  calcularTotalGasto() {
    this.totalGasto = 0;
    this.presupuestos.forEach(presupuesto => {
      const monto = parseFloat(presupuesto.valor.toString().replace(/\./g, '').replace(',', '.'));
      const totalGastoPresupuesto = this.registroService.obtenerTotalGastoPorCategoria(presupuesto.categoria);
      presupuesto.porcentaje = (totalGastoPresupuesto / monto) * 1;
      presupuesto.saldo = monto - totalGastoPresupuesto;
      presupuesto.totalGasto = totalGastoPresupuesto;
      this.totalGasto += totalGastoPresupuesto;
      // console.log(monto,totalGastoPresupuesto)
      if (presupuesto.porcentaje >= 0.9 && !this.avisoMostrado) {
        this.mostrarAviso();
      }
    });
  }

  async mostrarAviso() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Estás por alcanzar el total de uno de los presupuestos',
      buttons: ['OK']
    });
    await alert.present();
    this.avisoMostrado = false; // Se marca que el aviso ya se mostró
  }

  async guardarPresupuesto() {
    if (this.presupForm.valid){
      const presupuesto: Presupuesto = this.presupForm.value;
      this.presupuestoService.agregarPresupuesto(presupuesto);
      this.presupuestos = this.presupuestoService.obtenerPresupuestos();
      this.calcularTotalGasto();
      this.presupForm.reset();
  }else{       
      // console.log("Por favor completa todos los campos");
      const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Por favor completa todos los campos',
      buttons: ['OK']
    });
      await alert.present();
    }
  }

  async eliminarPresupuesto(presupuesto: Presupuesto) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro que deseas eliminar este presupuesto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.presupuestoService.eliminarPresupuesto(presupuesto);
            this.presupuestos = this.presupuestoService.obtenerPresupuestos();
            this.calcularTotalGasto();
          }
        }
      ]
    });
    await alert.present();
  }
}

