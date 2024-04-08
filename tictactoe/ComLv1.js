import Player from "./Player.js";

class ComLv1 extends Player{

    delay = 500;
    constructor(game,name,symbol){
        super(game,name,symbol,true)
        console.log(`@${this.name}`,symbol,'new ComLv1()');
    }

    init(){
    }
    input(n){
        setTimeout(()=>{this.inputCom()},this.delay);
    }
    inputCom(){
        // n = Math.floor(Math.random()*9);
        let ableIdxes = this.game.board.ableIdxes();
        ableIdxes.sort(() => Math.random() - 0.5);
        let n = ableIdxes[0]; 
        try{                       
            this.game.input(this,n);
            this.oninput(n);
        }catch(e){
            this.oninput(n,e);
            console.error("\x1b[41m",'ERROR: ',e.name,e.message,"\x1b[0m");
        }
    }
    oninput(n,e){
        // console.log(`@${this.name}`,'Player.oninput()',n);
        if(e){
            this.game.next(true)
        }else{
            this.game.next(false)
        }
    }
    
}

export default ComLv1;