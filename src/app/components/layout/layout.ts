import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // use RouterOutlet, not RouterModule
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
})
export class Layout {}
