import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prof } from '../models/prof.models';
import {environment} from "../../environments/environment";
import {Etudiant} from "../models/etudiant.model";
import {PageProf} from "../models/profPage.models";
import {Module} from "../models/modules.models";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  constructor(private http:HttpClient) { }

  public saveEtudiant(etud:Etudiant, classeId: number):Observable<Etudiant>{
    return this.http.post<Etudiant>(`${environment.backendHost}/modules?classeId=${classeId}`, etud);
  }

  public searchEtud(id : any):Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(environment.backendHost+"/etudiant/"+id)
  }
}
