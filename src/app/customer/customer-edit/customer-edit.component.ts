import { Component, Inject, OnInit } from '@angular/core';
import { Customer } from '../model/Customer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule, MatError],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent implements OnInit {
  customer: Customer;
  customers: Customer[];
  nameExists: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer },
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customer = this.data.customer ? Object.assign({}, this.data.customer) : new Customer
  }

  onSave() {
    this.nameExists = false;
    this.customerService.saveCustomer(this.customer).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (err) => {
        if (err.status == 409) {
          this.nameExists = true;
          this.customer.name = '';
        }
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
