import { Pageable } from "../../core/model/page/Pageable";

export class LoanSearchDto {
    pageable: Pageable;
    idGame: number | null;
    idCustomer: number | null;
    date: string | null;
}