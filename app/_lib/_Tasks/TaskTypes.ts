export interface Tab {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  text: string;
  done: boolean;
  date: Date;
}
