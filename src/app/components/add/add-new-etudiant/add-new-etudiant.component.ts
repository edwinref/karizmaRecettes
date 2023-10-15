import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Prof } from 'src/app/models/prof.models';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import Swal from 'sweetalert2';
import {Etudiant} from "../../../models/etudiant.model";
import {EtudiantService} from "../../../services/etudiant.service";
import {Classe} from "../../../models/classes.models";
import {ClasseService} from "../../../services/classe.service";

@Component({
  selector: 'app-add-new-prof',
  templateUrl: './add-new-etudiant.component.html',
  styleUrls: ['./add-new-etudiant.component.css']
})
export class AddNewEtudiantComponent {
  newProfFormGroup!: FormGroup;
  classe: Classe[] = [];

  constructor(private fb: FormBuilder,private profService : EtudiantService, private router:Router,    private classeService: ClasseService,
  ) {}

  ngOnInit(): void {
    this.newProfFormGroup = this.fb.group({

      nom: this.fb.control(null, [Validators.required]),
      cne: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      tel: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      classe: this.fb.control(null, [Validators.required]),
      login: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      civilite: this.fb.control(null, [Validators.required])
    });
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
            this.newProfFormGroup.patchValue({ filiere: this.classe[0] });
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
  handleAddEtudiant() {
    if (this.newProfFormGroup.valid) {
      const newEtudiant: Etudiant = this.newProfFormGroup.value;
      const selectedClasseId: number = +newEtudiant.classe; // Use a type assertion if necessary

      const classeId = this.classe.find(classe => classe.id === selectedClasseId);
      if (classeId) {
        newEtudiant.classe = classeId; // Create a Classe object with the selected ID
        console.log("class" + classeId.id);
        this.profService.saveEtudiant(newEtudiant, classeId.id).subscribe({

          next: data => {
            console.log('dataaa ')
            console.log(newEtudiant)
            Swal.fire('Success', 'Etudiant ajouté avec succès', 'success');
            this.router.navigateByUrl('/etudiant');
          },
          error: err => {
            console.error(err);
            if (err.error && err.error.message) {
              Swal.fire('Error', err.error.message, 'error');
            } else {
              Swal.fire('Error', 'Une erreur s est produite lors de l ajout de l étudiant', 'error');
            }
          }
        });
      } else {
        Swal.fire('Error', 'Veuillez sélectionner une classe avant d ajouter l étudiant', 'error');
      }
    } else {
      Swal.fire('Error', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
    }
  }


}
