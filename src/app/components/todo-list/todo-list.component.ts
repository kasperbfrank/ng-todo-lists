import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Todo } from 'src/app/models/Todo';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @ViewChild('todoInput', { static: false }) todoInput: ElementRef<
    HTMLInputElement
  >;

  showCompleted =
    this.route.snapshot.queryParamMap.get('showCompleted') || false;

  public readonly todos$: Observable<Todo[]> = this.route.paramMap.pipe(
    map(params => params.get('id')),
    switchMap(id => this.todoListService.get(+id)),
    tap(list => this.title.setTitle(list.title)),
    map(list => list.todos)
  );

  get listId(): number {
    return +this.route.snapshot.paramMap.get('id');
  }

  constructor(
    private todoListService: TodoListService,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  addTodo(title: string): void {
    if (!title) {
      return;
    }
    this.todoListService.addTodo(this.listId, Todo.create(title));
    this.todoInput.nativeElement.value = '';
  }

  updateTodo(todo: Todo) {
    this.todoListService.updateTodo(this.listId, todo);
  }
}
