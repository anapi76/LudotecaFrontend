import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Game } from '../../model/Game';

@Component({
  selector: 'app-game-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss'
})
export class GameItemComponent {
  @Input() game: Game;
}
