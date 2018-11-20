import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: null;
    password: null;
  constructor(public auth: AuthService) { }

  ngOnInit() {
      
  }
  login()
  {
      this.auth.login(this.email, this.password).then(() => {
          
      });
    
  }
}
