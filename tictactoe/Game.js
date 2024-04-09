import Board from "./Board.js";

class Game{
    board = null;
    player1 = null;
    player2 = null;
    turn = 0;
    running = false;
    ended = false;
    winner = false;
    history = null;
    limit = false
    constructor(){
        this.board = new Board();
        this.player1 = null;
        this.player2 = null;
        this.turn = 0;
        this.running = false;
        this.ended = false;
        this.winner = null;
        this.history = [];
        this.limit = false;
        this.reset();
    }

    get isEnd(){
        return false;
    }
    get currentPlayer(){
        if(this.ended){ return null; }
        if(!this.running){ return null; }
        if(this.turn%2==1){
            return this.player1;
        }else{
            return this.player2;
        }
    }

    restart(){
        this.reset();
        this.start();
    }
    reset(){
        this.turn = 0;
        this.running = false;
        this.history.length = 0;
        this.board.reset();
    }

    start(){
        this.onstart();
        this.running = true;
        this.ended = false;
        this.winner = null;
        this.history.length = 0;
        this.next();
    }
    onstart(){
        console.log('Game.onstart()');
    }
    next(rturn){
        
        //--- 게임 승리 체크
        let r = this.check();
        if(r){ //승자가 있을 경우
            this.end(r)
        }else{
            let ableIdxes = this.board.ableIdxes();
            if(ableIdxes.length===0){ // 더이상 놓을 곳이 없을 경우
                this.end(null)
            }
        }


        if(this.isEnd){
            this.draw();
            return this.end();
        }else{
            if(!rturn) this.turn++;
            let player = this.currentPlayer;
            if(!player){return;}
        }
        if(this.limit){ //마크 수 제한 모드
            if(this.turn > this.limit){
                let h = this.history.slice(-1*this.limit);
                this.board.set(h[0][0],null);
            }
        }
        this.draw();
        if(!this.ended && this.currentPlayer?.isCom){
            this.currentPlayer.input();
        }
    }
    // onnext(){
    //     console.log('Game.onnext()');
    // }
    input(player,n){
        if(this.currentPlayer !== player){ throw new Error('해당 플레이어의 턴이 아닙니다.'); }
        if(isNaN(n)){ throw new Error('숫자가 아닙니다.'); }
        if(n < 0 || n > 8){ throw new Error('지정 범위의 숫자가 아닙니다.'); }
        if(this.board.cells[n]===undefined){ throw new Error(`board에 ${n}가 없습니다.`); }
        if(this.board.cells[n]!==null){ throw new Error(`board에 ${n}은 비어있지 않습니다.`); }
        this.board.set(n,player);
        this.history.push([n,player])
        // let r = this.board.check();
        // let ableIdxes = this.board.ableIdxes();
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