import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable, tap, of, catchError } from 'rxjs';

@Injectable()
export class PokemonService {

	constructor(private http: HttpClient) { }

	getPokemonList(): Observable<Pokemon[]> {
		return this.http.get<Pokemon[]>('api/pokemons').pipe(
			tap((response) => this.log(response)),
			catchError((error)=>this.handleError(error, undefined))
		);
		// return POKEMONS;
	}

	getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
		return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
			tap((response) => this.log(response)),
			catchError((error)=>this.handleError(error, undefined))
		);
	}

	private log(response: Pokemon[] | Pokemon | undefined) {
		console.table(response);
	}

	private handleError(error: Error, errorValue: any) {
		console.error(error);
		return of(errorValue);
	}
	getPokemonTypeList(): string[] {
		return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy'];
	}
}
