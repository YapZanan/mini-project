import { Injectable } from '@angular/core';
import { ProfileModel } from '../utils/profile.model';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  private profile: ProfileModel = {
    name: 'Donny Maxmillian',
    description: 'I am a Frontend Developer who loves Angular and interested in Web Development.',
    age: 23,
    phone: '+12-3456-7890',
    email: 'test@example.com',
    address: '123 Main Street, City, Country',
    image: 's-l1200.jpg',
    techStack: ['Angular', 'TypeScript', 'HTML', 'CSS'],
  };

  getUser(): ProfileModel {
    return this.profile;
  }
}
