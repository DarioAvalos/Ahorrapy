import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  email: any;

  constructor(public router: Router, 
              public authService: AutenticacionService) { }

  ngOnInit() {
  }

  async resetPassword(){
    this.authService.resetPassword(this.email).then(()=>{

      console.log('enviado link de restablecimiento')
      this.router.navigate(['/login'])

    }).catch((error) =>{
      console.log(error);
    })
  }

}
