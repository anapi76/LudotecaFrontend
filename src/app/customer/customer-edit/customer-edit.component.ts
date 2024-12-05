import { Component, Inject, OnInit } from '@angular/core';
import { Customer } from '../model/Customer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    public dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer },
    private customerService: CustomerService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.customer = this.data.customer ? Object.assign({}, this.data.customer) : new Customer
  }

  onSave() {
    this.customerService.saveCustomer(this.customer).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (err) => {
        let errorMessage = "Ocurrió un error inesperado";
        if (err.status == 409) {
          errorMessage = "El nombre del cliente ya existe";
          this.customer.name = '';
        }
        this.snackbar.open(errorMessage, 'Ok', { verticalPosition: 'top', horizontalPosition: 'center' });
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
