# Tutorial Ludoteca Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

A web application built with Angular version 17.3.11. to manage a ludoteca (board game library), where users can manage games, categories, and authors.

## Git

https://github.com/anapi76/LudotecaFrontend.git

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Added Angular Material

Added [Angular Material](https://material.angular.io/) to this project for UI components and styling.

### Steps followed:
1. Installed Angular Material using `ng add @angular/material`.
2. Selected a prebuilt theme.
3. Configured global typography styles (optional).
4. Enabled animations (optional). 

## Core

Contains essential components and services used across the application.

- header: Global header component for navigation.
- confirmation-dialog: Reusable dialog component for confirmation actions.
- model/page:  Contains essential classes for pagination management.
    - `Pageable`: Represents the pagination details (page number, page size and sort).
    - `SortPage`: Represents the sort details(property and direction).

## View Categories

- category-list: Displays a list of all categories, with buttons to update and delete a category, and button to add a new category.
- category-edit: Modal for adding or editing a category.
- models: Category.ts

## View Authors

- author-list: Displays a paginated list of all authors, with buttons to update and delete an author, and button to add a new author.
- author-edit: Modal for adding or editing an author.
- models: Author.ts, AuthorPage.ts.

## View Games

- game-list: Display a list of all games, with posibility to filter by title and category. Also, there is a button to add a new game
- game-edit: Modal for adding or editing a game.
- game-item: Card with the details of the game.
- models: Game.ts.

