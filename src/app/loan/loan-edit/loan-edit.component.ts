import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Loan } from '../model/Loan';
import { Game } from '../../game/model/Game';
import { Customer } from '../../customer/model/Customer';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GameService } from '../../game/game.service';
import { CustomerService } from '../../customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-loan-edit',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule, MatError, MatDatepickerModule, MatSelectModule],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss'
})
export class LoanEditComponent implements OnInit {

  loan: Loan;
  games: Game[];
  customers: Customer[];

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date();
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { loan: Loan },
    private loanService: LoanService,
    private gameService: GameService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
    this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();

    this.gameService.getGames().subscribe((games) => {
      this.games = games;

      if (this.loan.game != null) {
        const gameFilter: Game[] = games.filter((game) => game.id == this.data.loan.game.id);
        if (gameFilter.length > 0) {
          this.loan.game = gameFilter[0];
        }
      }
    })

    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;

      if (this.loan.customer != null) {
        const customerFilter: Customer[] = customers.filter((customer) => customer.id == this.data.loan.customer.id);
        if (customerFilter.length > 0) {
          this.loan.customer = customerFilter[0];
        }
      }
    })

  }

  onSave() {

    const showErrorMessage = (message: string) => {
      this.snackbar.open(message, 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    };
    let errorMessage = 'Ocurrió un error inesperado';
    const differenceInMilliseconds = this.loan.returnDate.getTime() - this.loan.loanDate.getTime();

    if (this.loan.returnDate.getTime() < this.loan.loanDate.getTime()) {
      showErrorMessage('La fecha de devolución no puede ser anterior a la fecha del préstamo');
      return;
    }
    else if (differenceInMilliseconds > (1000 * 3600 * 24 * 14)) {
      showErrorMessage('La fecha de devolución no puede ser superior a 14 días');
      return;
    }
  
    this.loanService.saveLoan(this.loan).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (err) => {
        if (err.status === 409) {
          errorMessage = 'El juego ya está prestado para esas fechas o el cliente tiene dos juegos prestados';
        }
        else if (err.status === 500) {
          errorMessage = 'Hubo un error en el servidor, inténtalo de nuevo más tarde';
        }
        showErrorMessage(errorMessage);
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
