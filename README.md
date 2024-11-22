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
- models: Category.ts, mock-categories.ts

## View Authors

- author-list: Displays a paginated list of all authors, with buttons to update and delete an author, and button to add a new author.
- author-edit: Modal for adding or editing an author.
- models: Author.ts, mock-authors.ts

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
