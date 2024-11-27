import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'locacion',
        title: 'Locacion',
        loadComponent: () => import('./pages/locacion/locacion.component')
    },
    {
        path: 'tabla',
        title: 'tabla',
        loadComponent: () => import('./pages/tabla/tabla.component')
    },
    {
        path: 'crear',
        title: 'Crear',
        loadComponent: () => import('./pages/crear/crear.component')
    },
    {
        path: '',
        redirectTo: 'locacion',
        pathMatch: 'full'
    }
];
