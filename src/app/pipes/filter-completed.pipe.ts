import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/Todo';

@Pipe({
  name: 'filterCompleted'
})
export class FilterCompletedPipe implements PipeTransform {
  transform(todos: Todo[], showCompleted: boolean): any {
    return showCompleted ? todos : todos.filter(t => !t.completed);
  }
}
