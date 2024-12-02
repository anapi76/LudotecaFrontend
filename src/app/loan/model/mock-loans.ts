import { Loan } from "./Loan";

export const LOAN_DATA: Loan[] = [
    { id: 1, game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, customer: { id: 1, name: 'Cliente 1'}, loanDate: new Date("2024-01-01"), returnDate: new Date("2024-12-01") },
    { id: 2, game: { id: 2, title: 'Juego 2', age: 8, category: { id: 1, name: 'Categoría 1' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, customer: { id: 2, name: 'Cliente 2'}, loanDate: new Date("2024-01-01"), returnDate: new Date("2024-12-01") },
    { id: 3, game: { id: 3, title: 'Juego 3', age: 4, category: { id: 1, name: 'Categoría 1' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } }, customer: { id: 3, name: 'Cliente 3'}, loanDate: new Date("2024-01-01"), returnDate: new Date("2024-12-01") },
    { id: 4, game: { id: 4, title: 'Juego 4', age: 10, category: { id: 2, name: 'Categoría 2' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, customer: { id: 4, name: 'Cliente 4'}, loanDate: new Date("2024-01-01"), returnDate: new Date("2024-12-01") },
    { id: 5, game: { id: 5, title: 'Juego 5', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, customer: { id: 5, name: 'Cliente 5'}, loanDate: new Date("2024-01-01"), returnDate: new Date("2024-12-01") }
]