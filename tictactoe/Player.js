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

    scoreForLine(line){
        let cells = this.game.board.cells;        
        let player = this;
        let c1 = cells[line[0]];
        let c2 = cells[line[1]];
        let c3 = cells[line[2]];
        let r = 0;
        let mines = 0;
        let others = 0;
        let nones = 0;
        if(player===c1){ mines++; }else if(null===c1){ nones++; }else{ others++;}
        if(player===c2){ mines++; }else if(null===c2){ nones++; }else{ others++;}
        if(player===c3){ mines++; }else if(null===c3){ nones++; }else{ others++;}
             if(mines==2){ r = 900; }
        else if(others==2){ r = 900; }
        else if(mines==1 && others==1){ r = 0; }
        else if(mines==1){ r = 50; }
        else if(others==1){ r = 40; }
        else if(nones==3){ r = 0;     }
        // if([bIdx1,bIdx2,bIdx3].includes(4)){
        //     r *= 1.2;
        // }        
        return r
    }
    cellScores(){
        let cells = this.game.board.cells;

        let lines = this.game.board.constructor.lines;

        


        // let ableIdxes = this.game.board.ableIdxes();
        
        let rs = [];

        cells.forEach((palyer,idx)=>{
            if(palyer!==null){return;}
            let vs = [];
            lines.forEach((line)=>{
                if(!line.includes(idx)){return;}
                vs.push(this.scoreForLine(line));
            })
            // let v = vs.reduce((a, c) => a + c, 0)/vs.length;
            let v = Math.max(...vs)+vs.length;
            if(idx===4){
                v = Math.max(v,80);
            }
            rs.push([idx,v]);
        })

        console.log('vs',JSON.stringify(rs));

        return rs;
    }
}

export default Player;