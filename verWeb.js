import Game from "./tictactoe/Game.js";
import Player from "./tictactoe/Player.js";
import ComLv1 from "./tictactoe/ComLv1.js";

// console.log(process.argv);
// if(process.argv.length < 3){
//     console.log('RUN: node verNode.js (pp|cc|pc|cp) {infiate}');
//     process.exit(1);
// }

let game = new Game;
// switch(process.argv[2]){
//     case 'pp':
//         game.player1 = new Player(game,'플레이어1','O');
//         game.player2 = new Player(game,'플레이어2','X');
//     break;
//     case 'cc':
//         game.player1 = new ComLv1(game,'COM1','O');
//         game.player2 = new ComLv1(game,'COM2','X');
//     break;
//     case 'pc':
//         game.player1 = new Player(game,'플레이어1','O');
//         game.player2 = new ComLv1(game,'COM2','X');
//     break;
//     case 'cp':
//         game.player1 = new ComLv1(game,'COM1','O');
//         game.player2 = new Player(game,'플레이어2','X');
//     break;
// }
// if(process.argv[3]){
//     game.limit = 7; // 마크 수 제한모드. 자동으로 가장 마자막 마킹이 사라짐
// }
game.player1 = new Player(game,'HUMAN1','o');
// game.player2 = new Player(game,'플레이어2','x');
// game.player1 = new ComLv1(game,'COM1','O');
game.player2 = new ComLv1(game,'COM2','X');

game.ondraw = function(){
    let out = [];
    let line = []
    out.push("\n");
    let player = this.currentPlayer
    
    this.board.value.forEach((player,idx) => {
        if(player===null){
            line.push(idx);
        }else{
            if(game.player1===player){
                line.push(player.symbol);
            }else{
                line.push(player.symbol);
            }
            
        }
        if(idx%3===2){ 
            out.push(line.join('|'))
            line.length = 0;
        }
    });
    // out.push("\n");
    // console.clear();
    if(this.limit){
        console.log('# limit MODE')
    }
    console.log('# TURN: '+this.turn)
    console.log(out.join("\n"))
    console.log();
    console.log('# HISTORY: '+this.history.slice(-9).map((r)=>{return r[0].toString().trim()}).join(','))
    
    
    if(!this.ended){
        if(player){
            if(game.player1===player){
                console.log('# INPUT: '+`@${player.name}`+'('+player.symbol+')[0-8,t,q]: ');
            }else{
                console.log('# INPUT: '+`@${player.name}`+'('+player.symbol+')[0-8,t,q]: ');
            }
        }
    }else{
        if(this.winner===null){
            console.log('### DRAW GAME ###');
        }else if(this.winner){
            console.log('### WINNER: '+`@${this.winner.name}`+' ###');
        }
    }
    //--- HTML
    let div_game =  document.querySelector('.game-tictactoe');
    let div_boxes = document.querySelectorAll('.board .box');

    div_game.dataset.ended = this.ended.toString();
    this.board.value.forEach((player,idx) => {
        if(player===null){
            div_boxes[idx].dataset.value="0";
        }else{
            if(this.player1===player){
                div_boxes[idx].dataset.value="1";
            }else{
                div_boxes[idx].dataset.value="2";
            }
            
        }
    });
    div_game.dataset.ended = this.ended.toString()
    if(this.currentPlayer === null){ div_game.dataset.currentPlayer='0'; }
    else if(this.currentPlayer === this.player1){ div_game.dataset.currentPlayer='1'; }
    else if(this.currentPlayer === this.player2){ div_game.dataset.currentPlayer='2'; }
    
}
game.onend = function(){
    console.log(this.winner)
    let div_game =  document.querySelector('.game-tictactoe');
    if(this.winner===null){div_game.dataset.winner = "0";}
    else if(this.winner===this.player1){div_game.dataset.winner = "1";}
    else if(this.winner===this.player2){div_game.dataset.winner = "2";}

    setTimeout(()=>{
        if(this.winner===null){
            // alert('### DRAW GAME ###');
        }else if(this.winner){
            // alert('### WINNER: '+`@${this.winner.name}`+' ###');
        }
    },100)
    
    console.log('GAME OVER');

    // process.exit(0)
}

game.start();

// process.stdin.on("data", async function (input) {
//     let player = game.currentPlayer;
//     if(!player){ console.log('플레이어 턴이 아님'); return;}
//     let str = input.toString().trim();
//     if(str===''){
//         game.draw();
//     }else if(str==='t'){
//         try{
//             const sleep = (ms) => {
//                 return new Promise(resolve=>{
//                     setTimeout(resolve,ms)
//                 })
//             }

//             game.player1.input(0);
//             await sleep(500);
//             game.player2.input(1);
//             await sleep(500);
//             game.player1.input(8);
//             await sleep(500);
//             game.player2.input(2);
//             await sleep(500);
//             game.player1.input(4);
//             await sleep(500);
//             game.player2.input(7);

//         }catch(e){
//             console.error(e.name,e.message);
//         }

//     }else if(str==='q'){
//         process.exit(0);

//     }else{
//         let n = parseInt(str, 10);
//         player.input(n);
//     }


// });



export default game;