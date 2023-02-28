import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

@Component({
	selector: 'app-pokemon-form',
	templateUrl: './pokemon-form.component.html',
	styleUrls: ['./pokemon-form.component.css']

})
export class PokemonFormComponent implements OnInit {
	@Input() pokemon: Pokemon;
	types: string[];

	constructor(
		private pokemonService: PokemonService,
		private router: Router) { }

	ngOnInit() {
		//liste des pokemonList
		this.types = this.pokemonService.getPokemonTypeList();

	}
	hasType(type: string): boolean {
		//le pokemon a t il le type passé en paramètre, return true ou false
		return this.pokemon.types.includes(type);
	}

	selectType($event: Event, type: string) {
		//on veut savoir s'il a coché ou décoché un type
		//va modifier le pokemon
		const isChecked = ($event.target as HTMLInputElement).checked;
		if (isChecked) {
			this.pokemon.types.push(type);
		} else {
			const index = this.pokemon.types.indexOf(type);
			this.pokemon.types.splice(index, 1);
		}

	}
	isTypesValid(type: string): boolean {
		if (this.pokemon.types.length == 1 && this.hasType(type)) {
			return false;
		}

		if (this.pokemon.types.length > 2 && this.hasType(type)) {
			return false;
		}
		return true;
	}
	onSubmit() {
		console.log('submit form !');
		this.router.navigate(['/pokemons', this.pokemon.id]);

	}
}
