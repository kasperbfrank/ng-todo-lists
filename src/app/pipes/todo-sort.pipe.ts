import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/Todo';

@Pipe({
  name: 'todoSort'
})
export class TodoSortPipe implements PipeTransform {
  transform(todos: Todo[]): any {
    return todos
      .sort((a, b) =>
        a.created < b.created ? -1 : a.created > b.created ? 1 : 0
      )
      .sort((a, b) =>
        a.completed && !b.completed ? -1 : !a.completed && b.completed ? 1 : 0
      );
  }
}
