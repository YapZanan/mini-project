import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../services/profile';
import { ProfileModel, TodoItem } from '../../utils/profile.model';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cv.html',
  styleUrls: ['./cv.css'],
})
export class Cv {
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
