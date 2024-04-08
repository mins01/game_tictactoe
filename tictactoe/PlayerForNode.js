import Player from "./Player.js";


class PlayerForNode extends Player{
    constructor(...args){
        super(...args);
    }

    oninputready(){
        console.log(`@${this.name}`,'PlayerForNode.oninputready()');

    }    
}

export default PlayerForNode;