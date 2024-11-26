import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { AuthorPage } from './model/AuthorPage';
import { Author } from './model/Author';
import { HttpClient } from '@angular/common/http';
//import { AUTHOR_DATA_LIST } from './model/mock-authors-list';
//import { AUTHOR_DATA } from './model/mock-authors';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/author';

  getAuthors(pageable: Pageable): Observable<AuthorPage> {
    return this.http.post<AuthorPage>(this.baseUrl, { pageable: pageable });
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }

  saveAuthor(author: Author): Observable<Author> {
    const { id } = author;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Author>(url, author);
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
  }
}