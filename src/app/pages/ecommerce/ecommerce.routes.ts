import { Routes } from '@angular/router';

export default [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product-list'
    },
    {
        path: 'product-overview',
        data: { breadcrumb: 'Aperçu du produit' },
        loadComponent: () => import('./productoverview').then((c) => c.ProductOverview)
    },
    {
        path: 'product-list',
        data: { breadcrumb: 'Liste des produits' },
        loadComponent: () => import('./productlist').then((c) => c.ProductList)
    },
    {
        path: 'orders',
        data: { breadcrumb: 'Mes commandes' },
        loadComponent: () => import('./order').then((c) => c.Order)
    },
    {
        path: 'new-product',
        data: { breadcrumb: 'Nouveau produit' },
        loadComponent: () => import('./newproduct').then((c) => c.NewProduct)
    },
    {
        path: 'shopping-cart',
        data: { breadcrumb: 'Panier' },
        loadComponent: () => import('./shoppingcart').then((c) => c.ShoppingCart)
    },
    {
        path: 'checkout-form',
        data: { breadcrumb: 'Paiement' },
        loadComponent: () => import('./checkoutform').then((c) => c.CheckoutForm)
    },
    {
        path: 'order-history',
        data: { breadcrumb: 'Historique des commandes' },
        loadComponent: () => import('./orderhistory').then((c) => c.OrderHistory)
    },
    {
        path: 'order-summary',
        data: { breadcrumb: 'Résumé de la commande' },
        loadComponent: () => import('./ordersummary').then((c) => c.OrderSummary)
    }
] as Routes;
