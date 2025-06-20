import { Routes } from '@angular/router';
import { UserList } from './userlist';

export default [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', data: { breadcrumb: 'List' }, component: UserList }
] as Routes;
