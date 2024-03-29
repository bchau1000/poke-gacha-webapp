import { Component, Input, OnInit, Type } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PokemonData } from 'src/app/data/pokemon-data';
import { TypeData } from 'src/app/data/type-data';
import { StatData } from 'src/app/data/stat-data';
import { PokemonService } from '../../services/pokemon.service'

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.css']
})
export class PokemonPageComponent implements OnInit {
  pokemon:PokemonData;
  types:TypeData[];
  stats:StatData[];

  constructor(private route:ActivatedRoute, private pokeService: PokemonService) {
    this.pokemon = new PokemonData(-1, '');
    this.types = [];
    this.stats = [];

    // Get the pokemon id from the url, use it to create a pokemon data object
    this.route.params.subscribe((params) => {
      this.getPokemon(params['pokemon_id']);
    });
    
  }

  ngOnInit(): void {
  }

  // Create a pokemon data object given its id
  getPokemon(id:number) {
    this.pokeService.getPokemon(id).then(data => {
      this.pokemon = data;
      this.getPokemonStats(this.pokemon.id);
      this.getPokemonTypes(this.pokemon.id);
    });
  }

  // Grab the stats for the pokemon on this page
  getPokemonStats(id:number) {
    this.pokeService.getPokemonStats(id).then(data => {
      this.stats = data;
    });
  }

  // Grab the types for the pokemon on this page
  getPokemonTypes(id:number) {
    this.pokeService.getPokemonTypes(id).then(data => {
      this.types= data;
    });
  }
}
