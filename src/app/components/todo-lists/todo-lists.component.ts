import { Component, ViewChild, ElementRef } from '@angular/core';

import { TodoList } from '../../models/TodoList';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent {
  @ViewChild('todoListInput', { static: false }) input: ElementRef<
    HTMLInputElement
  >;

  todoLists$: Observable<TodoList[]> = this.todoListService.todoLists$;

  constructor(title: Title, private todoListService: TodoListService) {
    title.setTitle('Not Another Todo App');
  }

  createList(title: string): void {
    if (!title) {
      return;
    }
    this.todoListService.create(title);
    this.input.nativeElement.value = '';
  }

  todosLabel(list: TodoList): string {
    const count = list.todos.length;
    const completed = list.todos.filter(t => t.completed).length;
    return count === 0
      ? '0 todos'
      : completed === count
      ? 'All done 🚀'
      : `${count - completed} todos to do`;
  }
}
