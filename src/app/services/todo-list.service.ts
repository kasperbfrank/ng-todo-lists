import { Injectable } from '@angular/core';
import { TodoList } from '../models/TodoList';
import { Todo } from '../models/Todo';
import { Subject, Observable } from 'rxjs';
import { scan, shareReplay, map, take } from 'rxjs/operators';

interface TodoListState {
  [id: number]: TodoList;
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
