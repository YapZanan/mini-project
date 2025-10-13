import { Routes } from '@angular/router';
import { Cv } from './components/cv/cv';
import { Layout } from './components/layout/layout';
import { CounterComponent } from './components/counter/counter';
import { PokemonList } from './components/pokemon/pokemon-list';
import { PokemonDetails } from './components/pokemon/detail/detail';
import { PokemonGacha } from './components/pokemon/gacha/gacha';
import { Cart } from './components/cart/cart';

import { RegisterComponent } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { authGuard } from './components/guard/auth.guard';
import { canDeactivateGuard } from './components/guard/canDeactivate.guard';

export const routes: Routes = [
  {
    path: 'login',
    canDeactivate: [canDeactivateGuard],
    component: Login,
  },
  {
    path: 'register',
    canDeactivate: [canDeactivateGuard],
    component: RegisterComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
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
      {
        path: 'pokemon',
        component: PokemonList,
      },
      {
        path: 'pokemon/:id',
        component: PokemonDetails,
      },
      {
        path: 'gatcha',
        component: PokemonGacha,
      },
      {
        path: 'cart',
        component: Cart,
      },
    ],
  },
];
