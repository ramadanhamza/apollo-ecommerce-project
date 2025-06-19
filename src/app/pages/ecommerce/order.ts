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
                        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mes commandes</h1>
                        <p class="text-lg text-gray-600 dark:text-gray-300">Suivez vos achats récents</p>
                        <div class="flex items-center gap-4 mt-4">
                            <p-chip label="{{orders.length}} Commandes" styleClass="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"></p-chip>
                            <p-chip
                                [label]="getDeliveryStatusText()"
                                [icon]="getDeliveryStatusIcon()"
                                [styleClass]="getDeliveryStatusClass()">
                            </p-chip>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 lg:w-auto w-full">
                        <p-iconfield class="flex-1 lg:w-80">
                            <p-inputicon class="pi pi-search" />
                            <input
                                type="text"
                                pInputText
                                placeholder="Rechercher des commandes..."
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
                     class="relative">

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
                                        <h3 class="text-xl font-semibold">Commande n°{{order.orderNumber}}</h3>
                                        <p class="text-blue-100">{{order.orderDate}}</p>
                                    </div>
                                </div>

                                <div class="text-right">
                                    <div class="text-2xl font-bold">{{order.amount}}</div>
                                    <div class="text-blue-100">{{order.products.length}} articles</div>
                                    <div class="mt-2">
                                        <p-chip
                                            [label]="getOrderStatusText(order)"
                                            [icon]="getOrderStatusIcon(order)"
                                            [styleClass]="getOrderStatusClass(order)">
                                        </p-chip>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Grille de produits -->
                        <div class="p-6">
                            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                <div *ngFor="let product of order.products"
                                     class="group bg-gray-50 dark:bg-surface-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-surface-600 transition-colors duration-200">

                                    <div class="flex items-start gap-4">
                                        <div class="relative">
                                            <img
                                                [src]="product.image"
                                                [alt]="product.name"
                                                class="w-20 h-20 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200"
                                            />
                                            <div *ngIf="isProductDelivered(product)" class="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                                                <i class="pi pi-check text-xs"></i>
                                            </div>
                                            <div *ngIf="!isProductDelivered(product)" class="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1">
                                                <i class="pi pi-clock text-xs"></i>
                                            </div>
                                        </div>

                                        <div class="flex-1 min-w-0">
                                            <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                                                {{product.name}}
                                            </h4>

                                            <div class="flex flex-wrap gap-1 mb-3">
                                                <span class="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-md font-medium">
                                                    {{product.color}}
                                                </span>
                                                <span class="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md">
                                                    {{product.size}}
                                                </span>
                                            </div>

                                            <div class="flex items-center justify-between mb-2">
                                                <span class="font-bold text-lg text-gray-900 dark:text-white">{{product.price}}</span>
                                                <p-button
                                                    icon="pi pi-shopping-cart"
                                                    label="Acheter à nouveau"
                                                    size="small"
                                                    styleClass="p-button-outlined p-button-sm text-blue-600 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs"
                                                ></p-button>
                                            </div>

                                            <div class="flex items-center gap-2 text-xs" [ngClass]="isProductDelivered(product) ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'">
                                                <i [class]="isProductDelivered(product) ? 'pi pi-check-circle' : 'pi pi-clock'"></i>
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
            orderDate: '7 février 2023',
            amount: '123.00 MAD',
            products: [
                {
                    name: 'Casque audio premium sans fil avec réduction de bruit',
                    color: 'Noir',
                    size: 'Taille unique',
                    price: '50.00 MAD',
                    deliveryDate: 'Livré le 7 fév. 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-1.png'
                },
                {
                    name: 'Tracker d\'activité intelligent avec moniteur de fréquence cardiaque',
                    color: 'Bleu',
                    size: 'Moyen',
                    price: '50.00 MAD',
                    deliveryDate: 'Livré le 7 fév. 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-2.png'
                },
                {
                    name: 'Souris sans fil ergonomique pour gaming',
                    color: 'Rouge',
                    size: 'Standard',
                    price: '23.00 MAD',
                    deliveryDate: 'Livré le 7 fév. 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-3.png'
                }
            ]
        },
        {
            orderNumber: '45126',
            orderDate: '9 février 2023',
            amount: '250.00 MAD',
            products: [
                {
                    name: 'Support pour ordinateur portable professionnel avec ventilateur de refroidissement',
                    color: 'Argent',
                    size: 'Universel',
                    price: '80.00 MAD',
                    deliveryDate: 'Livré le 9 fév. 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-4.png'
                },
                {
                    name: 'Clavier mécanique avec éclairage RGB',
                    color: 'Noir',
                    size: 'Plein format',
                    price: '120.00 MAD',
                    deliveryDate: 'Livré le 9 fév. 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-5.png'
                },
                {
                    name: 'Webcam HD avec mise au point automatique',
                    color: 'Noir',
                    size: '1080p',
                    price: '50.00 MAD',
                    deliveryDate: 'Livré le 9 fév. 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-6.png'
                }
            ]
        },
        {
            orderNumber: '45130',
            orderDate: '5 mars 2023',
            amount: '199.00 MAD',
            products: [
                {
                    name: 'Moniteur Ultra HD 4K',
                    color: 'Noir',
                    size: '27 pouces',
                    price: '199.00 MAD',
                    deliveryDate: 'Prévu pour le 25 juin 2025',
                    image: '/demo/images/ecommerce/order-history/orderhistory-6.png'
                }
            ]
        }
    ];

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
            return 'Livré';
        } else if (deliveredCount === 0) {
            return 'En attente';
        } else {
            return `${deliveredCount}/${totalCount} Livrés`;
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

    // Méthodes pour le statut global de livraison
    getDeliveryStatusText(): string {
        const deliveredOrders = this.orders.filter(order => this.isOrderDelivered(order)).length;
        const totalOrders = this.orders.length;

        if (deliveredOrders === totalOrders) {
            return 'Tous livrés';
        } else if (deliveredOrders === 0) {
            return 'Tous en attente';
        } else {
            return `${deliveredOrders}/${totalOrders} Livrés`;
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
}
