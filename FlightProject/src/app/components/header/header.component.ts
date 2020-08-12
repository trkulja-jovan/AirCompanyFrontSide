import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userS : UserService, public router : Router, private toast : ToastrService) { }

  ngOnInit(): void {
  }

  logout() {
    
    this.userS.logoutUser().subscribe(data => {
      if(data){
        this.userS.token = "";
        this.userS.username = "";
        this.userS.isLogged = false;

        this.router.navigateByUrl("/login");
      }
    }, err => {
        this.toast.error("Greška prilikom odjavljivanja sa sistema. Pokušajte kasnije!", "Greška");
    });

  }

}
