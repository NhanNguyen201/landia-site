class OctaDeco {
    constructor({position}){
        this.octGroup = new THREE.Group();
        this.octGroup.position.x = position.x
        this.octGroup.position.y = position.y
        this.octGroup.position.z = position.z
        this.octa = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.25 ,0),
            new THREE.MeshPhongMaterial( {color: 0x6af0f7, side: THREE.DoubleSide} ) 
        )
        this.octa.position.y = 0.25
        this.octa.castShadow = true
        this.octGroup.add(this.octa)
       
    }
    animate(){
        this.octa.rotation.y = this.octa.rotation.y + 0.02
    }
}

class Area {
    constructor({x, z, blocks, matStore, range, config}){
        this.areaGroup = new THREE.Group()
        this.x = x;
        this.z = z;
        this.areaSize = 5
        this.areaGap = 1
        this.config= config
        this.areaGroup.position.x = this.x * (this.areaSize + this.areaGap )
        this.areaGroup.position.z = this.z * (this.areaSize + this.areaGap )

        this.floor = {}
        this.octs = []
        for(let i = 0; i < blocks.length; i++) {
            if(!this.floor[blocks[i].y]){
                this.floor[blocks[i].y] = {
                    blocks: [blocks[i]]
                }
            } else {
                this.floor[blocks[i].y].blocks.push(blocks[i])
            }
        }
        this.plane = new THREE.Mesh( 
            new THREE.BoxGeometry( this.areaSize, this.areaSize, 0.1),
            new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} ) 
        );
        this.plane.rotation.x = Math.PI /2 
        this.plane.position.y = -0.05
        this.plane.receiveShadow = true;
        
        this.areaGroup.add( this.plane );

        this.lower_plane = new THREE.Mesh( 
            new THREE.BoxGeometry( this.areaSize + this.areaGap, this.areaSize + this.areaGap, 0.1),
            new THREE.MeshStandardMaterial( {color: 0x7a90fa, side: THREE.DoubleSide} ) 
        );
        this.lower_plane.rotation.x = Math.PI /2 
        this.lower_plane.position.y = -0.15
        this.lower_plane.receiveShadow = true;
        
        this.areaGroup.add( this.lower_plane );
        for(let i = 0; i <=3 ; i++){
            let oct = new OctaDeco({position: {
                x: (this.areaSize / 2) * Math.sin(i * Math.PI /2 + Math.PI /4),
                y: 0.25,
                z: (this.areaSize / 2) * Math.cos(i * Math.PI /2 + Math.PI /4)
            }})
            this.octs.push(oct)

            oct.line = new THREE.Line( 
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3( 0, 0, 0 ),
                    new THREE.Vector3( 0, 0.1, 0 ),
                    new THREE.Vector3( -0.225, 0.25, 0 ),
                    new THREE.Vector3( -1, 0.25, 0 ),
                    new THREE.Vector3( -1, 0, 0 ),
                    new THREE.Vector3( 0, 0, 0 ),
                    new THREE.Vector3( 0, 0.1, 0 ),
                    new THREE.Vector3( 0, 0.25, 0.225 ),
                    new THREE.Vector3( 0, 0.25, 1 ),
                    new THREE.Vector3( 0, 0, 1 ),                    
                    new THREE.Vector3( 0, 0, 0 ),
                ]), 
                new THREE.LineBasicMaterial({
                    color: 0x5e0044,
                }) 
            ); 
            let wallGeo = new THREE.BufferGeometry()
            wallGeo.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array([
                0.,0.,0.,
                0.,  0.1, 0.,
                -0.225, 0.1, 0.,
                
                0.,0.,0.,
                -0.225, 0., 0.,
                -0.225, 0.1, 0.,

                -0.225, 0.1, 0.,
                -0.225, 0.25, 0.,
                0., 0.1, 0.,

                -0.225, 0. , 0.,
                -1., 0. , 0.,
                -1., 0.25 , 0.,

                -0.225, 0. , 0.,
                -0.225, 0.25 , 0.,
                -1., 0.25 , 0.,

                //
                0.,0.,0.,
                0.,  0.1, 0.,
                0., 0.1, 0.225,
                
                0.,0.,0.,
                0., 0., 0.225,
                0., 0.1, 0.225,

                0., 0.1, 0.225,
                0., 0.25, 0.225,
                0., 0.1, 0.,

                0., 0. , 0.225,
                0., 0. , 1.,
                0., 0.25 , 1.,

                0., 0. , 0.225,
                0., 0.25 , 0.225,
                0., 0.25 , 1,

            ]), 3 ) );
            oct.wallMesh = new THREE.Mesh( 
                wallGeo,
                new THREE.MeshBasicMaterial( {color: 0x1c468a, side: THREE.DoubleSide} ) 
            );

            oct.wallMesh.rotation.y =(i - 1) * Math.PI / 2
            oct.line.rotation.y = (i - 1) * Math.PI / 2
            oct.line.position.y = -0.25
            oct.wallMesh.position.y = -0.25
            oct.wallMesh.castShadow = true
            // oct.octGroup.add(oct.line)
            oct.octGroup.add(oct.wallMesh)

            this.areaGroup.add(oct.octGroup)
        }
        Object.entries(this.floor).forEach(([key, value]) => {
            let floor = new Floor({y: Number(key), blocks: value.blocks, matStore})
            this.areaGroup.add(floor.floorGroup)
        })
    }
    animate(){
        this.octs.forEach(oct => oct.animate())
    }
}