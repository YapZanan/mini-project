import { Injectable } from '@angular/core';
import { NavLink } from '../utils/nav-link.model';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private links: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/cv', label: 'CV' },
  ];

  getLinks(): NavLink[] {
    return this.links;
  }
}
