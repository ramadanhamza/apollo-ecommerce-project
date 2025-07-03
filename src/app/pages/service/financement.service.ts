import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeRequest } from '@/types/demandeRequest';

@Injectable({
    providedIn: 'root'
})
export class FinancementService {
    
    constructor(private http: HttpClient) {}

    apiUrl = 'http://localhost:8080/api/financement';

    demarrerDemandeFinancement(request: DemandeRequest, cinFile: File, ficheDePaieFile: File, releveBancaireFile: File): Observable<any> {
        const formData = new FormData();

        formData.append('demande', JSON.stringify(request));

        formData.append('cin_file', cinFile);
        formData.append('fiche_de_paie_file', ficheDePaieFile);
        formData.append('releve_bancaire_file', releveBancaireFile);

        return this.http.post(this.apiUrl + "/demande-financement", formData, { responseType: 'text' });
    }
}
