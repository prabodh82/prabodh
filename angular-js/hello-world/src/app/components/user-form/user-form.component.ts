import { Component, OnInit } from '@angular/core';
import User from 'src/app/Entity/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  title = 'Fill out the form below';
  // to access the data of this variable in out html file use {{variable name}}
  user : User = new User();
 
  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

  save() {
    const observables = this.userService.saveuser(this.user);

    observables.subscribe((response : any) => {
      console.log(response);
    },(error : any) => {
      console.log(error);
      
    })
  }

}
