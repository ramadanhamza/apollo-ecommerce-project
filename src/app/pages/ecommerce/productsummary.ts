import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { UploaderComponent } from '../files/uploader/uploader';
import { FinancementService } from '../service/financement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '@/types/product';

@Component({
    selector: 'app-product-summary',
    standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        SelectModule,
        CheckboxModule,
        InputTextModule,
        InputNumberModule,
        InputGroupModule,
        FormsModule,
        FileUploadModule,
        ToastModule,
        StepsModule,
        CommonModule
    ],
    providers: [MessageService],
    template: `
<div class="p-4 md:p-6 bg-white dark:bg-surface-900">

    <h2 class="text-2xl font-bold text-surface-800 dark:text-surface-100">Récapitulatif : {{product.category}} - {{product.name}}</h2>
    <p class="text-surface-500 dark:text-surface-400 mb-6">Détails de l'offre pour {{product.name}}.</p>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">

        <div class="xl:col-span-6 flex flex-col gap-6">
            
            <div class="rounded-lg border border-surface-200 dark:border-surface-700 h-full">
                <div class="p-3 bg-surface-50 dark:bg-surface-800 font-bold rounded-t-lg text-surface-700 dark:text-surface-200 flex items-center">
                    <i class="pi pi-building mr-2"></i>Concessionnaire
                </div>
                <ul class="list-none m-0 p-4 space-y-3 text-sm">
                    <li class="flex justify-between"><span>Raison sociale :</span> <span class="font-semibold">AUTO AMANE; SARL</span></li>
                    <li class="flex justify-between"><span>Adresse :</span> <span class="font-semibold">55 BD CORNICHE</span></li>
                    <li class="flex justify-between"><span>Téléphone :</span> <span class="font-semibold">0522222222</span></li>
                    <li class="flex justify-between"><span>RC :</span> <span class="font-semibold">8656565656</span></li>
                </ul>
            </div>

            <div class="rounded-lg border border-surface-200 dark:border-surface-700 h-full">
                <div class="p-3 bg-surface-50 dark:bg-surface-800 font-bold rounded-t-lg text-surface-700 dark:text-surface-200 flex items-center">
                    <i class="pi pi-file-alt mr-2"></i>Offre
                </div>
                <ul class="list-none m-0 p-4 space-y-3 text-sm">
                    <li class="flex justify-between"><span>Numéro :</span> <span class="font-semibold">54545454</span></li>
                    <li class="flex justify-between"><span>Date :</span> <span class="font-semibold">31/07/2025</span></li>
                </ul>
            </div>

        </div>

        <div class="xl:col-span-6 flex flex-col gap-6">
            
            <div class="rounded-lg border border-surface-200 dark:border-surface-700 h-full">
                <div class="p-3 bg-surface-50 dark:bg-surface-800 font-bold rounded-t-lg text-surface-700 dark:text-surface-200 flex items-center">
                    <i class="pi pi-user mr-2"></i>Client
                </div>
                <ul class="list-none m-0 p-4 space-y-3 text-sm">
                    <li class="flex justify-between"><span>Nom :</span> <span class="font-semibold text-surface-500 dark:text-surface-400">RAMADAN</span></li>
                    <li class="flex justify-between"><span>Prénom :</span> <span class="font-semibold text-surface-500 dark:text-surface-400">HAMZA</span></li>
                </ul>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="rounded-lg border border-surface-200 dark:border-surface-700">
                    <div class="p-3 bg-surface-50 dark:bg-surface-800 font-bold rounded-t-lg text-surface-700 dark:text-surface-200 flex items-center">
                        <i class="pi pi-briefcase mr-2"></i>Vendeur
                    </div>
                    <ul class="list-none m-0 p-4 space-y-3 text-sm">
                        <li class="flex justify-between"><span>Nom :</span> <span class="font-semibold">Commercial</span></li>
                        <li class="flex justify-between"><span>GSM :</span> <span class="font-semibold">0660000000</span></li>
                    </ul>
                </div>
                 <div class="rounded-lg border border-surface-200 dark:border-surface-700">
                    <div class="p-3 bg-surface-50 dark:bg-surface-800 font-bold rounded-t-lg text-surface-700 dark:text-surface-200 flex items-center">
                        <i class="pi pi-globe mr-2"></i>Banque
                    </div>
                    <ul class="list-none m-0 p-4 space-y-3 text-sm">
                        <li class="flex justify-between"><span>Partenaire :</span> <span class="font-semibold">DAR AL AMANE</span></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="xl:col-span-12 rounded-lg border border-surface-200 dark:border-surface-700">
            <div class="p-3 bg-surface-50 dark:bg-surface-800 font-bold rounded-t-lg text-surface-700 dark:text-surface-200 flex items-center">
                <i class="pi pi-tag mr-2"></i>Prix
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                    <thead class="text-xs text-surface-700 uppercase bg-surface-100 dark:bg-surface-700 dark:text-surface-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Désignation</th>
                            <th scope="col" class="px-6 py-3 text-right">Prix HT</th>
                            <th scope="col" class="px-6 py-3 text-center">Remise</th>
                            <th scope="col" class="px-6 py-3 text-center">Taux TVA</th>
                            <th scope="col" class="px-6 py-3 text-right">TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-surface-800 dark:border-surface-700">
                            <td class="px-6 py-4 font-medium text-surface-900 dark:text-white">{{product.name}}</td>
                            <td class="px-6 py-4 text-right">135000</td>
                            <td class="px-6 py-4 text-center">0%</td>
                            <td class="px-6 py-4 text-center">10%</td>
                            <td class="px-6 py-4 text-right font-semibold">148500</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-surface-800 dark:border-surface-700">
                            <td class="px-6 py-4 font-medium text-surface-900 dark:text-white">Pienture métalisée</td>
                            <td class="px-6 py-4 text-right">2000</td>
                            <td class="px-6 py-4 text-center">0%</td>
                            <td class="px-6 py-4 text-center">20%</td>
                            <td class="px-6 py-4 text-right font-semibold">2400</td>
                        </tr>
                        <tr class="bg-white dark:bg-surface-800">
                            <td class="px-6 py-4 font-medium text-surface-900 dark:text-white">Frais immatricluation</td>
                            <td class="px-6 py-4 text-right">3000</td>
                            <td class="px-6 py-4 text-center">0%</td>
                            <td class="px-6 py-4 text-center">20%</td>
                            <td class="px-6 py-4 text-right font-semibold">3600</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="p-4 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 flex justify-end">
                 <div class="w-full md:w-1/3 text-sm">
                    <ul class="list-none p-0 m-0 space-y-2">
                        <li class="flex justify-between">
                           <span>Total HT</span>
                           <span>140000</span>
                        </li>
                        <li class="flex justify-between font-bold text-lg text-surface-900 dark:text-white">
                           <span>TOTAL TTC</span>
                           <span>154500</span>
                        </li>
                    </ul>
                 </div>
            </div>
        </div>
        
        <div class="xl:col-span-12 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 p-4 flex justify-between items-center">
             <span class="font-semibold text-lg text-surface-800 dark:text-surface-100">Dépôt pour réserver un véhicule</span>
             <span class="font-bold text-lg text-primary">1300 MAD</span>
        </div>
        
        <div class="xl:col-span-12 text-center text-sm text-surface-500 dark:text-surface-400">
            Le montant du dépôt sera débité sur votre compte pour réserver votre voiture
        </div>
    </div>
    <div class="flex justify-end">
            <button pButton pRipple label="Choisir voiture" icon="pi pi-check" class="p-button-success" (click)="goToProductOrder(product.id)"></button>
    </div>
</div>
    `
})
export class ProductSummary implements OnInit {

