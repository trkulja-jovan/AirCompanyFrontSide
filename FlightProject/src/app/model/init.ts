import { Flight } from './flight';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
import { localizedString } from '@angular/compiler/src/output/output_ast';

export class Init {

    private static lets : Flight[];
    private static povratniLets : Flight[];

    static setLets(lets : Flight[]) {
        Init.lets = lets;
    }

    static getLets() : Flight[] {
        return Init.lets;
    }

    static setPovratniLets(povLets : Flight[]){
        Init.povratniLets = povLets;
    }

    static getPovratniLets() : Flight[] {
        return Init.povratniLets;
    }
}
