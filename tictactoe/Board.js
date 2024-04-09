class Board{
    #cells = null;
    static lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    constructor(){
        this.#cells = [null,null,null,null,null,null,null,null,null];
    }
    reset(){
        this.#cells.fill(null);
    }
    set(idx,v){
        this.#cells[idx] = v;
    }
    setXY(xIdx,yIdx,v){
        let idx = this.XYtoIdx(xIdx,yIdx);
        this.set(idx,v);
    }
    get(idx){
        return this.#cells[idx];
    }
    getXY(xIdx,yIdx){
        let idx = this.XYtoIdx(xIdx,yIdx);
        return this.get(idx);
    }
    get cells(){
        return this.#cells;
    }
    idxToXY(idx){
        let x = idx % 3;
        let y = Math.floor(idx / 3);
        return {x:x,y:y}
    }
    XYtoIdx(xIdx,yIdx){
        if(xIdx<0 || xIdx>2){return null;}
        if(yIdx<0 || yIdx>2){return null;}
        return yIdx*3+xIdx;

    }

    check(){
        let r = null;
        for(let i=0,m=Board.lines.length;i<m;i++){
            r = this.whoLined(Board.lines[i]);
            if(r){return r;}
        }
        return null;
    }
    whoLined(line){
        let b1=this.#cells[line[0]];
        let b2=this.#cells[line[1]];
        let b3=this.#cells[line[2]];
        if(b1 !== null && b1===b2 && b2===b3){
            return b1;
        }
        return null
    }
    ableIdxes(){
        let idxes = [];
        this.#cells.forEach((el,idx) => {
            if(el===null){
                idxes.push(idx);
            }
        });
        return idxes;
    }
}

export default Board;