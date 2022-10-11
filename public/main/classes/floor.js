class Floor {
    constructor({y, blocks, matStore}){
        this.floorGroup = new THREE.Group() 
        this.floorGroup.position.y = y + 0.5
        for(let i = 0; i < blocks.length; i++){
            let block = new Block({x: blocks[i].x, z: blocks[i].z, block: blocks[i], matStore})
            this.floorGroup.add(block.block)
        }
    }
}