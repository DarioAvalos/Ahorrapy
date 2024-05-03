import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listcompras',
  templateUrl: './listcompras.page.html',
  styleUrls: ['./listcompras.page.scss'],
})
export class ListcomprasPage {
  items: { nombre: string, checked: boolean }[] = [];

  constructor(private alertController: AlertController) {}

  ionViewWillEnter() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  async agregarItem() {
    const alert = await this.alertController.create({
      header: 'Agregar artículo',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre del artículo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Agregar',
          handler: (data) => {
            if(data.nombre.trim() !== ''){
              this.items.push({ nombre: data.nombre, checked: false });
              this.guardarItems();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  tacharItem(index: number) {
    this.guardarItems();
  }

  async editarItem(index: number) {
    const alert = await this.alertController.create({
      header: 'Editar artículo',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: this.items[index].nombre,
          placeholder: 'Nombre del artículo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            if(data.nombre.trim() !== ''){
              this.items[index].nombre = data.nombre;
              this.guardarItems();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarItem(index: number) {
    this.items.splice(index, 1);
    this.guardarItems();
  }

  guardarItems() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}





