import { Klasa } from './klasa';
import { Usluga } from './usluga';
import { Sediste } from './sediste';

export class Detailflight {
    public usluge : Usluga[];
	public klasa : Klasa[];
	public sedista : Sediste[];
	
	public cena : number;
}
