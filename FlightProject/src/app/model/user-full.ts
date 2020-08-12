import { User } from './user';

export class UserFull {

    constructor(
        public brojTelefona : string,
        public godinaRodjenja : Date,
        public ime : string,
        public jmbg : string,
        public prezime : string,
        public logindata : User){

        }
}
