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
                label: 'Commerce électronique',
                icon: 'pi pi-fw pi-wallet',
                items: [
                    {
                        label: 'Liste des produits',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['ecommerce/liste-produits'],
                    },
                    // {
                    //     label: 'Aperçu du produit',
                    //     icon: 'pi pi-fw pi-image',
                    //     routerLink: ['ecommerce/apercu-produit'],
                    // },
                    {
                        label: 'Mes dossiers',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['ecommerce/mes-dossiers'],
                    },
                    // {
                    //     label: 'Nouveau produit',
                    //     icon: 'pi pi-fw pi-plus',
                    //     routerLink: ['ecommerce/nouveau-produit'],
                    // },
                    // {
                    //     label: 'Panier',
                    //     icon: 'pi pi-fw pi-shopping-cart',
                    //     routerLink: ['ecommerce/panier'],
                    // },
                    // {
                    //     label: 'Paiement',
                    //     icon: 'pi pi-fw pi-check-square',
                    //     routerLink: ['ecommerce/paiement'],
                    // },
                    // {
                    //     label: 'Résumé de la commande',
                    //     icon: 'pi pi-fw pi-file',
                    //     routerLink: ['ecommerce/resume-commande'],
                    // },
                ],
            }
        ];
    }
}
