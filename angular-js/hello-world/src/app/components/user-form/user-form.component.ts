import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  title = 'Fill out the form below';
  // to access the data of this variable in out html file use {{variable name}}
  name = "";
  age = 0;
  gender = "Male";

  constructor() { }

  ngOnInit(): void {
  }

}
