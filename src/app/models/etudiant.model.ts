
export class Etudiant {
  id:         any;
  nom:        any;
  prenom:     any;
  cne:        any;
  email:      any;
  login:      any;
  password:   any;
  classe: any;

  constructor(id: any) {
  if (null != id)
    this.id = id;
}
}
