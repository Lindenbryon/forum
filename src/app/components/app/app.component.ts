import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router"
@Component({
  selector: 'forum',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isLoggedIn = false;
  
  constructor(public auth: AuthService, private router: Router)
  {
     this.auth.authState.subscribe((response) => {
         if(!this.auth.registering)
         {
             if(response && response.uid)
             {
                 this.isLoggedIn = true;
                 this.router.navigate(['/home']);
             }
             else
             {
                 this.isLoggedIn = false;
                 this.router.navigate(['/login']);
             }
         }
     });
  }
  
  logout()
  {
      this.auth.logout();
  }
  
}
