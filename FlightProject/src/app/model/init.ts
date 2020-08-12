import { Flight } from './flight';

export class Init {

    private static lets : Flight[];

    static setLets(lets : Flight[]){
        Init.lets = lets;
    }

    static getLets() : Flight[] {
        return Init.lets;
    }
}
