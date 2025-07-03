import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        TagModule,
        IconFieldModule,
        InputIconModule,
        ChipModule,
        BadgeModule,
        AvatarModule,
        CardModule
    ],
    template: `
        <div class="p-6 bg-gradient-to-br from-blue-50 dark:from-surface-900 dark:to-surface-800 min-h-screen">
            <!-- En-tête -->
            <div class="mb-8">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mes dossiers</h1>
                        <p class="text-lg text-gray-600 dark:text-gray-300">Suivez vos dossiers de financement</p>
                        <div class="gap-4 mt-4">
                            <p-chip label="{{orders.length}} Dossiers" styleClass="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"></p-chip>
                            <div>
                                <p-chip
                                    label="Acceptés 1/4"
                                    icon="pi pi-check"
                                    class="border text-sm m-1">
                                </p-chip>
                                <p-chip
                                    label="Rejetés 1/4"
                                    icon="pi pi-times"
                                    class="border text-sm m-1">
                                </p-chip>
                                <p-chip
                                    label="En attente de signature 1/4"
                                    icon="pi pi-clock"
                                    class="border text-sm m-1">
                                </p-chip>
                                <p-chip
                                    label="En attente d'acceptation 1/4"
                                    icon="pi pi-clock"
                                    class="border text-sm m-1">
                                </p-chip>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4 lg:w-auto w-full">
                        <p-iconfield class="flex-1 lg:w-80">
                            <p-inputicon class="pi pi-search" />
                            <input
                                type="text"
                                pInputText
                                placeholder="Rechercher des dossiers..."
                                class="w-full bg-white dark:bg-surface-700 border-gray-200 dark:border-surface-600 rounded-xl"
                            />
                        </p-iconfield>
                        <p-button
                            icon="pi pi-filter"
                            label="Filtrer"
                            styleClass="p-button-outlined border-gray-300 text-gray-700 dark:border-surface-600 dark:text-surface-200 rounded-xl"
                        ></p-button>
                    </div>
                </div>
            </div>

            <!-- Chronologie des commandes -->
            <div class="space-y-8">
                <div *ngFor="let order of orders; let orderIndex = index"
                      (click)="goToPromesse(order.products[0].name)"
                     class="relative hover:cursor-pointer">

                    <!-- Ligne de chronologie (sauf pour le dernier élément) -->
                    <div *ngIf="orderIndex !== orders.length - 1"
                         class="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-blue-200 to-gray-200 dark:from-blue-800 dark:to-surface-600 z-0">
                    </div>

                    <!-- Carte de commande -->
                    <div class="relative bg-white dark:bg-surface-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">

                        <!-- En-tête de commande -->
                        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div class="flex items-center gap-4">
                                    <div class="bg-white/20 rounded-lg p-3">
                                        <i class="pi pi-receipt text-2xl"></i>
                                    </div>
                                    <div>   
                                        <h3 class="text-xl font-semibold">Dossier n°{{order.orderNumber}}</h3>
                                        <p class="text-blue-100">{{order.orderDate}}</p>
                                    </div>
                                </div>

                                <div class="flex items-center space-x-2">
                                    <div class="text-2xl font-bold">{{order.amount}}</div>
                                    <p-button
                                        [label]="order.products[0].statut"
                                        [icon]="order.products[0].statutIcon"
                                        [severity]="getChipSeverity(order)">
                                    </p-button>
                                </div>
                            </div>
                        </div>

                        <!-- Grille de produits -->
                        <div class="p-6">
                            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                <div *ngFor="let product of order.products"
                                    class="group bg-gray-50 dark:bg-surface-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-surface-600 transition-colors duration-200">

                                    <div class="flex items-center gap-4">
                                        <div class="relative">
                                            <img
                                                [src]="product.image"
                                                [alt]="product.name"
                                                class="w-20 h-20 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200"
                                            />
                                            <div *ngIf="product.statut == 'Accepté' || product.statut == 'En attente de signature'" class="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 flex items-center">
                                                <i class="pi pi-check text-xs"></i>
                                            </div>
                                            <div *ngIf="product.statut == 'En attente dacceptation'" class="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1 flex items-center">
                                                <i class="pi pi-clock text-xs"></i>
                                            </div>
                                            <div *ngIf="product.statut == 'Rejeté'" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 flex items-center">
                                                <i class="pi pi-times text-xs"></i>
                                            </div>
                                        </div>

                                        <div class="flex-1 min-w-0">
                                            <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                                                {{product.name}}
                                            </h4>

                                            <div *ngIf="product.statut == 'Accepté' || product.statut == 'En attente de signature'" class="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                <i class="pi pi-check-circle"></i>
                                                <span>{{product.deliveryDate}}</span>
                                            </div>
                                            <div *ngIf="product.statut == 'En attente dacceptation'" class="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                                <i class="pi pi-clock"></i>
                                                <span>{{product.deliveryDate}}</span>
                                            </div>
                                            <div *ngIf="product.statut == 'Rejeté'" class="flex items-center gap-2 text-red-600 dark:text-red-400">
                                                <i class="pi pi-times-circle"></i>
                                                <span>{{product.deliveryDate}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- État vide (si aucune commande) -->
            <div *ngIf="orders.length === 0" class="text-center py-16">
                <div class="bg-white dark:bg-surface-800 rounded-2xl p-12 max-w-md mx-auto">
                    <div class="w-24 h-24 bg-gray-100 dark:bg-surface-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <i class="pi pi-shopping-bag text-4xl text-gray-400"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucune commande pour l'instant</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-6">Commencez vos achats pour voir vos commandes ici</p>
                    <p-button label="Commencer les achats" icon="pi pi-arrow-right" styleClass="bg-blue-500 hover:bg-blue-600"></p-button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        :host ::ng-deep .p-chip {
            border-radius: 9999px;
        }

        :host ::ng-deep .p-button {
            border-radius: 0.75rem;
        }

        :host ::ng-deep .p-inputtext {
            border-radius: 0.75rem;
        }
    `]
})
export class Order {
    orders = [
        {
            orderNumber: '45123',
            orderDate: '7 février 2025',
            amount: '2499 MAD',
            products: [
                {
                    name: 'ELEXIA TV LED 43EAFD-C24 43 SMART',
                    statut: 'Accepté',
                    statutIcon: 'pi pi-check',
                    statutColor: 'success',
                    price: '2499 MAD',
                    deliveryDate: 'Accepté le 7 fév. 2025',
                    image: 'https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/5/0/50eaud-d24-50ka1-1.jpg'
                }
            ]
        },
                {
            orderNumber: '45126',
            orderDate: '9 février 2025',
            amount: '14299 MAD',
            products: [
                {
                    name: 'Apple MacBook Air 13 (M4)',
                    statut: 'Rejeté',
                    statutIcon: 'pi pi-times',
                    statutColor: 'danger',
                    price: '14299 MAD',
                    deliveryDate: 'Rejeté le 9 fév. 2025',
                    image: 'https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3081764-cb-38350_1.png'
                }
            ]
        },
        {
            orderNumber: '45130',
            orderDate: '5 mars 2025',
            amount: '3999 MAD',
            products: [
                {
                    name: 'BEKO SBS GN156320XP NF 564L INOX',
                    statut: 'En attente dacceptation',
                    statutIcon: 'pi pi-clock',
                    statutColor: 'warn',
                    price: '3999 MAD',
                    deliveryDate: '-',
                    image: 'https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3077679-cb-36841_1.png'
                }
            ]
        },
                {
            orderNumber: '45131',
            orderDate: '7 Juillet 2025',
            amount: '7000 MAD',
            products: [
                {
                    name: '2x BOSCH TC SERIE 8 PRS9A6B70 90CM NOIR',
                    statut: 'En attente de signature',
                    statutIcon: 'pi pi-clock',
                    statutColor: 'warn',
                    price: '10590 MAD',
                    deliveryDate: 'Accepté le 7 fév. 2025',
                    image: 'https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3037333-cb-22408_1.png'
                }
            ]
        }
    ];

