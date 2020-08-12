import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './guards/auth.guard';
import { ShowflightsComponent } from './components/showflights/showflights.component';


const routes: Routes = [
  { path : "login", component : LoginComponent},
  { path : "register", component : RegisterComponent },
  { path : "" , redirectTo: '/login', pathMatch: 'full' },
  { path: "home", component : HomepageComponent,canActivate : [AuthGuard]},
  { path : "flights", component : ShowflightsComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
