import * as _ from 'lodash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';
import { ListType } from 'src/app/enums/list-type';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss']
})
export class GameSearchComponent implements OnInit, OnDestroy {
  searchText: string;
  games: Game[] = [];
  ownedGames: { [id: string]: Game } = {};
  wishListGames: { [id: string]: Game } = {};
  random = false;

  constructor(
    private router: Router,
    private gameService: GameService,
    private localStorageService: LocalStorageService

  ) { }

  ngOnInit(): void {
    this.localStorageService.getGameList(ListType.OWNEDLIST);
    this.localStorageService.getGameList(ListType.WISHLIST);

    this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
    this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));
  }

  ngOnDestroy(): void {
    this.localStorageService.ownedGames.unsubscribe();
    this.localStorageService.wishListGames.unsubscribe();
  }

  search() {
    this.gameService.searchByName(this.searchText).subscribe(games => this.games = games)
  }

  randomSearch() {
    this.gameService.getRandomGame().subscribe(games => this.games = games)
  }

  updateList(event: MouseEvent, game: Game, listTyper: number) {
    event.stopPropagation();

    if (listTyper == 0) {
      // Updates Owned Games
      if (this.ownedGames[game.id]) {
        this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
      } else {
        if (this.wishListGames[game.id]) {
          this.localStorageService.deleteGame(game, ListType.WISHLIST);
        }
        this.localStorageService.saveGame(game, ListType.OWNEDLIST);
      }
    } else if (listTyper == 1) {
      // Updates Wished Games
      if (this.wishListGames[game.id]) {
        this.localStorageService.deleteGame(game, ListType.WISHLIST);
      } else {
        if (this.ownedGames[game.id]) {
          this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
        }
        this.localStorageService.saveGame(game, ListType.WISHLIST);
      }
    } else {
      return undefined;
    }
  }

  goToGameDetails(game: Game) {
    this.router.navigate(['./game-details', { gameId: game.id }]);
  }

}
