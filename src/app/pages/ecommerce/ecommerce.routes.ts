import { Routes } from '@angular/router';

export default [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'liste-produits'
    },
    {
        path: 'sommaire-produit/:id',
        data: { breadcrumb: 'Sommaire du produit' },
        title: 'Sommaire du produit',
        loadComponent: () => import('./productsummary').then((c) => c.ProductSummary)
    },
    {
        path: 'apercu-produit/:id',
        data: { breadcrumb: 'Aperçu du produit' },
        title: 'Aperçu du produit',
        loadComponent: () => import('./productoverview').then((c) => c.ProductOverview)
    },
    {
        path: 'liste-produits',
        data: { breadcrumb: 'Liste des produits' },
        title: 'Liste des produits',
        loadComponent: () => import('./productlist').then((c) => c.ProductList)
    },
    {
        path: 'mes-dossiers',
        data: { breadcrumb: 'Mes dossiers' },
        title: 'Mes dossiers',
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
        title: 'Paiement',
        loadComponent: () => import('./checkoutform').then((c) => c.CheckoutForm)
    },
    {
        path: 'historique-commandes',
        data: { breadcrumb: 'Historique des commandes' },
        loadComponent: () => import('./orderhistory').then((c) => c.OrderHistory)
    },
        {
        path: 'promesse/:id',
        data: { breadcrumb: 'Promesse' },
        loadComponent: () => import('./promesse').then((c) => c.Promesse)
    },
    {
        path: 'resume-commande',
        data: { breadcrumb: 'Résumé de la commande' },
        loadComponent: () => import('./ordersummary').then((c) => c.OrderSummary)
    }
] as Routes;
