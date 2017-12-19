import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Response } from '@angular/http';

@Injectable()
export class SongsService{
    
    constructor(private http:Http){

    }

getSongs()
{
    return  this.http.get("https://freemusicarchive.org/featured.json").map((res:Response)=>{
        return res.json();
    });
}


}

