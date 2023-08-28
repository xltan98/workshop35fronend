// import { Component, Input, inject } from '@angular/core';
// import { Game } from '../game';
// import { GameService } from '../game.service';

// @Component({
//   selector: 'app-game',
//   templateUrl: './game.component.html',
//   styleUrls: ['./game.component.css']
// })
// export class GameComponent {
//   @Input() pagePerRec=0;
//   games!:Game[];
//   currentIndex:number =0
//   pageNo:number=1;

//   gameSvc=inject(GameService)

//   inOnePage(){
//     this.gameSvc.getGames(10,1).subscribe((resp)=>{
//     console.log(resp);
//     this.games=resp;})
//   }
  

// }


import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  @Input() pagePerRec = 0;
  games!: Game[];
  currentIndex: number = 0;
  pageNo: number = 1;
  
  constructor(private gameSvc: GameService) {}
 
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(changes['pagePerRec'].currentValue);
    if(changes['pagePerRec'].currentValue == null)
      this.pagePerRec = 10;
    else
      this.pagePerRec = changes['pagePerRec'].currentValue;

    this.gameSvc.getGames(this.pagePerRec, this.currentIndex).subscribe((resp)=> {
      console.log(resp);
      this.games = resp;
    })
  }

  nextPage(){
    this.pageNo++;
    this.currentIndex = this.currentIndex + this.pagePerRec;
    this.gameSvc.getGames(this.pagePerRec, this.currentIndex).subscribe((resp)=> {
      console.log(resp);
      this.games = resp;
    })
  }

  previousPage(){
    this.pageNo--;
    this.currentIndex = this.currentIndex - this.pagePerRec;
    this.gameSvc.getGames(this.pagePerRec, this.currentIndex).subscribe((resp)=> {
      console.log(resp);
      this.games = resp;
    })
  }

  ngOnInit(): void {
      console.log("pagePerRec> " + this.pagePerRec);
      if(this.pagePerRec ==null)
        this.pagePerRec = 10;
      console.log(this.pagePerRec)
      this.gameSvc.getGames(this.pagePerRec, this.currentIndex).subscribe((resp)=> {
        console.log(resp);
        this.games = resp;
        //console.log(this.games.length);
      })
  }
}