    constructor(private router: Router) {}

    getChipSeverity(order: any): 'success' | 'danger' | 'warn' | 'info' | 'help' | 'primary' | 'secondary' | 'contrast' | undefined {
        const color = order.products[0].statutColor;
        const allowedSeverities = ['success', 'danger', 'warn', 'info', 'help', 'primary', 'secondary', 'contrast'];
        return allowedSeverities.includes(color) ? color as any : undefined;
    }


    // Vérifie si un produit est livré
    isProductDelivered(product: any): boolean {
        return product.deliveryDate.toLowerCase().includes('livré');
    }

    // Vérifie si une commande est entièrement livrée
    isOrderDelivered(order: any): boolean {
        return order.products.every((product: any) => this.isProductDelivered(product));
    }

    // Obtient le statut de livraison pour les commandes individuelles
    getOrderStatusText(order: any): string {
        const deliveredCount = order.products.filter((product: any) => this.isProductDelivered(product)).length;
        const totalCount = order.products.length;

        if (deliveredCount === totalCount) {
            return 'Accepté';
        } else if (deliveredCount === 0) {
            return 'Rejeté';
        } else {
            return 'En attente';
        }
    }

    getOrderStatusIcon(order: any): string {
        const deliveredCount = order.products.filter((product: any) => this.isProductDelivered(product)).length;
        const totalCount = order.products.length;

        if (deliveredCount === totalCount) {
            return 'pi pi-check';
        } else if (deliveredCount === 0) {
            return 'pi pi-clock';
        } else {
            return 'pi pi-info-circle';
        }
    }

    getOrderStatusClass(order: any): string {
        const deliveredCount = order.products.filter((product: any) => this.isProductDelivered(product)).length;
        const totalCount = order.products.length;

        if (deliveredCount === totalCount) {
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        } else if (deliveredCount === 0) {
            return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
        } else {
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        }
    }

    getDeliveryStatusIcon(): string {
        const deliveredOrders = this.orders.filter(order => this.isOrderDelivered(order)).length;
        const totalOrders = this.orders.length;

        if (deliveredOrders === totalOrders) {
            return 'pi pi-check';
        } else if (deliveredOrders === 0) {
            return 'pi pi-clock';
        } else {
            return 'pi pi-info-circle';
        }
    }

    getDeliveryStatusClass(): string {
        const deliveredOrders = this.orders.filter(order => this.isOrderDelivered(order)).length;
        const totalOrders = this.orders.length;

        if (deliveredOrders === totalOrders) {
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        } else if (deliveredOrders === 0) {
            return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
        } else {
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        }
    }

    goToPromesse(dossierId: string) {
        console.log("test");
        this.router.navigate(['/ecommerce/promesse/' + dossierId]);
        console.log("test");
    }
}
