class MatStore {
    constructor(){
        this.loader = new THREE.TextureLoader()
        this.mats = {}
    }
    async load(matArray){
        return Promise.all(matArray.map(m => this.loader.load(m.mainImage)))
        .then(data => {
            data.forEach((txt, idx) => this.mats[matArray[idx].mainImage] = txt)
        })
    }
    setMat(name, mat){
        this.mats[name] = mat
    }
    getMat(name){
        return this.mats[name]
    }
}