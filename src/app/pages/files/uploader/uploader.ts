import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonDirective } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Ripple } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

interface UploadedFile {
    name: string;
    objectURL: string;
    size: number;
    type: string;
    documentType: string;
    documentLabel: string;
    uploadDate: Date;
    status: 'completed' | 'processing' | 'error';
    file: File
}

interface RequiredDocument {
    type: string;
    label: string;
    required: boolean;
    maxSizeMB: number;
    acceptedFormats: string;
}

@Component({
    selector: 'app-file-uploader',
    standalone: true,
    imports: [ToastModule, FileUploadModule, CommonModule, ButtonDirective, Ripple, BadgeModule, TagModule],
    template: `
        <p-toast key="fu"></p-toast>

        <div class="space-y-4">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-2">
                Documents Requis
            </h3>

            <div *ngFor="let doc of requiredDocuments" class="document-slot">

                <div *ngIf="!uploadedFiles[doc.type]">
                    <p-fileupload
                        #fileUploader
                        [name]="doc.type"
                        [customUpload]="true"
                        [multiple]="false"
                        (onSelect)="onUpload($event, doc)"
                        [showUploadButton]="false"
                        [showCancelButton]="false"
                        [auto]="true"
                        [accept]="doc.acceptedFormats"
                        [maxFileSize]="doc.maxSizeMB * 1024 * 1024"
                    >
                        <ng-template #content>
                            <div class="flex items-center gap-4 p-4 border-2 border-dashed border-surface-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
                                 style="cursor: pointer"
                                 (click)="fileUploader.advancedFileInput.nativeElement.click()">
                                <i class="pi pi-upload text-surface-400 text-3xl"></i>
                                <div>
                                    <h4 class="font-medium text-surface-800 dark:text-surface-100">{{ doc.label }}</h4>
                                    <p class="text-sm text-surface-600 dark:text-surface-300">
                                        Format: {{ doc.acceptedFormats }} (Max {{ doc.maxSizeMB }}MB)
                                    </p>
                                </div>
                            </div>
                        </ng-template>
                    </p-fileupload>
                </div>

                <div *ngIf="uploadedFiles[doc.type] as file"
                     class="relative flex items-center justify-between p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-800">
                    <div class="flex items-center gap-4 flex-1 min-w-0">
                         <div class="flex-shrink-0">
                            <i *ngIf="file.type && file.type.startsWith('image/'); else fileIcon"
                               class="pi pi-image text-3xl text-green-600"></i>
                            <ng-template #fileIcon>
                                <i class="pi pi-file-pdf text-3xl text-red-600"></i>
                            </ng-template>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p-tag [value]="file.documentLabel" [severity]="getTagSeverity(file.documentType)" class="mb-2"></p-tag>
                            <div class="font-medium text-surface-900 dark:text-surface-0 truncate" [title]="file.name">
                                {{ file.name }}
                            </div>
                            <div class="text-sm text-surface-600 dark:text-surface-200 mt-1">
                                {{ formatFileSize(file.size) }} •
                                <i class="pi pi-check-circle text-green-600"></i> Complété
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 ml-4">
                        <button pButton pRipple icon="pi pi-eye" class="p-button-rounded p-button-text" (click)="previewFile(file)" type="button" title="Prévisualiser"></button>
                        <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" (click)="removeFile(doc.type)" type="button" title="Supprimer"></button>
                    </div>
                </div>
            </div>
        </div>

        <div *ngIf="getUploadedFilesArray().length > 0" class="mt-6">
            <div *ngIf="allRequiredDocumentsUploaded(); else missingDocs"
                 class="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <i class="pi pi-check-circle text-green-600 text-2xl"></i>
                <div>
                    <div class="font-semibold text-green-800">Tous les documents requis ont été téléversés</div>
                    <div class="text-sm text-green-700">Votre dossier est prêt pour la validation.</div>
                </div>
            </div>
            <ng-template #missingDocs>
                <div class="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <i class="pi pi-exclamation-triangle text-yellow-600 text-2xl"></i>
                    <div>
                        <div class="font-semibold text-yellow-800">Documents manquants</div>
                        <div class="text-sm text-yellow-700">
                            Veuillez téléverser tous les documents requis pour continuer.
                        </div>
                    </div>
                </div>
            </ng-template>
        </div>
    `,
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .p-fileupload-header,
        :host ::ng-deep .p-fileupload-files {
            display: none;
        }
        :host ::ng-deep .p-fileupload-content {
            padding: 0;
            border: none;
        }
        .space-y-4 > * + * {
            margin-top: 1rem;
        }
    `]
})
export class UploaderComponent {
    @Output() filesChanged = new EventEmitter<UploadedFile[]>();
    @Input() acceptedFileTypes = '.pdf,image/*';

    requiredDocuments: RequiredDocument[] = [
        { type: 'identity', label: 'Pièce d\'identité (CIN)', required: true, maxSizeMB: 5, acceptedFormats: '.pdf,image/*' },
        { type: 'payslip', label: 'Dernière Fiche de paie', required: true, maxSizeMB: 5, acceptedFormats: '.pdf' },
        { type: 'bank_statement', label: 'Relevé d\'identité bancaire (RIB)', required: true, maxSizeMB: 5, acceptedFormats: '.pdf' }
    ];

    uploadedFiles: { [key: string]: UploadedFile | null } = {
        identity: null,
        payslip: null,
        bank_statement: null
    };

    constructor(private messageService: MessageService) { }

    onUpload(event: any, doc: RequiredDocument) {
        if (event && event.files && event.files.length > 0) {
            const file = event.files[0];

            const newFile: UploadedFile = {
                name: file.name,
                objectURL: URL.createObjectURL(file),
                size: file.size,
                type: file.type,
                uploadDate: new Date(),
                status: 'completed',
                documentType: doc.type,
                documentLabel: doc.label,
                file: file
            };

            if(this.uploadedFiles[doc.type]) {
                URL.revokeObjectURL(this.uploadedFiles[doc.type]!.objectURL);
            }

            this.uploadedFiles[doc.type] = newFile;

            this.emitFiles();
            this.messageService.add({
                key: 'fu',
                severity: 'success',
                summary: 'Succès',
                detail: `Document '${doc.label}' téléversé.`
            });
        }
    }

    removeFile(docType: string) {
        const fileToRemove = this.uploadedFiles[docType];
        if (fileToRemove) {
            URL.revokeObjectURL(fileToRemove.objectURL);
            this.uploadedFiles[docType] = null;
            this.emitFiles();

            this.messageService.add({
                key: 'fu',
                severity: 'info',
                summary: 'Supprimé',
                detail: `Document '${fileToRemove.documentLabel}' supprimé.`
            });
        }
    }

    previewFile(file: UploadedFile) {
        window.open(file.objectURL, '_blank');
    }

    allRequiredDocumentsUploaded(): boolean {
        return this.requiredDocuments.every(doc => !doc.required || !!this.uploadedFiles[doc.type]);
    }

    private emitFiles() {
        this.filesChanged.emit(this.getUploadedFilesArray());
    }

    getUploadedFilesArray(): UploadedFile[] {
        return Object.values(this.uploadedFiles).filter(f => f !== null) as UploadedFile[];
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getTagSeverity(type: string): 'success' | 'info' | 'warn' | 'danger' {
        switch (type) {
            case 'identity': return 'info';
            case 'payslip': return 'success';
            case 'bank_statement': return 'warn';
            default: return 'info';
        }
    }
}