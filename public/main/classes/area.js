class Area {
    constructor({x, y, blocks, matStore, range, config}){
        this.areaGroup = new THREE.Group()
        this.x = x;
        this.y = y;
        this.areaSize = 5
        this.areaGap = 1
        this.config= config
        this.areaGroup.position.x = this.x* (this.areaSize + this.areaGap )
        this.areaGroup.position.z = this.y * (this.areaSize + this.areaGap )
        // this.areaGroup.position.y = range * Math.cos(Math.PI * 2 / this.config.widthSegment * this.y)
        // this.areaGroup.position.z = y * (this.areaSize + this.areaGap / 2)

        this.floor = {}
        for(let i = 0; i < blocks.length; i++) {
            if(!this.floor[blocks[i].z]){
                this.floor[blocks[i].z] = {
                    blocks: [blocks[i]]
                }
            } else {
                this.floor[blocks[i].z].blocks.push(blocks[i])
            }
        }
        this.plane = new THREE.Mesh( 
            new THREE.BoxGeometry( this.areaSize, this.areaSize, 0.2),
            new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} ) 
        );
        this.plane.rotation.x = Math.PI /2 
        this.plane.position.y = -0.1
        this.plane.receiveShadow = true;
        
        this.areaGroup.add( this.plane );
        // this.areaGroup.rotation.x = Math.PI / 2
        // this.lines = new THREE.Line(
        //     new THREE.BufferGeometry().setFromPoints([
        //         new THREE.Vector3( - this.areaSize / 2, 0.2 , this.areaSize / 2 ),
        //         new THREE.Vector3( - this.areaSize / 2 , 0.2, -this.areaSize / 2 ),
        //         new THREE.Vector3( this.areaSize / 2, 0.2, -this.areaSize / 2 ),
        //         new THREE.Vector3( this.areaSize / 2, 0.2, this.areaSize / 2 ),
        //         new THREE.Vector3( - this.areaSize / 2, 0.2 , this.areaSize / 2 ),

        //     ]),
        //     new THREE.LineBasicMaterial( { color: 0xffffff } )
        // )
        // this.areaGroup.add( this.lines );

        Object.entries(this.floor).forEach(([key, value]) => {
            let floor = new Floor({z: Number(key), blocks: value.blocks, matStore})
            this.areaGroup.add(floor.floorGroup)
        })
    }
}