import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '@/types/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [
        {
            "id": "1",
            "name": "Apple MacBook Air 13\" (M4)",
            "description": "Ultraléger, puissant avec puce Apple M4 et écran Retina.",
            "price": 14299,
            "category": "Informatique",
            "image": "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3081764-cb-38350_1.png",
            "rating": 5
        },
        {
            "id": "2",
            "name": "ELEXIA TV LED 43EAFD-C24 43\" SMART",
            "description": "Téléviseur intelligent avec affichage Full HD.",
            "price": 2499,
            "category": "Téléviseur",
            "image": "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/5/0/50eaud-d24-50ka1-1.jpg",
            "rating": 4
        },
        {
            "id": "3",
            "name": "BEKO SBS GN156320XP NF 564L INOX",
            "description": "Réfrigérateur side-by-side grande capacité.",
            "price": 10590,
            "category": "Gros électroménager",
            "image": "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3077679-cb-36841_1.png",
            "rating": 4
        },
        {
            "id": "4",
            "name": "BOSCH TC SERIE 8 PRS9A6B70 90CM NOIR",
            "description": "Table de cuisson performante et design.",
            "price": 3999,
            "category": "Gros électroménager",
            "image": "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3037333-cb-22408_1.png",
            "rating": 4
        },
        {
            "id": "5",
            "name": "BEKO MACHINE A CAFE FILTRE CFM 7353 I",
            "description": "Machine à café filtre compacte et performante.",
            "price": 499,
            "category": "Petit électroménager",
            "image": "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3076592-cb-31638_1.png",
            "rating": 5
        },
        {
            "id": "6",
            "name": "BEKO BLENDER TBN 81808 BX 800W",
            "description": "Blender avec bol en verre 1.75L, 800W.",
            "price": 599,
            "category": "Petit électroménager",
            "image": "https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3076598-cb-31706_1.png",
            "rating": 3
        },
        {
            "id": "7",
            "name": "MICROPHONE ORYX POUR IPHONE",
            "description": "Annulation du bruit, réception sonore en temps réel.",
            "price": 240,
            "category": "Accessoires smartphone",
            "image": "https://electrobousfiha.com/34848-large_default/-microphone-sans-fil-w-mic.jpg",
            "rating": 5
        },
        {
            "id": "8",
            "name": "CASQUE BLUETOOTH SONY WH-CH520/LZ BLEU",
            "description": "Casque sans fil avec réduction de bruit avancée.",
            "price": 589,
            "category": "Audio",
            "image": "https://electrobousfiha.com/36973-home_default/casque-bluetooth-sony-wh-ch520lz-bleu.jpg",
            "rating": 5
        },
        {
            "id": "9",
            "name": "IMPRIMANTE CANON 3EN1 COULEUR",
            "description": "Imprimante multifonction jet d'encre couleur.",
            "price": 429,
            "category": "Informatique",
            "image": "https://electrobousfiha.com/29769-home_default/imprimante-canon-3en1-couleur.jpg",
            "rating": 4
        },
        {
            "id": "10",
            "name": "SUPPORT TV SCHNEIDER FIXE MM 26-65P",
            "description": "Support mural fixe pour TV 26 à 65 pouces.",
            "price": 99,
            "category": "Accessoires TV",
            "image": "https://electrobousfiha.com/37928-home_default/support-tv-schneider-fixe-mm-26-65p.jpg",
            "rating": 4
        },
        {
            "id": "11",
            "name": "Samsung Galaxy S24 Ultra",
            "description": "Smartphone Android premium avec S Pen intégré.",
            "price": 12999,
            "category": "Smartphone",
            "image": "https://websitephotosa.blob.core.windows.net/photos/CataloguePhotos/49835/f627faca-ce44-4a8d-9a21-c750ac91d308.WEBP",
            "rating": 5
        },
        {
            "id": "12",
            "name": "MacBook Air 13\" M1 256G Space Grey",
            "description": "MacBook Air puce M1, 8 cœurs CPU et GPU.",
            "price": 10999,
            "category": "Informatique",
            "image": "https://websitephotosa.blob.core.windows.net/photos/CataloguePhotos/49406/89b30474-e3d7-487b-ad71-b34099cb561e.WEBP",
            "rating": 5
        },
        {
            "id": "13",
            "name": "FER A REPASSER TAURUS BALTIC 2200W",
            "description": "Fer à repasser performant pour usage domestique.",
            "price": 199,
            "category": "Petit électroménager",
            "image": "https://websitephotosa.blob.core.windows.net/photos/CataloguePhotos/48714/e55755a2-1242-45d2-a4c2-d92ed777a3e3.WEBP",
            "rating": 5
        },
        {
            "id": "14",
            "name": "TABLE A REPASSER TAURUS ARGENTA BLACK",
            "description": "Table à repasser design et fonctionnelle.",
            "price": 399,
            "category": "Maison",
            "image": "https://websitephotosa.blob.core.windows.net/photos/CataloguePhotos/7806/e393ef80-e558-474c-b125-d96bc497b216.JPG",
            "rating": 4
        }
    ];

    getProductList(): Observable<Product[]> {
        return of(this.products);
    }
}
