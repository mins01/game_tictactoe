import os from 'os';

import Game from "./tictactoe/Game.js";
import Player from "./tictactoe/Player.js";
import { error, profileEnd } from 'console';

let game = new Game;
game.player1 = new Player(game,'플레이어1','O');
game.player2 = new Player(game,'플레이어2','X');

game.ondraw = function(){
    let out = [];
    let line = []
    out.push(os.EOL);
    let player = this.currentPlayer
    
    this.board.value.forEach((player,idx) => {
        if(player===null){
            line.push('-');
        }else{
            if(game.player1===player){
                line.push("\x1b[31m"+player.symbol+"\x1b[0m");
            }else{
                line.push("\x1b[34m"+player.symbol+"\x1b[0m");
            }
            
        }
        if(idx%3===2){ 
            out.push(line.join('|'))
            line.length = 0;
        }
    });
    // out.push(os.EOL);
    console.clear();
    console.log("\x1b[0m",out.join(os.EOL),"\x1b[0m")

    if(!this.ended){
        if(player){
            if(game.player1===player){
               process.stdout.write("\x1b[31m"+'# INPUT: '+`@${player.name}`+'('+player.symbol+')[0-8,t,q]: '+"\x1b[0m");
            }else{
               process.stdout.write("\x1b[34m"+'# INPUT: '+`@${player.name}`+'('+player.symbol+')[0-8,t,q]: '+"\x1b[0m");
            }
        }
    }else{
        if(game.player1===game.winner){
            console.log("\x1b[31m"+'### WINNER: '+`@${player.name}`+' ###'+"\x1b[0m");
         }else{
            console.log("\x1b[34m"+'### WINNER: '+`@${player.name}`+' ###'+"\x1b[0m");
         }
    }
}
game.onend = function(){
    console.log('GAME OVER');
    process.exit(0)
}

game.start();

process.stdin.on("data", async function (input) {
    let player = game.currentPlayer;
    if(!player){ console.log('플레이어 턴이 아님'); return;}
    let str = input.toString().trim();
    if(str===''){
        game.draw();
    }else if(str==='t'){
        try{
            const sleep = (ms) => {
                return new Promise(resolve=>{
                    setTimeout(resolve,ms)
                })
            }

            game.player1.input(0);
            await sleep(500);
            game.player2.input(1);
            await sleep(500);
            game.player1.input(8);
            await sleep(500);
            game.player2.input(2);
            await sleep(500);
            game.player1.input(4);
            await sleep(500);
            game.player2.input(7);
            
        }catch(e){
            console.error(e.name,e.message);
        }
        
    }else if(str==='q'){
        process.exit(0);
        
    }else{
        let n = parseInt(str, 10);
        player.input(n);
    }
    

});