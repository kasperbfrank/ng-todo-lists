import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterCompletedPipe } from './pipes/filter-completed.pipe';
import { TodoSortPipe } from './pipes/todo-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoListsComponent,
    FilterCompletedPipe,
    TodoSortPipe
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [FilterCompletedPipe, TodoSortPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
