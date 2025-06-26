import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li
                app-menuitem
                *ngIf="!item.separator"
                [item]="item"
                [index]="i"
                [root]="true"
            ></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `,
})
export class AppMenu {
    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'E-Commerce', // (Peut rester en anglais ou être traduit par "Commerce électronique")
                icon: 'pi pi-fw pi-wallet',
                items: [
                    {
                        label: 'Liste des produits',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['ecommerce/product-list'],
                    },
                    {
                        label: 'Aperçu du produit',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['ecommerce/product-overview'],
                    },
                    {
                        label: 'Mes commandes',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['ecommerce/orders'],
                    },
                    {
                        label: 'Nouveau produit',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['ecommerce/new-product'],
                    },
                    {
                        label: 'Panier',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['ecommerce/shopping-cart'],
                    },
                    {
                        label: 'Formulaire de paiement',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['ecommerce/checkout-form'],
                    },
                    {
                        label: 'Récapitulatif de commande',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['ecommerce/order-summary'],
                    },
                ],
            }
        ];
    }
}
