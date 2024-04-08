class Board{
    #board = null;
    constructor(){
        this.#board = [null,null,null,null,null,null,null,null,null];
    }
    resetAll(){
        this.#board.fill(null);
    }
    set(idx,v){
        this.#board[idx] = v;
    }
    setXY(xIdx,yIdx,v){
        let idx = yIdx*3+xIdx
        this.set(idx,v);
    }
    get(idx){
        return this.#board[idx];
    }
    getXY(xIdx,yIdx){
        let idx = yIdx*3+xIdx
        return this.get(idx);
    }
    get value(){
        return this.#board;
    }

    check(){
        let b = this.#board;
        let r = null;
             if(r = this.isSame(b[0],b[1],b[2])){ return r; }
        else if(r = this.isSame(b[3],b[4],b[5])){ return r; }
        else if(r = this.isSame(b[6],b[7],b[8])){ return r; }
        else if(r = this.isSame(b[0],b[3],b[6])){ return r; }
        else if(r = this.isSame(b[1],b[4],b[7])){ return r; }
        else if(r = this.isSame(b[2],b[5],b[8])){ return r; }
        else if(r = this.isSame(b[0],b[4],b[8])){ return r; }
        else if(r = this.isSame(b[2],b[4],b[6])){ return r; }
        return null;
    }
    isSame(b1,b2,b3){
        if(b1 !== null && b1===b2 && b2===b3){
            return b1;
        }
        return null
    }
}

export default Board;