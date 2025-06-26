import { Routes } from '@angular/router';

export default [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'liste-produits'
    },
    {
        path: 'apercu-produit',
        data: { breadcrumb: 'Aperçu du produit' },
        loadComponent: () => import('./productoverview').then((c) => c.ProductOverview)
    },
    {
        path: 'liste-produits',
        data: { breadcrumb: 'Liste des produits' },
        loadComponent: () => import('./productlist').then((c) => c.ProductList)
    },
    {
        path: 'mes-commandes',
        data: { breadcrumb: 'Mes commandes' },
        loadComponent: () => import('./order').then((c) => c.Order)
    },
    {
        path: 'nouveau-produit',
        data: { breadcrumb: 'Nouveau produit' },
        loadComponent: () => import('./newproduct').then((c) => c.NewProduct)
    },
    {
        path: 'panier',
        data: { breadcrumb: 'Panier' },
        loadComponent: () => import('./shoppingcart').then((c) => c.ShoppingCart)
    },
    {
        path: 'paiement',
        data: { breadcrumb: 'Paiement' },
        loadComponent: () => import('./checkoutform').then((c) => c.CheckoutForm)
    },
    {
        path: 'historique-commandes',
        data: { breadcrumb: 'Historique des commandes' },
        loadComponent: () => import('./orderhistory').then((c) => c.OrderHistory)
    },
    {
        path: 'resume-commande',
        data: { breadcrumb: 'Résumé de la commande' },
        loadComponent: () => import('./ordersummary').then((c) => c.OrderSummary)
    }
] as Routes;
