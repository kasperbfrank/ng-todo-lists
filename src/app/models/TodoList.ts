import { Todo } from './Todo';
import { immutableSplice } from 'src/utils/array';

let n = 1;

export class TodoList {
  public static create(title: string): TodoList {
    return new TodoList(n++, title, []);
  }

  protected constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly todos: Todo[]
  ) {}

  setTodos(todos: Todo[]): TodoList {
    return new TodoList(this.id, this.title, todos);
  }

  addTodo(todo: Todo): TodoList {
    return this.setTodos([...this.todos, todo]);
  }

  updateTodo(todo: Todo): TodoList {
    return this.setTodos(
      immutableSplice(
        this.todos,
        this.todos.findIndex(t => t.created === todo.created),
        1,
        todo
      )
    );
  }
}
