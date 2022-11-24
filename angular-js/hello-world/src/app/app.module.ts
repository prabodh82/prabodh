import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisteredUsersComponent } from './components/registered-users/registered-users.component';
import { PipeDemoComponent } from './components/pipe-demo/pipe-demo.component';
import { EllipsisPipe } from './Pipes/ellipsis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserFormComponent,
    HomeComponent,
    RegisteredUsersComponent,
    PipeDemoComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
