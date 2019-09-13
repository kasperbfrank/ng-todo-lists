import { Injectable } from '@angular/core';
import { TodoList, ITodoList } from '../models/TodoList';
import { Todo } from '../models/Todo';
import { Subject, Observable, MonoTypeOperatorFunction } from 'rxjs';
import {
  scan,
  shareReplay,
  map,
  take,
  tap,
  startWith,
  skipWhile
} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

interface TodoListState {
  [id: number]: TodoList;
}

const TODO_STATE_KEY = 'TODO_STATE';

function persist(): MonoTypeOperatorFunction<TodoListState> {
  return state$ =>
    state$.pipe(
      tap(state => localStorage.setItem(TODO_STATE_KEY, JSON.stringify(state)))
    );
}

function initialize(): MonoTypeOperatorFunction<TodoListState> {
  const persisted = JSON.parse(localStorage.getItem(TODO_STATE_KEY)) as {
    [id: number]: ITodoList;
  };
  const state =
    persisted &&
    Object.values(persisted)
      .map(TodoList.fromObject)
      .reduce((acc, list) => ({ ...acc, [list.id]: list }), {});

  return state$ => state$.pipe(startWith(state));
}

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoListSub = new Subject<TodoList>();
  private todoListsState$ = this.todoListSub.pipe(
    scan<TodoList, TodoListState>(
      (acc, next) => ({ ...acc, [next.id]: next }),
      {}
    ),
    persist(),
    initialize(),
    skipWhile(isNullOrUndefined),
    shareReplay(1)
  );

  get todoLists$(): Observable<TodoList[]> {
    return this.todoListsState$.pipe(map(Object.values));
  }

  get(id: number): Observable<TodoList> {
    return this.todoListsState$.pipe(map(state => state[id]));
  }

  create(title: string): void {
    this.todoListSub.next(TodoList.create(title));
  }

  async setTodos(listId: number, todos: Todo[]): Promise<void> {
    const list = await this.get(listId)
      .pipe(take(1))
      .toPromise();
    this.todoListSub.next(list.setTodos(todos));
  }

  async addTodo(listId: number, todo: Todo): Promise<void> {
    const list = await this.get(listId)
      .pipe(take(1))
      .toPromise();
    this.todoListSub.next(list.addTodo(todo));
  }

  async updateTodo(listId: number, todo: Todo): Promise<void> {
    const list = await this.get(listId)
      .pipe(take(1))
      .toPromise();
    this.todoListSub.next(list.updateTodo(todo));
  }
}
