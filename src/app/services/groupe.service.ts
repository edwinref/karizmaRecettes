import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageClasse } from '../models/profPage.models';
import { Classe } from '../models/classes.models';
import {Groupe} from "../models/groupe.model";
import {Etudiant} from "../models/etudiant.model";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(private http:HttpClient) { }

  public saveGroupe(groupe: Groupe): Observable<Classe> {
    // Include filiereId as a query parameter in the request
    return this.http.post<Classe>(
      `${environment.backendHost}/groupes`,
      groupe
    );
  }

  public getByClasse(id : number):Observable<Groupe[]>{
    return this.http.get<Groupe[]>(environment.backendHost+"/groupes/"+id)
  }

  public getByModule(id : number):Observable<Groupe[]>{
    return this.http.get<Groupe[]>(environment.backendHost+"/groupes/module/"+id)
  }


}
