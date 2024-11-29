import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Game } from '../model/Game';
import { Author } from '../../author/model/Author';
import { Category } from '../../category/model/Category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../game.service';
import { CategoryService } from '../../category/category.service';
import { AuthorService } from '../../author/author.service';

@Component({
  selector: 'app-game-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule],
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.scss'
})
export class GameEditComponent implements OnInit {
  game: Game;
  authors: Author[];
  categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<GameEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameService: GameService,
    private categoryService: CategoryService,
    private authorService: AuthorService) {

  }
  ngOnInit(): void {
    this.game = this.data.game ? Object.assign({}, this.data.game) : new Game();

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;

      if (this.game.category != null) {
        const categoryFilter: Category[] = categories.filter((category) => category.id == this.data.game.category.id);
        if (categoryFilter.length > 0) {
          this.game.category = categoryFilter[0];
        }
      }
    })

    this.authorService.getAllAuthors().subscribe((authors) => {
      this.authors = authors;

      if (this.game.author != null) {
        const authorFilter: Author[] = authors.filter(
          (author) => author.id == this.data.game.author.id
        );
        if (authorFilter.length>0) {
          this.game.author = authorFilter[0];
        }
      }
    });
  }

  onSave() {
    this.gameService.saveGame(this.game).subscribe((result) => {
      this.dialogRef.close();
  });
  }

  onClose() {
    this.dialogRef.close();

  }

}
