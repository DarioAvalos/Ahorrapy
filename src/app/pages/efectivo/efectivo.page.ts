import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-efectivo',
  templateUrl: './efectivo.page.html',
  styleUrls: ['./efectivo.page.scss'],
})
export class EfectivoPage implements OnInit {

  cuentaForm : FormGroup

  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.cuentaForm = this.formBuilder.group({
      tipo : ['efectivo',[
        Validators.required
      ]
      ],
      valor : ['',[
        Validators.required]
      ],
      moneda : ['GS',[
          Validators.required]
        ]
    });

  }

  guardarCuenta() {
    if (this.cuentaForm.valid) {
      localStorage.setItem('cuentaE', JSON.stringify(this.cuentaForm.value));
      this.router.navigate(['/cuentas']);
    } else {
      console.log("Por favor completa todos los campos");
    }
  }

}
