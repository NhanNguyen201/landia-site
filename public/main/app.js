
class App {
    constructor({world: {blocks, worldConfig}, position}) {
        
        this.worldBlockData = blocks;
        this.worldConfig = worldConfig;
        this.initCameraPosition = position
        // console.log("world config: ", this.worldConfig)
        this.areaGroup = {}
        this.areas = []
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        
        // this.controls = new THREE.FirstPersonControls(this.camera, this.renderer.domElement);
        // this.controls.movementSpeed = 0.2;
        // this.controls.rollSpeed = Math.PI / 4;
        // this.controls.autoForward = false;
        // this.controls.dragToLook = true;
        this.clock = new THREE.Clock()
        
        // this.camera.position.x = this.initCameraPosition.x;
        // this.camera.position.y = this.initCameraPosition.y;
        // this.camera.position.z = this.initCameraPosition.z;
        this.camera.position.x = 5;
        this.camera.position.y = 2;
        this.camera.position.z = 5;

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        
    }
  
    async init() {
       
        this.matStore = new MatStore()
        await this.matStore.load(this.worldBlockData) 

        this.#addEvents();
        this.#addLights()
        this.#initArea()
        
    }
   
    #addLights(){
        const ambient = new THREE.AmbientLight(0x5A4446, 1.5)
        this.scene.add(ambient);

        this.light = new THREE.PointLight( 0xb4f56e, 0.43, 0 )
        this.light.position.y = 5
        this.light.position.z = 5
        this.light.position.x = 5
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;
        this.light.shadow.focus = 0.6;
        this.scene.add(this.light)
        
        // this.yLight = new THREE.PointLight( 0xb4f56e, 0.55, 0 )
        // this.yLight.position.x = 10.5
        // this.yLight.position.y = 5
        // this.yLight.position.z = -2.5
        // this.yLight.castShadow = true;
        // this.yLight.shadow.mapSize.width = 1024;
        // this.yLight.shadow.mapSize.height = 1024;
        // this.yLight.shadow.focus = 0.6;
        // this.scene.add(this.yLight)
    }
    #initArea(){
        for(let i = 0; i < this.worldBlockData.length; i++){
            if(!this.areaGroup[`x:${this.worldBlockData[i].area.x},z:${this.worldBlockData[i].area.z}`]){
                this.areaGroup[`x:${this.worldBlockData[i].area.x},z:${this.worldBlockData[i].area.z}`] = {
                    'blocks' :[{
                        x: this.worldBlockData[i].block.x,
                        y: this.worldBlockData[i].block.y,
                        z: this.worldBlockData[i].block.z,
                        mainImage: this.worldBlockData[i].mainImage
                    }]
                }
            } else {
                this.areaGroup[`x:${this.worldBlockData[i].area.x},z:${this.worldBlockData[i].area.z}`]['blocks'].push({
                    x: this.worldBlockData[i].block.x,
                    y: this.worldBlockData[i].block.y,
                    z: this.worldBlockData[i].block.z,
                    mainImage: this.worldBlockData[i].mainImage
                })
            }
        }
        Object.entries(this.areaGroup).forEach(([key, value]) => {
            let x = Number(key.split(',')[0].split('x:')[1]);
            let z = Number(key.split(',')[1].split('z:')[1])
            let area = new Area({x, z, blocks: value.blocks, matStore: this.matStore, range: 5, config: this.worldConfig})
            this.areas.push(area)
            this.scene.add(area.areaGroup)
        })
    }
    

    #addEvents(){
      window.requestAnimationFrame(this.#run.bind(this));
      window.addEventListener("resize", this.#onResize.bind(this), false);
    //   window.addEventListener("mousedown", this.controls.onMouseDown.bind(this), false)
    //   window.addEventListener("mouseup", this.controls.onMouseUp.bind(this), false)
    //   window.addEventListener("mousemove", this.controls.onMouseMove.bind(this), false)
    //   window.addEventListener("keydown", this.controls.onKeyDown.bind(this), false)
    //   window.addEventListener("keyup", this.controls.onKeyUp.bind(this), false)
    }
  
    #run() {
      requestAnimationFrame(this.#run.bind(this));
      this.#render();
    }
  
    #render() {
        // const delta = this.clock.getDelta();
        // this.controls.update( delta );
        // this.controls.update();
        this.areas.forEach(area => area.animate())
        this.renderer.render(this.scene, this.camera);
    }
  
    #onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
}
  
  