import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {RippleModule} from 'primeng/ripple';
import {TabsModule} from 'primeng/tabs';
import { ProductService } from '../service/product.service';
import { Product } from '@/types/product';
import {SliderModule} from 'primeng/slider';

@Component({
    selector: 'app-product-overview',
    imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule, RippleModule, TabsModule, SliderModule],
    template: `
        <div class="card">
            <div class="grid grid-cols-12 gap-4 mb-16">
                <div class="col-span-12 lg:col-span-7">
                    <!-- <div class="flex">
                        <div class="flex flex-col w-2/12 justify-between" style="row-gap: 1rem;">
                            <img
                                *ngFor="let image of images; let i = index"
                                [ngClass]="{
                                    'border-primary': selectedImageIndex === i
                                }"
                                src="/demo/images/ecommerce/productoverview/{{ image }}"
                                class="w-full cursor-pointer border-2 border-transparent transition-colors duration-150 border-round"
                                (click)="selectedImageIndex = i"
                            />
                        </div>
                        <div class="pl-4 w-10/12 flex">
                            <img src="/demo/images/ecommerce/productoverview/{{ images[selectedImageIndex] }}" class="w-full border-2 border-transparent rounded" />
                        </div>
                    </div> -->
                    <div class="flex">
                        <div class="flex flex-col w-2/12 justify-between" style="row-gap: 1rem;">
                            <img
                                [src]="product.image"
                                class="w-full cursor-pointer border-2 border-transparent transition-colors duration-150 border-round"
                            />
                        </div>
                        <div class="pl-4 w-10/12 flex">
                            <img [src]="product.image" class="w-full border-2 border-transparent rounded" />
                        </div>
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-4 py-4 lg:pl-12">
                    <div class="flex items-center text-xl font-medium text-surface-900 dark:text-surface-0 mb-6">{{product.name}}</div>
                    <div class="flex flex-wrap items-center justify-between mb-8">
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-3xl block">{{product.price}} MAD</span>
                        <div class="flex items-center">
                            <span class="mr-4 flex-shrink-0">
                                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                <i class="pi pi-star text-surface-600 dark:text-surface-200 mr-1"></i>
                            </span>
                            <span class="text-sm">
                                <b class="text-surface-900 dark:text-surface-0 mr-1">24</b>
                                <span class="text-surface-500 dark:text-surface-300"></span>reviews
                            </span>
                        </div>
                    </div>

                    <div class="font-bold text-surface-900 dark:text-surface-0 mb-4">Description</div>
                    <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                        {{product.description}}
                    </p>

                    <div class="font-bold text-surface-900 dark:text-surface-0 mb-4">Quantité</div>
                        <p-inputNumber
                            [showButtons]="true"
                            buttonLayout="horizontal"
                            [min]="1"
                            inputStyleClass="w-12 text-center py-2 px-1 border-transparent outline-0 shadow-none"
                            styleClass="border border-surface-200 dark:border-surface-700 rounded"
                            [(ngModel)]="quantity"
                            decrementButtonClass="p-button-text text-surface-600 dark:text-surface-200 hover:text-primary py-1 px-1"
                            incrementButtonClass="p-button-text text-surface-600 dark:text-surface-200 hover:text-primary py-1 px-1"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            (ngModelChange)="updateBorrowAmount()"
                        ></p-inputNumber>

                    <div class="border-t border-surface-200 dark:border-surface-700 my-6"></div>

                    <div class="font-bold text-surface-900 dark:text-surface-0 mb-4">Simulez votre paiement</div>

                    <div class="space-y-6 mb-6">
                    <div>
                        <label for="interestRate" class="block text-sm font-semibold text-gray-800 dark:text-white mb-1">Marge bénéficiaire (HT)</label>
                        <input
                        id="interestRate"
                        type="text"
                        class="p-inputtext w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
                        value="{{calculatedInterest | number:'1.2-2'}} MAD"
                        disabled
                        />
                    </div>

                    <div>
                        <label for="borrowAmount" class="block text-sm font-semibold text-gray-800 dark:text-white mb-2">Montant financé</label>
                        <input
                        id="borrowAmount"
                        type="number"
                        pInputText
                        min="0"
                        [max]="product.price * quantity"
                        [(ngModel)]="borrowAmount"
                        [value]="borrowAmount"
                        class="w-full mb-2 rounded-lg p-2 border"
                        (input)="onBorrowAmountChange($event)"
                        />
                        <div class="my-2">
                            <p-slider
                            min="0"
                            [max]="product.price * quantity"
                            [(ngModel)]="borrowAmount"
                            (onChange)="updateInterest()"
                            class="w-full"
                            ></p-slider>
                        </div>
                    </div>

                    <div>
                        <label for="months" class="block text-sm font-semibold text-gray-800 dark:text-white mb-2">Durée (en mois)</label>
                        <input
                        id="months"
                        type="number"
                        pInputText
                        min="6"
                        max="60"
                        [(ngModel)]="months"
                        [value]="months"
                        class="w-full mb-2 rounded-lg p-2 border"
                        (input)="onDurationChange($event)"
                        />
                        <div class="my-2">
                        <p-slider
                        min="6"
                        max="60"
                        [(ngModel)]="months"
                        class="w-full"
                        ></p-slider>
                        </div>
                    </div>
                    </div>

                    <div class="text-center bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 p-3 rounded-lg mb-6">
                        <p class="m-0">Paiement mensuel estimé:</p>
                        <p class="font-bold text-2xl m-0">
                            {{ calculateMonthlyPayment() }} MAD / mois
                        </p>
                    </div>

                    <div class="font-bold text-surface-900 dark:text-surface-0 mb-4">Quantité</div>
                    <div class="flex items-center flex-0 lg:flex-1 gap-4">
                        <button pButton pRipple label="Résumé de la commande" class="flex-shrink-0 w-full" (click)="goToCart()"></button>
                        <i
                            class="pi text-2xl cursor-pointer"
                            [ngClass]="{
                                'pi-heart text-600': !liked,
                                'pi-heart-fill text-orange-500': liked
                            }"
                            (click)="liked = !liked"
                        ></i>
                    </div>
                </div>
            </div>

            <p-tabs value="0">
                <p-tablist>
                    <p-tab value="0">Details</p-tab>
                    <p-tab value="1">Reviews</p-tab>
                </p-tablist>
                <p-tabpanels>
                    <p-tabpanel value="0">
                        <div class="text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">Product Details</div>
                        <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                            Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Duis ultricies lacus sed turpis tincidunt id. Sed tempus urna et pharetra. Metus vulputate eu scelerisque felis imperdiet proin fermentum.
                            Venenatis urna cursus eget nunc scelerisque viverra mauris in. Viverra justo nec ultrices dui sapien eget mi proin. Laoreet suspendisse interdum consectetur libero id faucibus.
                        </p>

                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-4">
                                <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Highlights</span>
                                <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                                    <li class="mb-2">Vulputate sapien nec.</li>
                                    <li class="mb-2">Purus gravida quis blandit.</li>
                                    <li class="mb-2">Nisi quis eleifend quam adipiscing.</li>
                                    <li>Imperdiet proin fermentum.</li>
                                </ul>
                            </div>
                            <div class="col-span-12 lg:col-span-4">
                                <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Size and Fit</span>
                                <ul class="list-none p-0 m-0 text-surface-600 dark:text-surface-200 mb-6">
                                    <li class="mb-4">
                                        <span class="font-semibold">Leo vel:</span>
                                        Egestas congue.
                                    </li>
                                    <li class="mb-4">
                                        <span class="font-semibold">Sociis natoque:</span>
                                        Parturient montes nascetur.
                                    </li>
                                    <li>
                                        <span class="font-semibold">Suspendisse in:</span>
                                        Purus sit amet volutpat.
                                    </li>
                                </ul>
                            </div>
                            <div class="col-span-12 lg:col-span-4">
                                <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Material & Care</span>
                                <ul class="p-0 m-0 flex flex-wrap flex-col xl:flex-row text-surface-600 dark:text-surface-200">
                                    <li class="flex items-center whitespace-nowrap w-40 mr-2 mb-4">
                                        <i class="pi pi-sun mr-2 text-surface-900 dark:text-surface-0"></i>
                                        <span>Not dryer safe</span>
                                    </li>
                                    <li class="flex items-center whitespace-nowrap w-40 mb-4">
                                        <i class="pi pi-times-circle mr-2 text-surface-900 dark:text-surface-0"></i>
                                        <span>No chemical wash</span>
                                    </li>
                                    <li class="flex items-center whitespace-nowrap w-40 mb-4 mr-2">
                                        <i class="pi pi-sliders-h mr-2 text-surface-900 dark:text-surface-0"></i>
                                        <span>Iron medium heat</span>
                                    </li>
                                    <li class="flex items-center whitespace-nowrap w-40 mb-4">
                                        <i class="pi pi-minus-circle mr-2 text-surface-900 dark:text-surface-0"></i>
                                        <span>Dry flat</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </p-tabpanel>
                    <p-tabpanel value="1">
                        <div class="text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">Customer Reviews</div>
                        <ul class="list-none p-0 m-0">
                            <li class="pb-8 border-b border-surface-200 dark:border-surface-700">
                                <span>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                    <i class="pi pi-star-fill text-gray-500"></i>
                                </span>
                                <div class="text-surface-900 dark:text-surface-0 font-bold text-xl my-4">Absolute Perfection!</div>
                                <p class="mx-0 mt-0 mb-4 text-surface-600 dark:text-surface-200 leading-normal">
                                    Blandit libero volutpat sed cras ornare arcu dui vivamus. Arcu dictum varius duis at consectetur lorem donec massa. Imperdiet proin fermentum leo vel orci porta non. Porttitor rhoncus dolor purus non.
                                </p>
                                <span class="font-medium">Darlene Robertson, 2 days ago</span>
                            </li>
                            <li class="py-8 border-b border-surface-200 dark:border-surface-700">
                                <span>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                    <i class="pi pi-star-fill text-yellow-500 mr-1"></i>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </span>
                                <div class="text-surface-900 dark:text-surface-0 font-bold text-xl my-4">Classy</div>
                                <p class="mx-0 mt-0 mb-4 text-surface-600 dark:text-surface-200 leading-normal">Venenatis cras sed felis eget. Proin nibh nisl condimentum id venenatis a condimentum.</p>
                                <span class="font-medium">Kristin Watson, 2 days ago</span>
                            </li>
                        </ul>
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
        </div>
    `
})
export class ProductOverview implements OnInit {
    
