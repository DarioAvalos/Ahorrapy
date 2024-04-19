import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  groups = [
    {
      title: 'Comida',
      visible: false,
      items: ['Comida General', 'Supermercado', 'Restaurante', 'Cada día']
    },
    {
      title: 'Entretenimiento',
      visible: false,
      items: ['Entretenimiento General', 'Cine y teatro', 'Discoteca', 'Bar', 'Concierto', 'Vacaciones', 'Juegos', 'Viajes']
    },
    {
      title: 'Automóvil',
      visible: false,
      items: ['Automóvil General', 'Combustible', 'Reparaciones', 'Amortización', 'Seguro', 'Revisión', 'Lavado de auto', 'Accesorios']
    },
    {
      title: 'Grupo 2',
      visible: false,
      items: ['Elemento 4', 'Elemento 5', 'Elemento 6']
    },
    {
      title: 'Grupo 2',
      visible: false,
      items: ['Elemento 4', 'Elemento 5', 'Elemento 6']
    }
  ];
  
  constructor() { }

  toggleGroup(group) {
    group.visible = !group.visible;
  }

  ngOnInit() {
  }

}
