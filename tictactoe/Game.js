import Board from "./Board.js";

class Game{
    board = null;
    player1 = null;
    player2 = null;
    turn = 0;
    running = false;
    ended = false;
    winner = false;
    constructor(){
        this.board = new Board();
        this.player1 = null;
        this.player2 = null;
        this.turn = 0;
        this.running = false;
        this.ended = false;
        this.winner = null;
        this.reset();
    }

    get isEnd(){
        return false;
    }
    get currentPlayer(){
        if(!this.running){ return null; }
        if(this.turn%2==1){
            return this.player1;
        }else{
            return this.player2;
        }
    }

    reset(){
        this.turn = 0;
        this.running = false;
    }

    start(){
        this.onstart();
        this.running = true;
        this.ended = false;
        this.winner = null;
        this.next();
    }
    onstart(){
        console.log('Game.onstart()');
    }
    next(rturn){
        // this.onnext();
        if(this.isEnd){
            this.draw();
            return this.end();
        }else{
            if(!rturn) this.turn++;
            let player = this.currentPlayer;
            if(!player){return;}
        }
        this.draw();
    }
    // onnext(){
    //     console.log('Game.onnext()');
    // }
    input(player,n){
        if(this.currentPlayer !== player){ throw new Error('해당 플레이어의 턴이 아닙니다.'); }
        if(isNaN(n)){ throw new Error('숫자가 아닙니다.'); }
        if(n < 0 || n > 8){ throw new Error('지정 범위의 숫자가 아닙니다.'); }
        if(this.board.value[n]===undefined){ throw new Error(`board에 ${n}가 없습니다.`); }
        if(this.board.value[n]!==null){ throw new Error(`board에 ${n}은 비어있지 않습니다.`); }
        this.board.set(n,player);
        let r = this.board.check();
        // console.log('체크: ',r);
    }
    oninput(n){
        console.log('Game.oninput()',n);
    }
    end(winner){
        this.ended = true;
        this.winner = winner;
        this.draw();
        this.onend();
    }
    onend(){
        console.log('Game.onend()');
    }
    draw(){
        this.ondraw();
    }
    ondraw(){
        console.log('Game.ondraw()');
    }

    check(){
        return this.board.check()
    }

    
}

export default Game;