import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
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

@Component({
    selector: 'app-checkout-form',
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
        CommonModule,
        UploaderComponent
    ],
    providers: [MessageService],
    template: `
        <p-toast></p-toast>

        <div class="card">
            <div class="grid grid-cols-12 gap-4 grid-nogutter">
                <div class="col-span-12 px-6 mt-6 md:mt-12 md:px-12">
                    <span class="text-surface-900 dark:text-surface-0 block font-bold text-xl">Checkout</span>
                </div>
                <div class="col-span-12 lg:col-span-6 h-full px-6 py-6 md:px-12">

                <p-steps [model]="items" [activeIndex]="currentStep - 1" [readonly]="true" class="mb-12"></p-steps>

                    <div *ngIf="currentStep === 1">
                        <div class="grid grid-cols-12 gap-4 mt-10">
                            <div class="col-span-12 mb-12">
                                <span class="text-surface-900 dark:text-surface-0 text-2xl block font-medium mb-8">Informations du client</span>
                                <input id="name" placeholder="Nom complet" type="text" class="p-inputtext w-full mb-6" />
                                <input id="email" placeholder="Adresse e-mail" type="text" class="p-inputtext w-full mb-6" />
                                <div class="flex items-center">
                                    <p-checkbox name="checkbox-1" [(ngModel)]="checked" [binary]="true" inputId="id"></p-checkbox>
                                    <label class="ml-2" for="checkbox-1">Recevoir des offres et actualités par e-mail</label>
                                </div>
                            </div>
                            <div class="col-span-12 mb-12">
                                <span class="text-surface-900 dark:text-surface-0 text-2xl block font-medium mb-8">	Informations sur le financement</span>
                                <label for="interestRate" class="block text-sm font-medium text-gray-800 dark:text-white mb-2">Marge bénéficiaire (HT)</label>
                                <input id="interestRate" type="text" class="p-inputtext w-full mb-6" [value]="interest + '%'" disabled />
                                <label for="borrowAmount" class="block text-sm font-medium mb-1">Montant financé : <span id="borrowAmount">{{ borrowAmount }}</span></label>
                                <input id="borrowAmount" type="range" min="1" [max]="amount" [(ngModel)]="borrowAmount" class="w-full mb-4" />
                                <label for="months" class="block text-sm font-medium mb-1">Durée du financement : <span id="months">{{ months }}</span></label>
                                <input id="months" type="range" min="6" max="60" [(ngModel)]="months" class="w-full mb-4" />
                            </div>
                            <div class="col-span-12 flex flex-col lg:flex-row justify-center items-center lg:justify-end my-12">
                                <button pButton pRipple class="mt-4 lg:mt-0 w-full lg:w-auto order-2 lg:order-1 lg:mr-6" severity="secondary" label="Retour au panier" icon="pi pi-fw pi-arrow-left"></button>
                                <button pButton pRipple class="w-full lg:w-auto order-1 lg:order-2" (click)="nextStep()" label="Continuer vers les documents" icon="pi pi-fw pi-arrow-right" iconPos="right"></button>
                            </div>
                        </div>
                    </div>

                    <div *ngIf="currentStep === 2">
                        <div class="grid grid-cols-12 gap-4 mt-10">
                            <div class="col-span-12">
                                <div class="bg-white rounded shadow p-6">
                                    <h2 class="text-surface-900 dark:text-surface-0 text-2xl block font-medium mb-4">
                                        Téléversement des pièces justificatives
                                    </h2>
                                    <p class="text-surface-600 dark:text-surface-200 mb-6">
                                        Veuillez téléverser les documents requis pour compléter votre demande de financement
                                        <strong>Pièce d'identité</strong>, <strong>fiche de paie</strong>, <strong>relevé bancaire</strong>
                                    </p>

                                    <app-file-uploader
                                        (filesChanged)="onFilesChanged($event)"
                                        [showRequiredDocuments]="true">
                                    </app-file-uploader>
                                </div>
                            </div>

                            <div class="col-span-12 flex flex-col lg:flex-row justify-between items-center my-8">
                                <button pButton
                                        pRipple
                                        (click)="previousStep()"
                                        label="Précédent"
                                        icon="pi pi-fw pi-arrow-left"
                                        severity="secondary"
                                        class="w-full lg:w-auto">
                                </button>

                                <button pButton
                                        pRipple
                                        label="Finaliser la demande de financement"
                                        icon="pi pi-fw pi-check"
                                        class="w-full lg:w-auto mt-4 lg:mt-0"
                                        [disabled]="!allDocumentsUploaded()"
                                        [class.p-button-success]="allDocumentsUploaded()">
                                </button>
                            </div>

                            <div class="col-span-12" *ngIf="!allDocumentsUploaded()">
                                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div class="flex items-center gap-2">
                                        <i class="pi pi-info-circle text-blue-600"></i>
                                        <span class="text-blue-800 font-medium">Information</span>
                                    </div>
                                    <p class="text-blue-700 text-sm mt-2">
                                        Assurez-vous que tous vos documents sont lisibles et récents.
                                        Les pièces d'identité doivent être en cours de validité.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-span-12 lg:col-span-6 px-6 py-6 md:px-12">
                    <div class="pb-4 border-surface-200 dark:border-surface-700">
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-xl">Votre panier</span>
                    </div>
                    <div class="flex flex-col lg:flex-row flex-wrap lg:items-center py-2 mt-4 border-surface-200 dark:border-surface-700">
                        <img src="/demo/images/ecommerce/shop/shop-1.png" class="w-32 h-32 flex-shrink-0 mb-4" alt="product" />
                        <div class="flex-auto lg:ml-4">
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-surface-900 dark:text-surface-0 font-bold">Nom du produit</span>
                                <span class="text-surface-900 dark:text-surface-0 font-bold">123.00 MAD</span>
                            </div>
                            <div class="text-surface-600 dark:text-surface-200 text-sm mb-4">Black | Large</div>
                            <div class="flex flex-auto justify-between items-center">
                                <p-inputNumber [showButtons]="true" buttonLayout="horizontal" [min]="0" inputStyleClass="!w-10 text-center border-transparent outline-0 shadow-none" [(ngModel)]="quantities[0]" styleClass="border border-surface-200 dark:border-surface-700 rounded" decrementButtonClass="p-button-text text-surface-600 dark:text-surface-200 hover:text-primary py-1 px-1" incrementButtonClass="p-button-text text-surface-600 dark:text-surface-200 hover:text-primary py-1 px-1" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></p-inputNumber>
                                <button pButton pRipple icon="pi pi-trash" text rounded></button>
                            </div>
                        </div>
                    </div>
                    <div class="py-2 mt-4 border-surface-200 dark:border-surface-700">
                        <p-inputGroup class="mt-4">
                            <input type="text" [(ngModel)]="value" pInputText placeholder="Promo code" class="w-full" />
                            <button type="button" pButton pRipple label="Apply" [disabled]="!value"></button>
                        </p-inputGroup>
                    </div>
                    <div class="py-2 mt-4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-surface-900 dark:text-surface-0 font-medium">Sous-total</span>
                            <span class="text-surface-900 dark:text-surface-0">123.00 MAD</span>
                        </div>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-surface-900 dark:text-surface-0 font-medium">Livraison</span>
                            <span class="text-primary font-bold">Gratuit</span>
                        </div>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-surface-900 dark:text-surface-0 font-bold">Total</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium text-xl">123.00 MAD</span>
                        </div>
                    </div>
                    <hr class="border-t border-gray-300 dark:border-gray-700 my-2" />
                    <div class="py-2 mt-4 flex items-center justify-between rounded">
                        <span class="text-surface-900 dark:text-surface-0 font-bold">Apport personnel</span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ amount - borrowAmount }} MAD</span>
                    </div>
                    <div class="py-2 mt-4 flex items-center justify-between rounded">
                        <span class="text-surface-900 dark:text-surface-0 font-bold">Mensualité Mourabaha</span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ calculateLoan(borrowAmount, interest, months) }} MAD</span>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class CheckoutForm implements OnInit {

    items: MenuItem[] = [];
    currentStep: number = 1;

    quantities: number[] = [1, 1, 1];
    value: string = '';
    checked: boolean = true;
    checked2: boolean = true;
    amount: number = 123;
    borrowAmount: number = this.amount / 2;
    interest: number = 5;
    months: number = 12;

    cities = [
        { name: 'USA / New York', code: 'NY' },
        { name: 'Italy / Rome', code: 'RM' },
        { name: 'United Kingdoom / London', code: 'LDN' },
        { name: 'Turkey / Istanbul', code: 'IST' },
        { name: 'France / Paris', code: 'PRS' }
    ];
    selectedCity: string = '';

    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.items = [
            {
                label: 'Information',
                icon: 'pi pi-user'
            },
            {
                label: 'Documents',
                icon: 'pi pi-cloud-upload'
            }
        ];
    }

    nextStep() {
        this.currentStep = 2;
    }

    previousStep() {
        this.currentStep = 1;
    }

    onFilesChanged(files: any[]) {
        this.uploadedFiles = files;
    }

    allDocumentsUploaded(): boolean {
        const requiredDocTypes = ['identity', 'payslip', 'bank_statement'];
        return requiredDocTypes.every(type =>
            this.uploadedFiles.some((file: any) => file.documentType === type)
        );
    }

    calculateLoan(borrowAmount: number, interest: number, months: number) {
        if (borrowAmount <= 0 || months <= 0) {
            return '0.00';
        }
        const monthlyRate = interest / 100 / 12;
        const monthlyPayment = (borrowAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        return monthlyPayment.toFixed(2);
    }

    validateDuration(event: Event) {
        const input = event.target as HTMLInputElement;
        let value = parseInt(input.value);
        if (value < 1 || isNaN(value)) {
            input.value = '1';
            this.months = 1;
        } else {
            this.months = value;
        }
    }
}
