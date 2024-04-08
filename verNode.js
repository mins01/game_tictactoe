import os from 'os';

import Game from "./tictactoe/Game.js";
import Player from "./tictactoe/Player.js";
import ComLv1 from "./tictactoe/ComLv1.js";

// console.log(process.argv);
if(process.argv.length < 3){
    console.log('RUN: node verNode.js (pp|cc|pc|cp) {infiate}');
    process.exit(1);
}

let game = new Game;
switch(process.argv[2]){
    case 'pp':
        game.player1 = new Player(game,'플레이어1','O');
        game.player2 = new Player(game,'플레이어2','X');
    break;
    case 'cc':
        game.player1 = new ComLv1(game,'COM1','O');
        game.player2 = new ComLv1(game,'COM2','X');
    break;
    case 'pc':
        game.player1 = new Player(game,'플레이어1','O');
        game.player2 = new ComLv1(game,'COM2','X');
    break;
    case 'cp':
        game.player1 = new ComLv1(game,'COM1','O');
        game.player2 = new Player(game,'플레이어2','X');
    break;
}
if(process.argv[3]){
    game.limit = 7; // 마크 수 제한모드. 자동으로 가장 마자막 마킹이 사라짐
}


// game.player1 = new ComLv1(game,'COM1','O');
// game.player2 = new ComLv1(game,'COM2','X');

game.ondraw = function(){
    let out = [];
    let line = []
    out.push(os.EOL);
    let player = this.currentPlayer
    
    this.board.value.forEach((player,idx) => {
        if(player===null){
            line.push("\x1b[90m"+idx+"\x1b[0m");
        }else{
            if(game.player1===player){
                line.push("\x1b[31m\x1b[4m"+player.symbol+"\x1b[0m");
            }else{
                line.push("\x1b[34m\x1b[4m"+player.symbol+"\x1b[0m");
            }
            
        }
        if(idx%3===2){ 
            out.push(line.join('|'))
            line.length = 0;
        }
    });
    // out.push(os.EOL);
    console.clear();
    if(this.infinite){
        console.log("\x1b[32m"+'# INFINITE MODE'+"\x1b[0m")
    }
    console.log("\x1b[32m"+'# TURN: '+this.turn+"\x1b[0m")
    console.log("\x1b[0m",out.join(os.EOL),"\x1b[0m")
    console.log();
    console.log("\x1b[32m"+'# HISTORY: '+this.history.slice(-9).map((r)=>{return r[0].toString().trim()}).join(',')+"\x1b[0m")
    

    if(!this.ended){
        if(player){
            if(game.player1===player){
               process.stdout.write("\x1b[31m"+'# INPUT: '+`@${player.name}`+'('+player.symbol+')[0-8,t,q]: '+"\x1b[0m");
            }else{
               process.stdout.write("\x1b[34m"+'# INPUT: '+`@${player.name}`+'('+player.symbol+')[0-8,t,q]: '+"\x1b[0m");
            }
        }
    }else{
        if(game.winner===null){
            console.log("\x1b[33m"+'### DRAW GAME ###'+"\x1b[0m");
        }else if(game.player1===game.winner){
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