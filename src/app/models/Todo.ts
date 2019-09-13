export interface ITodo {
  title: string;
  completed: boolean;
  created: Date;
}

export class Todo implements ITodo {
  public static create(title: string): Todo {
    return new Todo(title, false, new Date());
  }

  public static fromObject(todo: ITodo): Todo {
    return new Todo(todo.title, todo.completed, todo.created);
  }

  protected constructor(
    public readonly title: string,
    public readonly completed: boolean,
    public readonly created: Date
  ) {}

  toggleCompleted(): Todo {
    return new Todo(this.title, !this.completed, this.created);
  }
}
