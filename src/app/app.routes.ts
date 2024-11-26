import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'locacion',
        title: 'Locacion',
        loadComponent: () => import('./pages/locacion/locacion.component')
    },
    {
        path: '',
        redirectTo: 'locacion',
        pathMatch: 'full'
    }
];
