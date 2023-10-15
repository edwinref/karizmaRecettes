import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FiliereService } from '../../../services/filiere.service';
import { Filiere } from '../../../models/filieres.models';
import { Departement } from '../../../models/departement.models';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-add-new-filiere',
  templateUrl: './add-new-filiere.component.html',
  styleUrls: ['./add-new-filiere.component.css'],
})
export class AddNewFiliereComponent implements OnInit {
  newFiliereFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private filiereService: FiliereService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newFiliereFormGroup = this.fb.group({
      libelle: this.fb.control(null, [Validators.required]),
      nombreSem: this.fb.control(null, [Validators.required]),
      chefFiliere: this.fb.control(null, [Validators.required]),
      departement: this.fb.control(null, [Validators.required])
    });
  }



  handleAddFiliere() {
    if (this.newFiliereFormGroup.valid) {
      const newFiliere: Filiere = this.newFiliereFormGroup.value;
      this.filiereService.saveFiliere(newFiliere).subscribe({
        next: () => {
          Swal.fire('Succès', 'Filière ajoutée avec succès', 'success');
          this.router.navigateByUrl('/filieres');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      Swal.fire(
        'Erreur',
        'Veuillez remplir correctement tous les champs du formulaire',
        'error'
      );
    }
  }
}
