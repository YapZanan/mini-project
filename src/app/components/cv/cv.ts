import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Profile } from '../../services/profile';
import { ProfileModel } from '../../utils/profile.model';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv.html',
  styleUrls: ['./cv.css'],
})
export class Cv {
  cvData: ProfileModel;

  constructor(private profileService: Profile) {
    this.cvData = this.profileService.getUser();
  }
}
