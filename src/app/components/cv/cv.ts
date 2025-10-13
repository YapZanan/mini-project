import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../services/profile';
import { ProfileModel, TodoItem } from '../../utils/profile.model';
import { CounterComponent } from '../counter/counter';
import { CounterComponent2 } from '../counter2/counter2';
import { LazyImageDirective } from '../../shared/directives/lazy-image.directive';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, FormsModule, CounterComponent, CounterComponent2, LazyImageDirective],
  templateUrl: './cv.html',
  styleUrls: ['./cv.css'],
})
export class Cv {
  [x: string]: any;
  cvData: ProfileModel;

  newTodo = '';
  todos: TodoItem[] = [];
  private nextId = 1;

  constructor(private profileService: Profile) {
    this.cvData = this.profileService.getUser();
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({
        id: this.nextId++,
        text: this.newTodo.trim(),
        completed: false,
      });
      this.newTodo = '';
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  getCompletedCount(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }
}
