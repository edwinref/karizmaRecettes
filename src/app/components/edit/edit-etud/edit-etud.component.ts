import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Prof} from "../../../models/prof.models";
import {Etudiant} from "../../../models/etudiant.model";
import {ProfServiceService} from "../../../services/prof-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {EtudiantService} from "../../../services/etudiant.service";
import {Classe} from "../../../models/classes.models";
import {ClasseService} from "../../../services/classe.service";

@Component({
  selector: 'app-edit-etud',
  templateUrl: './edit-etud.component.html',
  styleUrls: ['./edit-etud.component.css']
})
export class EditEtudComponent {

  editEtudGoup!: FormGroup;
  etud!: Etudiant;
  classe: Classe[] = [];

  constructor(private etudService: EtudiantService,
              private fb: FormBuilder,
              private router: Router,private route : ActivatedRoute, private classeService:ClasseService) {
    this.etud=this.router.getCurrentNavigation()?.extras.state as Etudiant;
  }

  ngOnInit(): void {
    this.editEtudGoup = this.fb.group({
      prenom: [''],
      nom: [''],
      civilite: [''],
      cne: [''],
      email: [''],
      specialite: [''],
      tel: [''],
      login: [''],
      password: [''],
      classe: {},
    });

    this.setFormValues();
    this.fetchClasse();
  }
  fetchClasse() {
    this.classeService.getClasses1().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Classe[] = response.content;
          this.classe = filieres;
          this.classe.forEach(classeItem => {
            console.log("claaas " + classeItem.id);
          });
          if (this.classe.length > 0) {
            this.editEtudGoup.patchValue({ classe: this.classe[0] });
          }
        } else {
          console.error('Unexpected response from the server:', response);
          // Handle the unexpected response here, such as displaying an error message.
        }
      },
      (error) => {
        console.log(error);
        // Handle the error here, such as displaying an error message.
      }
    );
  }

  setFormValues() {
    if (this.etud) {
      this.editEtudGoup.patchValue({
        prenom: this.etud.prenom,
        nom: this.etud.nom,
        civilite: this.etud.civilite,
        cne: this.etud.cne,
        email: this.etud.email,
        login: this.etud.login,
        password: this.etud.password,
        classe: this.etud.classe
      });
    }
  }

  handleUpdateEtud() {
    if (this.editEtudGoup.valid && this.etud) {
      const updatedEtud: Etudiant = {
        ...this.etud,
        ...this.editEtudGoup.value
      };

      this.etudService.saveEtudiant(updatedEtud, this.etud.id).subscribe((data) => {
        Swal.fire('Succès', 'Etudiant modifié avec succès', 'success');
        this.router.navigateByUrl('/etudiant');
      });
    }
  }
}
