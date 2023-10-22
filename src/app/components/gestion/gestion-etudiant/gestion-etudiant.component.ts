import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClasseService} from "../../../services/classe.service";
import {Etudiant} from "../../../models/etudiant.model";
import {Classe} from "../../../models/classes.models";
import {EtudiantService} from "../../../services/etudiant.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gestion-etudiant',
  templateUrl: './gestion-etudiant.component.html',
  styleUrls: ['./gestion-etudiant.component.css']
})
export class GestionEtudiantComponent {
  @ViewChild('exampleModal') modal: any;
  etuds:Etudiant[] = [];
  classes: Classe[] = [];
  selectedClasse!: Classe;
  ngOnInit(): void {
    this.getClasses()
  }
  constructor(private classeService:ClasseService, private etudiantService:EtudiantService, private router: Router) {

  }
  private getClasses() {
    this.classeService.getClassess().subscribe(data => {
      this.classes = data;
      console.log(this.classes)
    });
  }
  closeModal() {
    this.modal.hide(); // You should use the correct method for your specific modal library, e.g., .hide() for Bootstrap modal.
  }

  searchEtud(classe:Classe) {
    if (classe != null) {
      this.etudiantService.searchEtud(classe.id).subscribe(data => {
        this.etuds = data
        console.log(this.etuds)
      })
    }
    else {
      this.etuds = []
    }
  }

  handleEditeEtud(etud: Etudiant) {
    this.router.navigateByUrl('/etud/edit',{state :etud});
  }

  handleDeleteEtud(etud: Etudiant) {
    Swal.fire({
      title: 'Vous etes sur?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.etudiantService.deleteEud(etud.id).subscribe();
        this.etuds.splice( this.etuds.indexOf(etud),1);

      }
    });
  }
}
