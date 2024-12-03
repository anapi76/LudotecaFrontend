import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tutorial de Angular';
}
