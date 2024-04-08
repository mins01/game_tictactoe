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
        console.log(`@${this.name}`,symbol,'new Player()');
    }

    init(){
    }
    input(n){
        try{
            this.game.input(this,n);
            this.oninput(n);
        }catch(e){
            this.oninput(n,e);
            console.error("\x1b[41m",'ERROR: ',e.name,e.message,"\x1b[0m");
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
    
}

export default Player;