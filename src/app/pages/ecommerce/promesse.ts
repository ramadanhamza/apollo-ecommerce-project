import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import * as pdfjsLib from 'pdfjs-dist';
import PdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-promesse',
    imports: [ButtonModule, FormsModule, CheckboxModule, CommonModule],
    template: `
<div class="card flex flex-col h-screen p-0 overflow-hidden" *ngIf="!signed">
    
    <div class="py-4 px-2 flex-shrink-0">
        <h1 class="text-2xl sm:text-3xl font-bold mb-1">Promesse achat</h1>
        <p class="text-sm sm:text-base">Veuillez lire attentivement le document, puis signez en bas pour continuer.</p>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-center p-3 bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 gap-4 flex-shrink-0 text-center">
        <div class="flex gap-2">
            <button pButton type="button" icon="pi pi-arrow-left" (click)="goToPreviousPage()" [disabled]="currentPage <= 1" label="Précédent" class="w-full sm:w-auto"></button>
            <button pButton type="button" icon="pi pi-arrow-right" (click)="goToNextPage()" [disabled]="currentPage >= totalPages" label="Suivant" class="w-full sm:w-auto"></button>
        </div>
        <span class="font-bold text-surface-700 dark:text-surface-200 text-sm sm:text-base">
            Page {{ currentPage }} sur {{ totalPages }}
        </span>
        <div class="ml-auto sm:ml-auto flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button pButton type="button" icon="pi pi-search-minus" (click)="zoomOut()" class="p-button-outlined w-full sm:w-auto"></button>
            <button pButton type="button" icon="pi pi-search-plus" (click)="zoomIn()" class="p-button-outlined w-full sm:w-auto"></button>
        </div>
    </div>

    <div class="flex-grow overflow-auto bg-surface-100 dark:bg-surface-900 text-center p-2 sm:p-4">
        <canvas #pdfCanvas class="mx-auto shadow-lg max-w-full h-auto"></canvas>
    </div>

    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between p-4 bg-surface-50 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 gap-4 flex-shrink-0">
        <div class="flex items-center w-full sm:w-auto justify-center sm:justify-start mb-5 sm:mb-0">
            <p-checkbox [(ngModel)]="hasAgreed" [binary]="true" inputId="agreementCheckbox"></p-checkbox>
            <label for="agreementCheckbox" class="ml-2 font-medium text-surface-700 dark:text-surface-200 text-sm cursor-pointer">
                J'ai lu et j'accepte les termes du contrat.
            </label>
        </div>

        <div class="w-full sm:flex-1 min-w-[250px]">
            <div class="relative">
                <input 
                    type="text" 
                    pInputText
                    [(ngModel)]="signatureText"
                    placeholder="Saisir le code reçu par SMS"
                    class="font-signature md:text-3xl w-full p-2 border-0 border-b-2 border-surface-300 dark:border-surface-600 bg-transparent focus:ring-0 focus:border-primary"
                    [ngClass]="{'border-primary-500': signatureText}"
                />
                <label class="absolute -top-4 left-0 text-xs text-surface-500">Signature Électronique</label>
            </div>
        </div>

        <div class="w-full sm:w-auto text-center sm:text-right">
            <button 
                pButton 
                type="button" 
                icon="pi pi-check-square" 
                label="Valider" 
                (click)="submitSignature()"
                [disabled]="!hasAgreed || !signatureText"
                class="w-full sm:w-auto">
            </button>
        </div>
    </div>
</div>
<div *ngIf="signed" class="flex items-center justify-center h-full bg-green-50">
  <div class="bg-white shadow-lg rounded-2xl p-8 border border-green-300 text-center max-w-md mx-auto">
    <div class="flex items-center justify-center mb-4">
      <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12l2 2l4 -4M12 20c4.418 0 8 -3.582 8 -8s-3.582 -8 -8 -8s-8 3.582 -8 8s3.582 8 8 8z" />
      </svg>
    </div>
    <h2 class="text-2xl font-bold text-green-600 mb-2">Promesse validée</h2>
    <p class="text-green-700 text-md">La promesse a été <span class="font-semibold">validée avec succès</span>.</p>
  </div>
</div>
`
})
export class Promesse implements OnInit {
  @ViewChild('pdfCanvas') pdfCanvas!: ElementRef<HTMLCanvasElement>;

  pdfDoc: any = null;
  currentPage = 1;
  totalPages = 0;
  zoomLevel = 1.5;
  hasAgreed = false;
  signatureText = '';
  signed: boolean = false;
  
  pdfSrc = '/lorem-ipsum_duplicate.pdf';

  constructor(private router: Router) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker;
  }

  ngOnInit(): void {
    this.loadPdf();
  }

  async loadPdf() {
    try {
      const loadingTask = pdfjsLib.getDocument(this.pdfSrc);
      this.pdfDoc = await loadingTask.promise;
      
      this.totalPages = this.pdfDoc.numPages;
      
      this.renderPage(this.currentPage);
    } catch (error) {
      console.error('Erreur lors du chargement du PDF', error);
    }
  }

  async renderPage(pageNumber: number) {
    if (!this.pdfDoc || pageNumber > this.totalPages || pageNumber < 1) {
      return;
    }

    this.currentPage = pageNumber;

    const page = await this.pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: this.zoomLevel });
    
    const canvas = this.pdfCanvas.nativeElement;
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    await page.render(renderContext).promise;
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.renderPage(this.currentPage - 1);
    }
  }

  submitSignature() {
    if (!this.hasAgreed || !this.signatureText) {
      console.error('Veuillez accepter les termes et signer.');
      return;
    }
    else {
        this.signed = true;
    }
    console.log('Contrat accepté :', this.hasAgreed);
    console.log('Signature fournie :', this.signatureText);
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.renderPage(this.currentPage + 1);
    }
  }
  
  zoomIn() {
    this.zoomLevel += 0.2;
    this.renderPage(this.currentPage);
  }

  zoomOut() {
    if (this.zoomLevel > 0.4) {
      this.zoomLevel -= 0.2;
      this.renderPage(this.currentPage);
    }
  }
}