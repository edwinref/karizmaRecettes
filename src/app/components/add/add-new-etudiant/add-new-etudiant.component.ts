import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Etudiant} from "../../../models/etudiant.model";
import {Classe} from "../../../models/classes.models";
import {ClasseService} from "../../../services/classe.service";
import {EtudiantService} from "../../../services/etudiant.service";

@Component({
  selector: 'app-add-new-etudiant',
  templateUrl: './add-new-etudiant.component.html',
  styleUrls: ['./add-new-etudiant.component.css']
})
export class AddNewEtudiantComponent {

  @Output() closeModalEvent = new EventEmitter<void>();

  etuds:Etudiant[] = [];
  classes: Classe[] = [];
  ngOnInit(){
    this.getClasses();
  }

  constructor(private classeService:ClasseService, private etudiantService:EtudiantService) {
  }

  addEEE(form: NgForm){
    let etudValue = form.value;
    let etud:Etudiant =new Etudiant(null);
    etud.nom = etudValue.nom;
    etud.prenom = etudValue.prenom;
    etud.email = etudValue.email;
    etud.login = etudValue.login;
    etud.password = etudValue.password;
    etud.classe = etudValue.classe;
    etud.cne = etudValue.cne;
    this.etuds.push(etud);
    form.reset();
  }

  private getClasses() {
    this.classeService.getClasses1().subscribe(data => {
      this.classes = data;
      console.log(this.classes)
    });
  }

  addEtudiants() {
    if (this.etuds.length != 0) {
      this.etuds.forEach(obj => {
        this.etudiantService.saveEtudiant(obj).subscribe(data => {
            console.log(obj)
            this.closeModalEvent.emit();
          },
          error => {
            console.error(error);
            this.closeModalEvent.emit();
          })
      })
    }
    this.etuds = [];
  }

  supprimerEtud(etud: Etudiant) {
    let index = this.etuds.indexOf(etud)
    this.etuds.splice(index, 1);
  }
}
