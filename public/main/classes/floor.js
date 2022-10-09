class Floor {
    constructor({z, blocks, matStore}){
        this.floorGroup = new THREE.Group() 
        this.floorGroup.position.y = z + 0.5
        for(let i = 0; i < blocks.length; i++){
            let block = new Block({x: blocks[i].x, y: blocks[i].y, block: blocks[i], matStore})
            this.floorGroup.add(block.block)
        }
    }
}