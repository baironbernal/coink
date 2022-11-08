import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/character.interface';
import { environment } from '@environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getCharacters(name = '', page = null) {
    const filter = `${environment.urlAPI}/?page=${page}&name=${name}`;
    return this.http.get<Character[]>(filter);
  }
  getDetails() {}
}
