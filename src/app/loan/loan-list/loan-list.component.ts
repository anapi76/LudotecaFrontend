import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Loan } from '../model/Loan';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoanService } from '../loan.service';
import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/Game';
import { Customer } from '../../customer/model/Customer';
import { CustomerService } from '../../customer/customer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/Pageable';
import { LoanSearchDto } from '../model/LoanSearchDto';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatPaginator],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit {

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'customer', 'loanDate', 'returnDate', 'action'];

  games: Game[];
  customers: Customer[];
  loans: Loan[];
  filterGame: Game;
  filterCustomer: Customer;
  filterDate: Date;
  loanSearchDto: LoanSearchDto;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  constructor(
    private loanService: LoanService,
    private gameService: GameService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => this.games = games);
    this.customerService.getCustomers().subscribe((customers) => this.customers = customers);
    this.loadPage()
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    };
    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex
    }
    this.loanSearchDto = {
      pageable: pageable,
      idGame: this.filterGame != null ? this.filterGame.id : null,
      idCustomer: this.filterCustomer != null ? this.filterCustomer.id : null,
      date: this.filterDate != null ? this.datePipe.transform(this.filterDate, 'dd-MM-yyyy') : null,
    }
    this.loanService.getLoans(this.loanSearchDto).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    }
    );
  }

  onCleanFilter(): void {
    this.filterGame = null;
    this.filterCustomer = null;
    this.filterDate = null
    this.onSearch();
  }

  onSearch(): void {
    this.loadPage();
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: "Eliminar préstamo",
        description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(result => {
          this.ngOnInit();
        })
      }
    })

  }

}
