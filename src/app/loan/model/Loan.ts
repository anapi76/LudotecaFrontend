import { Customer } from "../../customer/model/Customer";
import { Game } from "../../game/model/Game";

export class Loan {
    id: number;
    game: Game;
    customer: Customer;
    loanDate: Date;
    returnDate: Date;
}