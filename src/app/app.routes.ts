import { Routes } from '@angular/router';
import { Cv } from './components/cv/cv';
import { Layout } from './components/layout/layout';
import { CounterComponent } from './components/counter/counter';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Cv,
      },
      {
        path: 'cv',
        component: Cv,
      },
      {
        path: 'counter',
        component: CounterComponent,
      },
    ],
  },
];
