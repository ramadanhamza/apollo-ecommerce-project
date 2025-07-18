import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/components/app.layout';
import { Notfound } from '@/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'ecommerce' },
            {
                path: 'ecommerce',
                loadChildren: () =>
                    import('@/pages/ecommerce/ecommerce.routes'),
                data: { breadcrumb: 'E-Commerce' },
            }
        ],
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' },
];
