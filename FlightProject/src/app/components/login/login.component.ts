import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UserToken } from 'src/app/model/user-token';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userData : UserToken;
  userForLogin : User;

  constructor(private loginS : LoginService, 
              public userS : UserService, 
              private toast : ToastrService,
              private router : Router) { }

  ngOnInit(): void {

    this.userForLogin = new User("", "");
  }

  login() {
    this.loginS.tryToLogin(this.userForLogin).subscribe(data => {
      if(data != null){
        this.userData = data;
        this.userS.userData = this.userData;

        this.userS.token = this.userData.token;
        this.userS.username = this.userData.user.username;
        this.userS.isLogged = true;

        this.toast.success("Uspešna prijava.", "Obaveštenje");
        this.router.navigate(["/home"]);
      } 
    }, err => {
      this.toast.error("Netačni podaci. Molimo pokušajte ponovo!", "Greška");
    });
  }

}
