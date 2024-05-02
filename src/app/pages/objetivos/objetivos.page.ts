import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Objetivo } from 'src/app/models/objetivo.model';
import { ObjetivoService } from 'src/app/services/objetivo.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.page.html',
  styleUrls: ['./objetivos.page.scss'],
})
export class ObjetivosPage implements OnInit {

  objetForm: FormGroup;
  objetivos: Objetivo[] = [];
  monto: string;
  monto2: number;

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private objService: ObjetivoService
  ) { }

  ngOnInit() {
    this.objetForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });

    // Obtener objetivos del almacenamiento local al iniciar la página
    this.objetivos = this.objService.obtenerObjetivos();

    // Borrar el contenido del nuevoMonto en cada objetivo al inicializar la página
    this.objetivos.forEach(objetivo => {
      objetivo.nuevoMonto = null;
      objetivo.monto = null;
      objetivo.mostrarAlerta = false;
      objetivo.objetivoAlcanzado = false;
    });
  }
  
  formatInput(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.monto = value;
    this.convertirnumero(this.monto);
  }

  convertirnumero(number:string){
    this.monto2 = parseFloat(number.replace(/\./g, ''));
    // console.log(this.monto2);
  }

  // Método para dar formato al monto nuevo
  formatNuevoMonto(objetivo: Objetivo, value: any) {
    if (value) {
        value = value.replace(/\D/g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        // value = parseFloat(value.replace(/\./g, '').replace(',', '.'));
        objetivo.monto = value;
        this.convertirnumero(objetivo.monto);
        objetivo.nuevoMonto = this.monto2;
    }
  }

  // Método para guardar un nuevo objetivo
  async guardarObjectivo() {
    if (this.objetForm.valid) {
      const objetivo: Objetivo = {
        nombre: this.objetForm.get('nombre').value,
        valor: this.monto2,
        progreso: 0, // Inicialmente no hay progreso
        nuevoMonto: 0, // Inicialmente no hay monto nuevo
        mostrarAlerta: false, // Bandera para verificar si se mostró la alerta
        objetivoAlcanzado: false // Bandera para verificar si se alcanzó el objetivo
      };
      this.objService.agregarObjetivo(objetivo);
      this.objetivos = this.objService.obtenerObjetivos();
      this.objetForm.reset();
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Por favor completa todos los campos correctamente',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Método para actualizar el progreso del objetivo
  async actualizarProgreso(objetivo: Objetivo) {
    if (objetivo.nuevoMonto > 0) {
      objetivo.progreso += objetivo.nuevoMonto;
      if (objetivo.progreso >= objetivo.valor) {
        objetivo.progreso = objetivo.valor;
        objetivo.objetivoAlcanzado = true; // Se marca el objetivo como alcanzado
      }
      if (objetivo.progreso / objetivo.valor >= 1 && !objetivo.mostrarAlerta) {
        objetivo.mostrarAlerta = true; // Se marca la alerta como mostrada
        await this.mostrarAlertaFelicitacion();
      }
      this.objService.actualizarProgreso(objetivo);
      objetivo.nuevoMonto = 0; // Reiniciamos el monto nuevo
      objetivo.monto = ''; // Reiniciamos el monto nuevo
    }
  }

  // Método para eliminar un objetivo
  async eliminarObjetivo(objetivo: Objetivo) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro que deseas eliminar este objetivo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.objService.eliminarObjetivo(objetivo);
            this.objetivos = this.objService.obtenerObjetivos();
          }
        }
      ]
    });
    await alert.present();
  }

  // Método para mostrar la alerta de felicitación al usuario
  async mostrarAlertaFelicitacion() {
    const alert = await this.alertController.create({
      header: '¡Felicidades!',
      message: 'Has alcanzado un objetivo.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
