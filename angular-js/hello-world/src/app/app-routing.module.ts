import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PipeDemoComponent } from './components/pipe-demo/pipe-demo.component';
import { RegisteredUsersComponent } from './components/registered-users/registered-users.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  { path: "", component: HomeComponent }, 
  { path: "register", component: UserFormComponent },
  { path: "registered", component: RegisteredUsersComponent },
  { path :"pipe", component: PipeDemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
