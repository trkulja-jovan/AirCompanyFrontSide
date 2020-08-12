import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { RegisterService } from './services/register.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './guards/auth.guard';
import { FlightService } from './services/flight.service';
import { FlightInterceptors } from './interceptors/FlightInterceptor.interceptor';
import { ShowflightsComponent } from './components/showflights/showflights.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    ShowflightsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
	  BrowserAnimationsModule,
	  ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true
    })
  ],
  providers: [RegisterService, UserService, LoginService, AuthGuard, FlightService, {
    provide : HTTP_INTERCEPTORS,
    useClass : FlightInterceptors,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
