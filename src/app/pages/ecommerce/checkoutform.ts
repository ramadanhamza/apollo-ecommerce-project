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
import { Router } from '@angular/router';

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
    <div class="grid grid-cols-12 gap-6 grid-nogutter">
        <div class="col-span-12 lg:col-span-7 h-full sm:p-6 p-0 md:p-8">
            
            <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6 mb-8">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-surface-900 dark:text-surface-0 text-2xl font-medium m-0">
                        Résumé de votre demande
                    </h2>
                </div>
                
                <ul class="list-none p-0 m-0 space-y-3 text-surface-700 dark:text-surface-200">
                    <li class="flex justify-between items-center">
                        <span>Montant total:</span>
                        <span class="font-bold text-surface-900 dark:text-surface-0">{{ checkoutData.product.price * checkoutData.quantity }} MAD</span>
                    </li>
                    <li class="flex justify-between items-center">
                        <span>Apport personnel:</span>
                        <span class="font-bold text-surface-900 dark:text-surface-0">{{ (checkoutData.product.price * checkoutData.quantity) - checkoutData.borrowAmount }} MAD</span>
                    </li>
                    <li class="flex justify-between items-center">
                        <span>Montant financé:</span>
                        <span class="font-bold text-surface-900 dark:text-surface-0">{{ checkoutData.borrowAmount }} MAD</span>
                    </li>
                     <li class="flex justify-between items-center">
                        <span>Durée du financement:</span>
                        <span class="font-bold text-surface-900 dark:text-surface-0">{{ checkoutData.months }} mois</span>
                    </li>
                    <li class="flex justify-between items-center">
                        <span>Marge bénéficiaire:</span>
                        <span class="font-bold text-surface-900 dark:text-surface-0">{{ checkoutData.interest }} MAD</span>
                    </li>
                    <div class="text-primary pt-3 border-t border-surface-200 dark:border-surface-700">
                        <p class="text-lg text-center">Votre mensualité</p>
                        <p class="font-bold text-xl text-center">{{ calculateLoan(checkoutData.borrowAmount, 5, checkoutData.months) }} MAD</p>
                    </div>
                </ul>
            </div>

            <div class="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
                <h2 class="text-surface-900 dark:text-surface-0 text-2xl font-medium mb-4">
                    Pièces justificatives requises
                </h2>
                <p class="text-surface-600 dark:text-surface-200 mb-6">
                    Veuillez téléverser les documents requis pour compléter votre demande : 
                    <strong>Pièce d'identité</strong>, <strong>fiche de paie</strong>, et <strong>relevé bancaire</strong>.
                </p>

                <app-file-uploader
                    (filesChanged)="onFilesChanged($event)">
                </app-file-uploader>
            </div>

            <div class="mt-8 text-right">
                <button pButton
                        pRipple
                        label="Finaliser la demande"
                        icon="pi pi-check"
                        iconPos="right"
                        (click)="demarrerProcess()"
                        [disabled]="!allDocumentsUploaded()"
                        class="w-full lg:w-auto p-button-success">
                </button>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-5 p-6 md:p-8 bg-surface-50 dark:bg-surface-800 rounded-lg lg:rounded-l-none">
            <div class="pb-4 border-b border-surface-200 dark:border-surface-700">
                <span class="text-surface-900 dark:text-surface-0 font-medium text-xl">Commande</span>
            </div>
            
            <div class="flex items-start py-4 mt-4 gap-4">
                <img [src]="checkoutData.product.image" class="w-24 h-24 flex-shrink-0 rounded" alt="product" />
                <div class="flex-auto">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-surface-900 dark:text-surface-0 font-bold">{{ checkoutData.product.name }}</span>
                    </div>
                    <div class="text-surface-600 dark:text-surface-200 text-sm mb-1">Quantité: {{ checkoutData.quantity }}</div>
                    <div class="text-surface-600 dark:text-surface-200 text-sm">Total: {{ checkoutData.product.price * checkoutData.quantity }} MAD</div>
                </div>
            </div>

            <div class="py-2 mt-4 border-t border-surface-200 dark:border-surface-700">
                <p-inputGroup class="mt-4">
                    <input type="text" [(ngModel)]="value" pInputText placeholder="Code promo" class="w-full" />
                    <button type="button" pButton pRipple label="Appliquer" [disabled]="!value"></button>
                </p-inputGroup>
            </div>
            <div class="py-2 mt-4 flex justify-between items-center text-xl font-bold border-t border-surface-200 dark:border-surface-700 pt-4">
                <span class="text-surface-900 dark:text-surface-0">Total</span>
                <span class="text-surface-900 dark:text-surface-0">{{ checkoutData.product.price * checkoutData.quantity }} MAD</span>
            </div>
        </div>
    </div>
</div>
    `
})
export class CheckoutForm implements OnInit {

    checkoutData: any; 

    value: string = '';
    checked: boolean = true;
    uploadedFiles: any[] = [];

    constructor(
        private financementService: FinancementService,
        private messageService: MessageService,
        private router: Router
    ) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as any;
        
        this.checkoutData = state;
    }

    ngOnInit() {
        if (this.checkoutData?.product) {
            console.log(this.checkoutData);
        } else {
            console.error("Checkout data is missing. Redirecting home.");
            this.router.navigate(['/']); 
            return;
        }
    }

    onFilesChanged(files: any[]) {
        this.uploadedFiles = files;
        console.log(this.uploadedFiles);
    }

    allDocumentsUploaded(): boolean {
        const pdfFiles = this.uploadedFiles.filter(item => {
            const fileObject = item.file || item;
            return fileObject && fileObject.type === 'application/pdf' || fileObject.type === 'image/png' || fileObject.type === 'image/jpeg'
        });
        return pdfFiles.length === 3;
    }
    
    calculateLoan(borrowAmount: number, interest: number, months: number): number {
        if (borrowAmount <= 0 || months <= 0) return 0;
        const monthlyRate = interest / 100 / 12;
        const monthlyPayment = (borrowAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        return Number(monthlyPayment.toFixed(2));
        
    }

    demarrerProcess() {
        const monthlyPayment = this.calculateLoan(this.checkoutData.borrowAmount, 5, this.checkoutData.months);
        const upfrontPayment = (this.checkoutData.product.price * this.checkoutData.quantity) - this.checkoutData.borrowAmount;

        const demandeRequest = {
            interest: this.checkoutData.interest,
            borrowAmount: this.checkoutData.borrowAmount,
            monthlyPayment: monthlyPayment,
            upfrontPayment: upfrontPayment,
            months: this.checkoutData.months
        };

        const cinFile = this.uploadedFiles.find(f => f.documentType === 'identity')?.file;
        const ficheDePaieFile = this.uploadedFiles.find(f => f.documentType === 'payslip')?.file;
        const releveBancaireFile = this.uploadedFiles.find(f => f.documentType === 'bank_statement')?.file;

        this.financementService.demarrerDemandeFinancement(demandeRequest, cinFile, ficheDePaieFile, releveBancaireFile).subscribe(() => {
            this.messageService.add({
                severity: 'success', summary: 'Succès', detail: 'La demande de financement a été envoyée avec succès',
            });
        }, error => {
            console.error("Error : ", error);
        });
    }

    goBackToProduct() {
        this.router.navigate(['/product-overview', this.checkoutData.product.id]);
    }
}