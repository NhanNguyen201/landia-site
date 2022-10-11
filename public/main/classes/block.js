class Block {
    constructor({x, z, block, matStore}){
        this.block = new THREE.Group()
       
        if(x == 1  && z == 0) {
            let plane = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            plane.rotation.y = Math.PI /2
            plane.castShadow = true

            plane.position.x = 0.5
            this.block.add(plane)
        } else if (x == -1 && z == 0) {
            
            let plane = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            plane.rotation.y = Math.PI /2
            plane.castShadow = true

            plane.position.x = -0.5
            this.block.add(plane)
        } else if(x == 0 && z == -1) {
            
            let plane = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            plane.rotation.y = Math.PI 
            plane.castShadow = true

            plane.position.z = -0.5
            this.block.add(plane)
        } else if(x == 0  && z == 1){
            
            let plane = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            plane.position.z = 0.5
            plane.castShadow = true

            this.block.add(plane)
        } else if(x == 1 && z == 1) {
            
            let plane_1 = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            let plane_2 = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )

            plane_1.rotation.y = Math.PI /2
            plane_1.position.x = 0.5
            plane_1.castShadow = true
            this.block.add(plane_1)
            plane_2.castShadow = true

            plane_2.position.z = 0.5
            this.block.add(plane_2)

        }else if(x == -1 && z == 1) {
            
            let plane_1 = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            let plane_2 = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            plane_1.rotation.y = -Math.PI /2
            plane_1.position.x = -0.5
            plane_1.castShadow = true
            
            this.block.add(plane_1)

            plane_2.position.z = 0.5
            plane_2.castShadow = true

            this.block.add(plane_2)

        }else if(x == 1 && z == -1) {
            
            let plane_1 = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            let plane_2 = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            plane_1.position.x = 0.5
            plane_1.rotation.y = Math.PI /2
            plane_1.castShadow = true
            this.block.add(plane_1)


            plane_2.position.z = -0.5
            plane_2.rotation.y = Math.PI 
            plane_2.castShadow = true
            this.block.add(plane_2)

        }else if(x == -1 && z == -1) {
            
            let plane_1 = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            let plane_2 = new THREE.Mesh( 
                new THREE.PlaneGeometry( 0.85, 0.85 ), 
                new THREE.MeshBasicMaterial( {map: matStore.getMat(block.mainImage), side: THREE.DoubleSide} )
            )
            plane_1.rotation.y = -Math.PI /2
            plane_1.position.x = -0.5
            plane_1.castShadow = true
            this.block.add(plane_1)

            plane_2.position.z = -0.5
            plane_2.rotation.y = Math.PI
            plane_2.castShadow = true
            this.block.add(plane_2)
        }


        this.block.position.x = x
        this.block.position.z = z
    }
}