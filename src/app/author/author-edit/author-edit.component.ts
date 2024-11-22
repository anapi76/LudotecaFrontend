import { Component, Inject, OnInit } from '@angular/core';
import { Author } from '../model/Author';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorService } from '../author.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-author-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './author-edit.component.html',
  styleUrl: './author-edit.component.scss'
})
export class AuthorEditComponent implements OnInit {

  author: Author;

  constructor(
    public dialogRef: MatDialogRef<AuthorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.author = this.data.author ? Object.assign({}, this.data.author) : new Author();
  }

  onSave(){
    this.authorService.saveAuthor(this.author).subscribe(()=>{
      this.dialogRef.close();
    })
  }

  onClose(){
    this.dialogRef.close();
  }

}
