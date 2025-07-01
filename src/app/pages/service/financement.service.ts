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

    demarrerDemandeFinancement(request: DemandeRequest): Observable<any> {
        return this.http.post(this.apiUrl + "/demande-financement", request, {responseType: 'text'});
    }
}