    productId: string = "";
    product: Product = {
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        rating: 0
    };
    
    interest: number = 5;
    months: number = 6;
    quantity: number = 1;
    borrowAmount: number = 0;
    calculatedInterest: number = 0;

    liked: boolean = false;
    selectedImageIndex: number = 0;

    constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(paramMap => {
            this.productId = paramMap.get("id")!;
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

    updateBorrowAmount() {
        this.borrowAmount = this.product.price * this.quantity;
        this.updateInterest();
    }

    calculateMonthlyPayment() {
        if (this.borrowAmount <= 0 || this.months <= 0) {
            return 0;
        }
        const monthlyRate = this.interest / 100 / 12;
        const monthlyPayment = (this.borrowAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -this.months));
        return Number(monthlyPayment.toFixed(2));
    }

    goToCart() {
        const productDetails = {
            product: this.product,
            quantity: this.quantity,
            borrowAmount : this.borrowAmount,
            months: this.months,
            interest: this.calculatedInterest,
            monthlyPayment: this.calculateMonthlyPayment()
        }
        this.router.navigate(['/ecommerce/paiement'], {state: productDetails});
    }

    onBorrowAmountChange(event: Event) {
        const input = event.target as HTMLInputElement;
        let value = parseInt(input.value);
        const max = this.product.price * this.quantity;
            if (value > max) {
                input.value = String(max);
                this.borrowAmount = max;
                this.updateInterest();
            }
            else if (value < 1 || isNaN(value)) {
                input.value = "0";
                this.borrowAmount = 0;
                this.updateInterest();
            }
            else {
                this.borrowAmount = value;
                this.updateInterest();
            }
    }

    onDurationChange(event: Event) {
        const input = event.target as HTMLInputElement;
        let value = parseInt(input.value);
        if (value > 60) {
            input.value = "60";
            this.months = 60;
        }
        else if (value < 6 || isNaN(value)) {
            input.value = "6";
            this.months = 6;
        }
        else {
            this.months = value;
        }
    }

    updateInterest() {
        this.calculatedInterest = (this.interest / 100) * this.borrowAmount;
    }
}