class Player{

    game = null;
    name = null;
    symbol = null;
    isCom = false;
    constructor(game,name,symbol,isCom=false){
        this.game = game
        this.name = name
        this.symbol = symbol
        this.isCom = isCom;
        this.init();    
    }

    init(){
        console.log(`@${this.name}`,this.symbol,'new Player()');
    }
    input(n){
        try{
            this.game.input(this,n);
            this.oninput(n);
        }catch(e){
            this.oninput(n,e);
            console.error('ERROR: ',e.name,e.message);
        }
    }
    // oninput(n,e){
    //     console.log(`@${this.name}`,'Player.oninput()',n);
    //     if(e){
    //         this.game.next(true)
    //     }else{
    //         let r = this.game.check();
    //         console.log('체크: ',r);
    //         if(r){ //승자가 있을 경우
    //             this.game.end(r)
    //         }else{
    //             this.game.next(false)
    //         }
            
    //     }
    // }
    oninput(n,e){
        console.log(`@${this.name}`,'Player.oninput()',n);
        if(e){
            this.game.next(true)
        }else{
            this.game.next(false)
        }
    }

    scoreForLine(player,b1,b2,b3){
        let r = 0;
        let mine = 0;
        if(r<0){}else if(player===b1){ mine++; r+=5; }else if(null===b1){ r++ }else{ r= -100; }
        if(r<0){}else if(player===b2){ mine++; r+=5; }else if(null===b2){ r++ }else{ r= -100; }
        if(r<0){}else if(player===b3){ mine++; r+=5; }else if(null===b3){ r++ }else{ r= -100; }
        if(mine>=2){
            r = 1000;
        }       
        
        return r
    }
    cellScores(){
        let b = this.game.board.value;
        // let ableIdxes = this.game.board.ableIdxes();
        let ss = [0,0,0,0,1,0,0,0,0];
        let r = 0;
        r = this.scoreForLine(this,b[0],b[1],b[2]); ss[0]+=r;ss[1]+=r;ss[2]+=r;
        r = this.scoreForLine(this,b[3],b[4],b[5]); ss[3]+=r;ss[4]+=r;ss[5]+=r;
        r = this.scoreForLine(this,b[6],b[7],b[8]); ss[6]+=r;ss[7]+=r;ss[8]+=r;
        r = this.scoreForLine(this,b[0],b[3],b[6]); ss[0]+=r;ss[3]+=r;ss[6]+=r;
        r = this.scoreForLine(this,b[1],b[4],b[7]); ss[1]+=r;ss[4]+=r;ss[7]+=r;
        r = this.scoreForLine(this,b[2],b[5],b[8]); ss[2]+=r;ss[5]+=r;ss[8]+=r;
        r = this.scoreForLine(this,b[0],b[4],b[8]); ss[0]+=r;ss[4]+=r;ss[8]+=r;
        r = this.scoreForLine(this,b[2],b[4],b[6]); ss[2]+=r;ss[4]+=r;ss[6]+=r;
        
        let rs = [];

        // console.log(ss);
        // 놓을 수 없는 부분은 뺌
        ss.forEach((v,idx,arr)=>{
            if(b[idx] !== null){
                // rs.push({k:idx,v:0});
            }else{
                rs.push({k:idx,v:v});
            }
        })
        return rs;
    }
}

export default Player;