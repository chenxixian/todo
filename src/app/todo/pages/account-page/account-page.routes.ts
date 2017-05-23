import { Routes } from '@angular/router';
import { AccountPageComponent, translate } from 'rucken';
import { TodoProfileFrameRoutes } from './profile-frame/profile-frame.routes';

const children = [
  {
    path: 'profile',
    data: TodoProfileFrameRoutes[0].data,
    loadChildren: './profile-frame/profile-frame.module#TodoProfileFrameModule'
  }
];
export const TodoAccountPageRoutes: Routes = [
  { path: '', redirectTo: '/account/profile', pathMatch: 'full' },
  {
    path: '',
    component: AccountPageComponent,
    data: {
      name: 'account',
      title: translate('Account'),
      visible: true,
      children: children
    },
    children: children
  }
];
