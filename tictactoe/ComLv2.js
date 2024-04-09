import Player from "./Player.js";

class ComLv1 extends Player{
    isCom = true;
    delay = 500;
    constructor(game,name,symbol){
        super(game,name,symbol,true)
        this.isCom = true;
    }

    init(){
        console.log(`@${this.name}`,this.symbol,'new ComLv1()');
    }
    input(n){
        setTimeout(()=>{this.inputCom()},this.delay);
    }
    inputCom(){
        // n = Math.floor(Math.random()*9);
        // let ableIdxes = this.game.board.ableIdxes();
        // ableIdxes.sort(() => Math.random() - 0.5);
        // let n = ableIdxes[0]; 
        let ss = this.cellScores();
        ss.sort((a,b)=>{return b[1]-a[1]})
        // console.table(ss)
        // let n = ss[0][0];
        let m = ss[0][1];
        let ss2 = ss.filter((v)=>{
            if(v[1]===m){return v;}
            return null;
        })
        ss2.sort(() => Math.random() - 0.5);
        let n = ss2[0][0];
        console.log('ss2',this.name,JSON.stringify(ss2));
        try{                       
            this.game.input(this,n);
            this.oninput(n);
        }catch(e){
            this.oninput(n,e);
            console.error('ERROR: ',e.name,e.message);
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