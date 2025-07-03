import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { TabsModule } from 'primeng/tabs';
import { PaginatorModule } from 'primeng/paginator';
import { ProductService } from "@/pages/service/product.service";
import {Product} from '@/types/product';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-product-list',
    imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule, RippleModule, TabsModule, PaginatorModule],
    template: `
        <div class="card">
            <div class="text-surface-900 dark:text-surface-0 font-medium text-4xl mb-6">Liste des produits</div>
            <div class="grid grid-cols-12 gap-4 -mt-4 -ml-4 -mr-4">
                <div class="col-span-12 md:col-span-6 lg:col-span-4" *ngFor="let product of paginatedProducts">
                    <div class="p-2">
                        <div class="shadow p-6 bg-surface-0 dark:bg-surface-900 rounded h-[550px] flex flex-col">
                            <div class="relative mb-4">
                                <span
                                    class="bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-surface-0 shadow px-4 py-2 absolute rounded-3xl"
                                    style="left: 1rem; top: 1rem"
                                >
                                    {{ product.category }}
                                </span>
                                <img [src]="product.image" [alt]="product.name" style="width: 100%; height: 300px; object-fit: contain; background: #fff; border-radius: 8px;" />
                            </div>
                            <div class="flex-1 flex flex-col justify-between">
                                <div>
                                    <div class="flex justify-between items-center mb-2 mt-2">
                                        <span class="text-surface-900 dark:text-surface-0 font-medium text-xl block truncate max-h-12">{{ product.name }}</span>
                                <span>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                            <span class="font-medium">{{ product.rating }}</span>
                                </span>
                            </div>
                                    <p class="mt-0 mb-2 text-surface-700 dark:text-surface-100 leading-normal text-sm overflow-hidden" style="max-height: 40px;">{{ product.description }}</p>
                                    <span class="text-primary text-xl font-medium block mb-1">{{ product.price }} MAD</span>
        </div>
                        <button
                            (click)="goToProductCart(product.id)"
                            type="button"
                            pRipple
                                    class="border border-primary rounded py-2 px-4 bg-primary text-white inline-flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 cursor-pointer w-full"
                        >
                                    <i class="pi pi-shopping-cart mr-2 text-base"></i>
                                    <span class="text-base">Voir produit</span>
                        </button>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-8">
                <p-paginator
                    [rows]="rowsPerPage"
                    [totalRecords]="products.length"
                    [first]="currentPage * rowsPerPage"
                    (onPageChange)="onPageChange($event)"
                ></p-paginator>
            </div>
        </div>
    `
})
export class ProductList implements OnInit {
    products!: Product[];
    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.productService.findAllProducts().subscribe(
            (p) => {
                this.products = p;
                console.log(p);
            }, (error) => {
                console.error('Erreur lors de la récupération des produits :', error);
            }
        );
    }
    currentPage: number = 0;
    rowsPerPage: number = 6;

    get paginatedProducts() {
        const start = this.currentPage * this.rowsPerPage;
        return this.products.slice(start, start + this.rowsPerPage);
    }

    onPageChange(event: any) {
        this.currentPage = event.page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    goToProductCart(productId: string) {
        this.router.navigate(['/ecommerce/apercu-produit/' + productId]);
    }
}
