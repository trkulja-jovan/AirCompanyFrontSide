import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { UserFull } from 'src/app/model/user-full';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser : UserFull;

  usernameVal : boolean;
  usernameIsFree : boolean;

  isAvailableUsername : string = "";

  usernameColorText;

  private tempText : string = "";

  constructor(private regServ : RegisterService, 
              private router : Router,
              private toast : ToastrService) { }

  ngOnInit(): void {
    this.registerUser = UserFull.createDefaultValues();
   
  }

  register() {

    this.regServ.registerOnServer(this.registerUser).subscribe(data => {
      if(data){
         this.toast.success("Uspešno ste se registrovali na sistem!", "Obaveštenje");
         this.router.navigate(["/login"]);
      } else {
        this.toast.error("Greška prilikom registracije", "Obaveštenje");
      }
    });

  }

  navigateToLoginPage(){
      this.router.navigate(["/login"]);
  }

  checkValidity(value : string){ 

    this.tempText = value;

    if(this.tempText == ""){
      this.isAvailableUsername = "";
      this.usernameVal = false;
      return;
    }

    this.usernameVal = true;

    if(this.regServ.checkValidityOfUsername(this.tempText)){

      this.regServ.checkValidityOnServer(this.tempText).subscribe(data => {
        if(!data){
          this.usernameIsFree = true;
          this.usernameColorText = "positive";
          this.isAvailableUsername = "Korisničko ime je dostupno i uneto u ispravnom formatu!";
        } else {
          this.usernameColorText = "negative";
          this.isAvailableUsername = "Korisničko ime nije dostupno!";
        }
      });
    } else {
      this.usernameIsFree = false;
      this.usernameColorText = "negative";
      this.isAvailableUsername = "Korisničko ime nije uneto u ispravnom formatu!";
    }

    this.usernameColorText = {
      'positive' : this.usernameIsFree,
      'negative' : !this.usernameIsFree
    };
  }
}
