import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';

interface UploadedFile {
    name: string;
    objectURL: string;
    size: number;
    type: string;
    documentType?: string;
    documentLabel?: string;
    uploadDate: Date;
    status: 'completed' | 'processing' | 'error';
}

interface RequiredDocument {
    type: string;
    label: string;
    required: boolean;
    maxSize: number; // en MB
    acceptedFormats: string[];
}

@Component({
    selector: 'app-file-uploader',
    standalone: true,
    imports: [ToastModule, FileUploadModule, CommonModule, ButtonDirective, Ripple, BadgeModule, TagModule],
    template: `
        <p-toast key="fu"></p-toast>
        <div>
            <!-- Zone d'upload -->
            <p-fileupload
                #fileUploader
                name="demo[]"
                [customUpload]="true"
                [multiple]="true"
                (onSelect)="onUpload($event)"
                [showUploadButton]="false"
                [showCancelButton]="false"
                [auto]="true"
                [accept]="acceptedFileTypes"
                class="upload-button-hidden w-full"
            >
                <ng-template #content>
                    <div class="w-full py-6"
                         style="cursor: pointer"
                         (click)="fileUploader.advancedFileInput.nativeElement.click()"
                         [class]="uploadedFiles.length ? 'border-2 border-dashed border-surface-300 rounded-lg p-4 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors' : 'border-2 border-dashed border-surface-300 rounded-lg p-8 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors'">

                        <div *ngIf="!uploadedFiles.length" class="flex flex-col justify-center items-center">
                            <i class="pi pi-cloud-upload text-surface-400 text-6xl mb-4"></i>
                            <h3 class="text-lg font-medium text-surface-900 dark:text-surface-0 mb-2">
                                Glissez vos fichiers ici ou cliquez pour sélectionner
                            </h3>
                            <p class="text-surface-600 dark:text-surface-200 text-sm mb-4">
                                Formats acceptés: {{ acceptedFileTypes }} (max 10MB par fichier)
                            </p>
                            <button pButton
                                    label="Sélectionner des fichiers"
                                    icon="pi pi-upload"
                                    class="p-button-outlined"
                                    type="button"></button>
                        </div>

                        <div *ngIf="uploadedFiles.length" class="text-center">
                            <i class="pi pi-plus text-surface-400 text-2xl mb-2"></i>
                            <p class="text-surface-600 dark:text-surface-200 text-sm">
                                Cliquez pour ajouter d'autres fichiers
                            </p>
                        </div>
                    </div>
                </ng-template>
            </p-fileupload>

            <!-- Liste des fichiers uploadés -->
            <div *ngIf="uploadedFiles.length" class="mt-6">
                <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-4">
                    Documents téléversés ({{ uploadedFiles.length }})
                </h3>
                <div class="space-y-3">
                    <div *ngFor="let file of uploadedFiles; let i = index"
                         class="flex items-center justify-between p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-800">

                        <div class="flex items-center gap-4">
                            <!-- Icône du fichier -->
                            <div class="flex-shrink-0">
                                <i *ngIf="file.type && file.type.startsWith('image/'); else fileIcon"
                                   class="pi pi-image text-3xl text-green-600"></i>
                                <ng-template #fileIcon>
                                    <i class="pi pi-file-pdf text-3xl text-red-600"></i>
                                </ng-template>
                            </div>

                            <!-- Informations du fichier -->
                            <div class="flex-1">
                                <div class="font-medium text-surface-900 dark:text-surface-0">
                                    {{ file.name }}
                                </div>
                                <div class="text-sm text-surface-600 dark:text-surface-200 mt-1">
                                    <span *ngIf="file.documentLabel" class="inline-block">
                                        <p-tag [value]="file.documentLabel"
                                               [severity]="getTagSeverity(file.documentType!)"
                                               class="mr-2"></p-tag>
                                    </span>
                                    {{ formatFileSize(file.size) }} •
                                    {{ file.uploadDate | date:'dd/MM/yyyy HH:mm' }}
                                </div>
                            </div>

                            <!-- Statut -->
                            <div class="flex items-center gap-2">
                                <i *ngIf="file.status === 'completed'"
                                   class="pi pi-check-circle text-green-600 text-xl"></i>
                                <i *ngIf="file.status === 'processing'"
                                   class="pi pi-spin pi-spinner text-blue-600 text-xl"></i>
                                <i *ngIf="file.status === 'error'"
                                   class="pi pi-exclamation-triangle text-red-600 text-xl"></i>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center gap-2 ml-4">
                            <!-- Bouton preview -->
                            <button pButton
                                    pRipple
                                    icon="pi pi-eye"
                                    class="p-button-rounded p-button-text p-button-sm"
                                    (click)="previewFile(file)"
                                    type="button"
                                    title="Prévisualiser"></button>

                            <!-- Bouton supprimer -->
                            <button pButton
                                    pRipple
                                    icon="pi pi-trash"
                                    class="p-button-rounded p-button-text p-button-sm p-button-danger"
                                    (click)="removeFile(file)"
                                    type="button"
                                    title="Supprimer"></button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Statut global -->
            <div *ngIf="uploadedFiles.length" class="mt-6">
                <div *ngIf="allRequiredDocumentsUploaded(); else missingDocs"
                     class="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <i class="pi pi-check-circle text-green-600 text-2xl"></i>
                    <div>
                        <div class="font-semibold text-green-800">Tous les documents requis ont été téléversés</div>
                        <div class="text-sm text-green-700">Votre dossier est prêt pour la validation</div>
                    </div>
                </div>
                <ng-template #missingDocs>
                    <div class="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <i class="pi pi-exclamation-triangle text-yellow-600 text-2xl"></i>
                        <div>
                            <div class="font-semibold text-yellow-800">Documents manquants</div>
                            <div class="text-sm text-yellow-700">
                                Veuillez téléverser tous les documents requis pour continuer
                            </div>
                        </div>
                    </div>
                </ng-template>
            </div>
        </div>
    `,
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .p-fileupload-header {
            display: none;
        }
        :host ::ng-deep .p-fileupload {
            border: none;
        }
        :host ::ng-deep .p-fileupload-file-list {
            display: none;
        }
        .space-y-3 > * + * {
            margin-top: 0.75rem;
        }
    `]
})
export class UploaderComponent {
    @Output() filesChanged = new EventEmitter<UploadedFile[]>();
    @Input() showRequiredDocuments = true;
    @Input() acceptedFileTypes = 'image/*,.pdf';

    uploadedFiles: UploadedFile[] = [];

    requiredDocuments: RequiredDocument[] = [
        {
            type: 'identity',
            label: 'Pièce d\'identité',
            required: true,
            maxSize: 5,
            acceptedFormats: ['PDF', 'JPG', 'PNG']
        },
        {
            type: 'payslip',
            label: 'Fiche de paie',
            required: true,
            maxSize: 5,
            acceptedFormats: ['PDF']
        },
        {
            type: 'bank_statement',
            label: 'Relevé bancaire',
            required: true,
            maxSize: 5,
            acceptedFormats: ['PDF']
        }
    ];

    constructor(private messageService: MessageService) { }

    onUpload(event: any) {
        if (event && event.files) {
            for (let file of event.files) {
                const uploadedFile: UploadedFile = {
                    name: file.name,
                    objectURL: URL.createObjectURL(file),
                    size: file.size,
                    type: file.type,
                    uploadDate: new Date(),
                    status: 'completed',
                    ...this.categorizeDocument(file.name)
                };
                this.uploadedFiles.push(uploadedFile);
            }
            this.filesChanged.emit(this.uploadedFiles);
            this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: `${event.files.length} fichier(s) téléversé(s) avec succès`
            });
        }
    }

    removeFile(file: UploadedFile) {
        this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
        this.filesChanged.emit(this.uploadedFiles);
        URL.revokeObjectURL(file.objectURL);

        this.messageService.add({
            severity: 'info',
            summary: 'Supprimé',
            detail: 'Fichier supprimé'
        });
    }

    previewFile(file: UploadedFile) {
        // Ouvrir le fichier dans un nouvel onglet
        window.open(file.objectURL, '_blank');
    }

    categorizeDocument(fileName: string): { documentType?: string; documentLabel?: string } {
        const lowerName = fileName.toLowerCase();

        if (lowerName.includes('cin') || lowerName.includes('carte') || lowerName.includes('identit')) {
            return { documentType: 'identity', documentLabel: 'Pièce d\'identité' };
        }
        if (lowerName.includes('paie') || lowerName.includes('salaire')) {
            return { documentType: 'payslip', documentLabel: 'Fiche de paie' };
        }
        if (lowerName.includes('relev') || lowerName.includes('bancaire') || lowerName.includes('compte')) {
            return { documentType: 'bank_statement', documentLabel: 'Relevé bancaire' };
        }

        return {};
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getDocumentIcon(type: string): string {
        switch (type) {
            case 'identity': return 'pi pi-id-card text-blue-600';
            case 'payslip': return 'pi pi-wallet text-green-600';
            case 'bank_statement': return 'pi pi-building text-purple-600';
            default: return 'pi pi-file text-gray-600';
        }
    }

    getTagSeverity(type: string): 'success' | 'info' | 'warn' | 'danger' {
        switch (type) {
            case 'identity': return 'info';
            case 'payslip': return 'success';
            case 'bank_statement': return 'warn';
            default: return 'info';
        }
    }

    isDocumentTypeUploaded(type: string): boolean {
        return this.uploadedFiles.some(file => file.documentType === type);
    }

    allRequiredDocumentsUploaded(): boolean {
        return this.requiredDocuments
            .filter(doc => doc.required)
            .every(doc => this.isDocumentTypeUploaded(doc.type));
    }
}
