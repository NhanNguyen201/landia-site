console.log("world: ", world)
console.log("position: ", position)
app = new App({world: JSON.parse(world).data, position: JSON.parse(position)})
app.init()