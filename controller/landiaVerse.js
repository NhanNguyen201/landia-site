const helpers = require('../helpers/helperFunctions')
const { urlFor } = require('../helpers/sanityClient')

module.exports.getWorld = async(req, res) => {
    try {
        const data = await helpers.getAllBlock()

        const worldConfig = await helpers.getWorldSetting({size: data.length})

        const builtImgData = data.map(block => ({
            ...block, mainImage: urlFor(block.mainImage).url()
        }))

        return res.render("index", { world: JSON.stringify({data: {blocks: builtImgData, worldConfig}}) })
    } catch (error) {
        return res.render("index", { world: JSON.stringify({data: {blocks: [], worldConfig: {}}}) })
    }
}