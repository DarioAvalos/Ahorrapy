import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private platform: Platform) { 
    this.initializeApp();
  }

  ngOnInit() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (!localStorage.getItem('cuentaT')) {
        localStorage.setItem('cuentaT', JSON.stringify({tipo: "tarjeta", valor: "0", moneda: "GS"}));
      }
      if (!localStorage.getItem('cuentaE')) {
        localStorage.setItem('cuentaE', JSON.stringify({tipo: "efectivo", valor: "0", moneda: "GS"}));
      }
      if (!localStorage.getItem('efectivo')) {
        localStorage.setItem('efectivo', '0');
      }
      if (!localStorage.getItem('tarjeta')) {
        localStorage.setItem('tarjeta', '0');
      }
    });
  }

}
