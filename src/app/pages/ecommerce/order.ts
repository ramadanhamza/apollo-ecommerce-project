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
            <!-- Header Section -->
            <div class="mb-8">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">My orders</h1>
                        <p class="text-lg text-gray-600 dark:text-gray-300">Track and manage your recent purchases</p>
                        <div class="flex items-center gap-4 mt-4">
                            <p-chip label="{{orders.length}} Orders" styleClass="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"></p-chip>
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
                                placeholder="Search orders..."
                                class="w-full bg-white dark:bg-surface-700 border-gray-200 dark:border-surface-600 rounded-xl"
                            />
                        </p-iconfield>
                        <p-button
                            icon="pi pi-filter"
                            label="Filter"
                            styleClass="p-button-outlined border-gray-300 text-gray-700 dark:border-surface-600 dark:text-surface-200 rounded-xl"
                        ></p-button>
                    </div>
                </div>
            </div>

            <!-- Orders Timeline -->
            <div class="space-y-8">
                <div *ngFor="let order of orders; let orderIndex = index"
                     class="relative">

                    <!-- Timeline Line (except for last item) -->
                    <div *ngIf="orderIndex !== orders.length - 1"
                         class="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-blue-200 to-gray-200 dark:from-blue-800 dark:to-surface-600 z-0">
                    </div>

                    <!-- Order Card -->
                    <div class="relative bg-white dark:bg-surface-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">

                        <!-- Order Header -->
                        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div class="flex items-center gap-4">
                                    <div class="bg-white/20 rounded-lg p-3">
                                        <i class="pi pi-receipt text-2xl"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-semibold">Order #{{order.orderNumber}}</h3>
                                        <p class="text-blue-100">{{order.orderDate}}</p>
                                    </div>
                                </div>

                                <div class="text-right">
                                    <div class="text-2xl font-bold">{{order.amount}}</div>
                                    <div class="text-blue-100">{{order.products.length}} items</div>
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

                        <!-- Products Grid -->
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
                                                    label="Buy Again"
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

                        <!-- Action Bar -->
                        <div class="border-t border-gray-200 dark:border-surface-600 bg-gray-50 dark:bg-surface-700/50 px-6 py-4">
                            <div class="flex flex-wrap gap-3">
                                <p-button
                                    icon="pi pi-download"
                                    label="Download Invoice"
                                    size="small"
                                    styleClass="p-button-outlined border-gray-300 text-gray-700 dark:border-surface-500 dark:text-surface-200 hover:bg-gray-100 dark:hover:bg-surface-600"
                                ></p-button>

                                <p-button
                                    icon="pi pi-refresh"
                                    label="Return Items"
                                    size="small"
                                    styleClass="p-button-outlined border-orange-300 text-orange-700 dark:border-orange-500 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                                ></p-button>

                                <p-button
                                    icon="pi pi-star"
                                    label="Write Review"
                                    size="small"
                                    styleClass="p-button-outlined border-yellow-300 text-yellow-700 dark:border-yellow-500 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                                ></p-button>

                                <p-button
                                    icon="pi pi-ellipsis-h"
                                    size="small"
                                    styleClass="p-button-text text-gray-500 hover:bg-gray-100 dark:hover:bg-surface-600 ml-auto"
                                ></p-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State (if no orders) -->
            <div *ngIf="orders.length === 0" class="text-center py-16">
                <div class="bg-white dark:bg-surface-800 rounded-2xl p-12 max-w-md mx-auto">
                    <div class="w-24 h-24 bg-gray-100 dark:bg-surface-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <i class="pi pi-shopping-bag text-4xl text-gray-400"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-6">Start shopping to see your orders here</p>
                    <p-button label="Start Shopping" icon="pi pi-arrow-right" styleClass="bg-blue-500 hover:bg-blue-600"></p-button>
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
            orderDate: 'February 7, 2023',
            amount: '$123.00',
            products: [
                {
                    name: 'Premium Wireless Headphones with Noise Cancellation',
                    color: 'Black',
                    size: 'One Size',
                    price: '$50.00',
                    deliveryDate: 'Delivered on Feb 7, 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-1.png'
                },
                {
                    name: 'Smart Fitness Tracker with Heart Rate Monitor',
                    color: 'Blue',
                    size: 'Medium',
                    price: '$50.00',
                    deliveryDate: 'Delivered on Feb 7, 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-2.png'
                },
                {
                    name: 'Ergonomic Wireless Mouse for Gaming',
                    color: 'Red',
                    size: 'Standard',
                    price: '$23.00',
                    deliveryDate: 'Delivered on Feb 7, 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-3.png'
                }
            ]
        },
        {
            orderNumber: '45126',
            orderDate: 'February 9, 2023',
            amount: '$250.00',
            products: [
                {
                    name: 'Professional Laptop Stand with Cooling Fan',
                    color: 'Silver',
                    size: 'Universal',
                    price: '$80.00',
                    deliveryDate: 'Delivered on Feb 9, 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-4.png'
                },
                {
                    name: 'Mechanical Keyboard with RGB Lighting',
                    color: 'Black',
                    size: 'Full Size',
                    price: '$120.00',
                    deliveryDate: 'Delivered on Feb 9, 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-5.png'
                },
                {
                    name: 'HD Webcam with Auto Focus',
                    color: 'Black',
                    size: '1080p',
                    price: '$50.00',
                    deliveryDate: 'Delivered on Feb 9, 2023',
                    image: '/demo/images/ecommerce/order-history/orderhistory-6.png'
                }
            ]
        },
        {
            orderNumber: '45130',
            orderDate: 'March 5, 2023',
            amount: '$199.00',
            products: [
                {
                    name: '4K Ultra HD Monitor',
                    color: 'Black',
                    size: '27-inch',
                    price: '$199.00',
                    deliveryDate: 'Expected by Jun 25, 2025',
                    image: '/demo/images/ecommerce/order-history/orderhistory-6.png'
                }
            ]
        }
    ];

    // Helper method to check if a product is delivered
    isProductDelivered(product: any): boolean {
        return product.deliveryDate.toLowerCase().includes('delivered');
    }

    // Helper method to check if an order is fully delivered
    isOrderDelivered(order: any): boolean {
        return order.products.every((product: any) => this.isProductDelivered(product));
    }

    // Helper method to get delivery status for individual orders
    getOrderStatusText(order: any): string {
        const deliveredCount = order.products.filter((product: any) => this.isProductDelivered(product)).length;
        const totalCount = order.products.length;

        if (deliveredCount === totalCount) {
            return 'Delivered';
        } else if (deliveredCount === 0) {
            return 'Pending';
        } else {
            return `${deliveredCount}/${totalCount} Delivered`;
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

    // Helper methods for overall delivery status
    getDeliveryStatusText(): string {
        const deliveredOrders = this.orders.filter(order => this.isOrderDelivered(order)).length;
        const totalOrders = this.orders.length;

        if (deliveredOrders === totalOrders) {
            return 'All Delivered';
        } else if (deliveredOrders === 0) {
            return 'All Pending';
        } else {
            return `${deliveredOrders}/${totalOrders} Delivered`;
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
