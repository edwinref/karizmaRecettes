import {Classe} from "./classes.models";

export interface Etudiant {
  id:         number;
  civilite: string;
  nom:        string;
  prenom:     string;
  cne:        string;
  email:      string;
  login:      string;
  password:   string;
  classe: Classe;


}
