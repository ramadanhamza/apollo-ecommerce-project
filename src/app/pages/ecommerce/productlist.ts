import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { TabsModule } from 'primeng/tabs';
import { PaginatorModule } from 'primeng/paginator';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
}

@Component({
    selector: 'app-product-list',
    imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule, RippleModule, TabsModule, PaginatorModule],
    template: `
        <div class="card">
            <div class="text-surface-900 dark:text-surface-0 font-medium text-4xl mb-6">Produits Populaires</div>
            <p class="mt-0 p-0 mb-8 text-surface-700 dark:text-surface-100 text-2xl">Sélection Exclusive</p>
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
                                    <span class="text-primary text-xl font-medium block mb-2">{{ product.price | currency:'MAD':'symbol':'1.0-0' }}</span>
        </div>
                        <button
                            type="button"
                            pRipple
                                    class="border border-primary rounded py-2 px-4 bg-primary text-white inline-flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 cursor-pointer w-full mt-2"
                        >
                                    <i class="pi pi-shopping-cart mr-2 text-base"></i>
                                    <span class="text-base">Ajouter au panier</span>
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
export class ProductList {
    products: Product[] = [
        {
            id: "1",
            name: "Apple MacBook Air 13\" (M4)",
            description: "Ultraléger, puissant avec puce Apple M4 et écran Retina.",
            price: 14299,
            category: "Informatique",
            image: "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3081764-cb-38350_1.png",
            rating: 5
        },
        {
            id: "2",
            name: "ELEXIA TV LED 43EAFD-C24 43\" SMART",
            description: "Téléviseur intelligent avec affichage Full HD.",
            price: 2499,
            category: "Téléviseur",
            image: "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/5/0/50eaud-d24-50ka1-1.jpg",
            rating: 4
        },
        {
            id: "3",
            name: "BEKO SBS GN156320XP NF 564L INOX",
            description: "Réfrigérateur side-by-side grande capacité.",
            price: 10590,
            category: "Gros électroménager",
            image: "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3077679-cb-36841_1.png",
            rating: 4
        },
        {
            id: "4",
            name: "BOSCH TC SERIE 8 PRS9A6B70 90CM NOIR",
            description: "Table de cuisson performante et design.",
            price: 3999,
            category: "Gros électroménager",
            image: "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3037333-cb-22408_1.png",
            rating: 4
        },
        {
            id: "5",
            name: "BEKO MACHINE A CAFE FILTRE CFM 7353 I",
            description: "Machine à café filtre compacte et performante.",
            price: 499,
            category: "Petit électroménager",
            image: "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3076592-cb-31638_1.png",
            rating: 5
        },
        {
            id: "6",
            name: "BEKO BLENDER TBN 81808 BX 800W",
            description: "Blender avec bol en verre 1.75L, 800W.",
            price: 599,
            category: "Petit électroménager",
            image: "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3076598-cb-31706_1.png",
            rating: 3
        },
        {
            id: "7",
            name: "MICROPHONE ORYX POUR IPHONE",
            description: "Annulation du bruit, réception sonore en temps réel.",
            price: 240,
            category: "Accessoires smartphone",
            image: "https://electrobousfiha.com/34848-large_default/-microphone-sans-fil-w-mic.jpg",
            rating: 5
        },
        {
            id: "8",
            name: "CASQUE BLUETOOTH SONY WH-CH520/LZ BLEU",
            description: "Casque sans fil avec réduction de bruit avancée.",
            price: 589,
            category: "Audio",
            image: "https://electrobousfiha.com/36973-home_default/casque-bluetooth-sony-wh-ch520lz-bleu.jpg",
            rating: 5
        },
        {
            id: "9",
            name: "IMPRIMANTE CANON 3EN1 COULEUR",
            description: "Imprimante multifonction jet d'encre couleur.",
            price: 429,
            category: "Informatique",
            image: "https://electrobousfiha.com/29769-home_default/imprimante-canon-3en1-couleur.jpg",
            rating: 4
        },
        {
            id: "10",
            name: "SUPPORT TV SCHNEIDER FIXE MM 26-65P",
            description: "Support mural fixe pour TV 26 à 65 pouces.",
            price: 99,
            category: "Accessoires TV",
            image: "https://electrobousfiha.com/37928-home_default/support-tv-schneider-fixe-mm-26-65p.jpg",
            rating: 4
        },
        {
            id: "11",
            name: "Samsung Galaxy S24 Ultra",
            description: "Smartphone Android premium avec S Pen intégré.",
            price: 12999,
            category: "Smartphone",
            image: "https://websitephotosa.blob.core.windows.net/photos/CataloguePhotos/49835/f627faca-ce44-4a8d-9a21-c750ac91d308.WEBP",
            rating: 5
        },
        {
            id: "12",
            name: "MacBook Air 13\" M1 256G Space Grey",
            description: "MacBook Air puce M1, 8 cœurs CPU et GPU.",
            price: 10999,
            category: "Informatique",
            image: "https://websitephotosa.blob.core.windows.net/photos/CataloguePhotos/49406/89b30474-e3d7-487b-ad71-b34099cb561e.WEBP",
            rating: 5
        },
        {
            id: "13",
            name: "FER A REPASSER TAURUS BALTIC 2200W",
            description: "Fer à repasser performant pour usage domestique.",
            price: 199,
            category: "Petit électroménager",
            image: "https://websitephotosa.blob.core.windows.net/photos/CataloguePhotos/48714/e55755a2-1242-45d2-a4c2-d92ed777a3e3.WEBP",
            rating: 5
        },
        {
            id: "14",
            name: "TABLE A REPASSER TAURUS ARGENTA BLACK",
            description: "Table à repasser design et fonctionnelle.",
            price: 399,
            category: "Maison",
            image: "https://websitephotosa.blob.core.windows.net/photos/CataloguePhotos/7806/e393ef80-e558-474c-b125-d96bc497b216.JPG",
            rating: 4
        }
    ];

    currentPage: number = 0;
    rowsPerPage: number = 6;

    get paginatedProducts() {
        const start = this.currentPage * this.rowsPerPage;
        return this.products.slice(start, start + this.rowsPerPage);
    }

    onPageChange(event: any) {
        this.currentPage = event.page;
    }
}
