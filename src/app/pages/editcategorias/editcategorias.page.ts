import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editcategorias',
  templateUrl: './editcategorias.page.html',
  styleUrls: ['./editcategorias.page.scss'],
})
export class EditcategoriasPage implements OnInit {

  item: string;
  groupTitle: string;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private dataService: DataService 
  ) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.item = params['item'];
      this.groupTitle = params['groupTitle'];
      this.dataService.selectedItem = { item: this.item, groupTitle: this.groupTitle }; // Set selectedItem
    });
    
  }

  guardarValor(nuevoValor: string) {
    const newItem = { item: nuevoValor, groupTitle: this.groupTitle };
    this.dataService.actualizarItem(newItem);
    this.navCtrl.back();

    console.log('Nuevo valor:', nuevoValor);
  }

}
