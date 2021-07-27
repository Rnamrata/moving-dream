import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';



@NgModule({
  declarations: [CustomerComponent, EmployeeComponent],
  exports: [
    CustomerComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignUpModule { }
