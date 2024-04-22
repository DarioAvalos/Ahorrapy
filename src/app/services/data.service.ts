import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  groups = JSON.parse(localStorage.getItem('groups')) || [
    {
      title: 'Comida',
      items: ['Comida General', 'Supermercado', 'Restaurante', 'Cada día'],
      visible: false
    },
    {
      title: 'Entretenimiento',
      items: ['Entretenimiento General', 'Cine y teatro', 'Discoteca', 'Bar', 'Concierto', 'Vacaciones', 'Juegos', 'Viajes'],
      visible: false
    },
    {
      title: 'Automóvil',
      items: ['Automóvil General', 'Combustible', 'Reparaciones', 'Amortización', 'Seguro', 'Revisión', 'Lavado de auto', 'Accesorios'],
      visible: false
    },
    {
      title: 'Casa',
      items: ['Casa General', 'Electricidad', 'Agua', 'Gas', 'Calefacción', 'Alquiler'],
      visible: false
    },
    {
      title: 'Vestuario',
      items: ['Vestuario General', 'Pantalones', 'Zapatos', 'Suéteres', 'Camisas', 'Chaquetas', 'Joyería','Ropa interior'],
      visible: false
    },
    {
      title: 'Electrónicos',
      items: ['Electrónicos General', 'Computador', 'Teléfono', 'Televisión', 'Impresora', 'Cámara', 'Jugos','Accesorios electrónica'],
      visible: false
    },
    {
      title: 'Salud y belleza',
      items: ['Salud y belleza General', 'Cosméticos', 'Perfumería', 'Peluquería', 'Medicamentos', 'Nutrientes'],
      visible: false
    },
    {
      title: 'Niños',
      items: ['Niños General', 'Juguetes', 'Vestuario', 'Escuela', 'Bolsillo', 'Cuota colegio'],
      visible: false
    },
    {
      title: 'Trabajo',
      items: ['Trabajo General', 'Salrio', 'Bono', 'Otro'],
      visible: false
    }
  ];

  selectedItem: any;

  constructor() { }

  actualizarItem(nuevoItem: any) {
    if (this.selectedItem) {
      const group = this.groups.find(g => g.title === nuevoItem.groupTitle);
      if (group) {
        const itemIndex = group.items.indexOf(this.selectedItem.item);
        if (itemIndex > -1) {
          group.items[itemIndex] = nuevoItem.item;
          localStorage.setItem('groups', JSON.stringify(this.groups)); // Guardar en localStorage
        }
      }
    }
  }

}
