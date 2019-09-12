import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  {
    path: 'todolists',
    component: TodoListsComponent
  },
  {
    path: 'todolists/:id',
    component: TodoListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todolists'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