    checkoutData: any; 

    productId: string = "";
    products!: Product[];
    product: Product = {
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        rating: 0
    };

    value: string = '';
    checked: boolean = true;
    uploadedFiles: any[] = [];

    interest: number = 5;
    months: number = 6;
    quantity: number = 1;
    borrowAmount: number = 0;
    calculatedInterest: number = 0;


    constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            this.productId = paramMap.get("id")!;
            this.productService.findAllProducts().subscribe(
                (p) => {
                    this.products = p;
                    this.product = this.products.find(p => p.id == this.productId)!;
                    console.log(p);
                }, (error) => {
                    console.error('Erreur lors de la récupération des produits :', error);
                }
            );
            if (this.productId) {
                this.productService.findById(this.productId).subscribe(product => {
                    if (product) {
                        this.product = product;
                        this.borrowAmount = this.product.price;
                        this.calculatedInterest = (this.interest / 100) * this.borrowAmount;
                    }
                });
            }
        });
    }

    goToProductOrder(productId: string) {
        this.router.navigate(['/ecommerce/apercu-produit/' + productId]);
    }
    
    // calculateLoan(borrowAmount: number, interest: number, months: number): number {
    //     if (borrowAmount <= 0 || months <= 0) return 0;
    //     const monthlyRate = interest / 100 / 12;
    //     const monthlyPayment = (borrowAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    //     return Number(monthlyPayment.toFixed(2));
    // }

    // goBackToProduct() {
    //     this.router.navigate(['/product-overview', this.checkoutData.product.id]);
    // }
}