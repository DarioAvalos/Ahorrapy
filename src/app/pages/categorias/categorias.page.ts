import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage {

  groups: any;
  
  constructor( 
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private dataService: DataService 
  ) { }


  ionViewWillEnter() {
    this.groups = this.dataService.groups;
  }

  toggleGroup(group) {
    group.visible = !group.visible;
  }

  obtenerValor(valor: string) {
    console.log('Valor del ion-item:', valor);
  }

  editarItem(item: string, groupTitle: string) {
    this.navCtrl.navigateForward('/editcategorias', {
      queryParams: {
        item: item,
        groupTitle: groupTitle
      }
    });
  }

}
