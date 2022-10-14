const helpers = require('../helpers/helperFunctions')
const { urlFor } = require('../helpers/sanityClient')

module.exports.getWorld = async(req, res) => {
    try {
        const { x, y, z } = req.query
        const position = {
            x: Number(x) || 2.5,
            y: Number(y) || 1,
            z: Number(z) || 15,
        }
        const data = await helpers.getAllBlock()

        const worldConfig = await helpers.getWorldSetting({size: data.length})

        const builtImgData = data.map(block => ({
            ...block, mainImage: urlFor(block.mainImage).url()
        }))

        return res.render("index", { 
            world: JSON.stringify({data: {blocks: builtImgData, worldConfig}}),
            position: JSON.stringify(position)
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.render("index", { 
            world: JSON.stringify({data: {blocks: [], worldConfig: {}}}) ,
            position: JSON.stringify(position)
        })
    }
}
// module.exports.getWorld = (req, res) => {
//     try {
//         const { x, y, z } = req.query
//         const position = {
//             x: Number(x) || 2.5,
//             y: Number(y) || 1,
//             z: Number(z) || 15,
//         }
//         // const data = await helpers.getAllBlock()

//         // const worldConfig = await helpers.getWorldSetting({size: data.length})

//         // const builtImgData = data.map(block => ({
//         //     ...block, mainImage: urlFor(block.mainImage).url()
//         // }))

//         return res.render("index", { 
//             world: JSON.stringify({data: {blocks: [], worldConfig: {}}}) ,
//             position: JSON.stringify(position)
//         })
//     } catch (error) {
//         console.log("Error: ", error)
//         return res.render("index", { 
//             world: JSON.stringify({data: {blocks: [], worldConfig: {}}}) ,
//             position: JSON.stringify(position)
//         })
//     }
// }