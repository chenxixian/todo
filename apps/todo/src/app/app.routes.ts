import { Routes } from '@angular/router';
import { AccountPageRoutes } from './components/pages/account-page/account-page.routes';
import { AdminPageRoutes } from './components/pages/admin-page/admin-page.routes';
import { HomePageRoutes } from './components/pages/home-page/home-page.routes';
import { ThemesPageRoutes } from './components/pages/themes-page/themes-page.routes';
import { ProjectsPageRoutes } from './components/pages/projects-page/projects-page.routes';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './components/pages/home-page/home-page.module#HomePageModule',
    data: HomePageRoutes[0].data
  },
  {
    path: 'projects',
    loadChildren: './components/pages/projects-page/projects-page.module#ProjectsPageModule',
    data: ProjectsPageRoutes[0].data
  },
  {
    path: 'themes',
    loadChildren: './components/pages/themes-page/themes-page.module#ThemesPageModule',
    data: ThemesPageRoutes[0].data
  },
  {
    path: 'account',
    loadChildren: './components/pages/account-page/account-page.module#AccountPageModule',
    canActivate: AccountPageRoutes[0].canActivate,
    data: AccountPageRoutes[0].data
  },
  {
    path: 'admin',
    loadChildren: './components/pages/admin-page/admin-page.module#AdminPageModule',
    canActivate: AdminPageRoutes[0].canActivate,
    data: AdminPageRoutes[0].data
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
