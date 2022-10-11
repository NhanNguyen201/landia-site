const { writeClient } = require('../helpers/sanityClient')
const { checkVisibleBlock, calcPositions } = require('../helpers/helperFunctions')

module.exports.createImage = async (req, res) => {
    const fileBuffer = Buffer.from(req.file.buffer)
    const bodyPosition = JSON.parse(req.body.position)
    const bodyUser = JSON.parse(req.body.user)
    let resultPossition = {
        x: calcPositions(bodyPosition.x).newPos,
        y: bodyPosition.y || 0,
        z: calcPositions(bodyPosition.z).newPos,
        areaX: calcPositions(bodyPosition.x).area,
        areaZ: calcPositions(bodyPosition.z).area
    }
    writeClient.assets.upload('image', fileBuffer, { contentType: req.file.mimetype, filename: req.file.originalname })
        .then(document => {
            if(document?._id){
                const doc = {
                    _type: 'sideImage',
                    user: {
                        userId: bodyUser.userId,
                        userName: bodyUser.userName
                    },
                    mainImage: {
                        _type: "image",
                        asset: {
                            _type: "reference",
                            _ref: document._id,
                        },
                    },
                    block: {
                        x: resultPossition.x,
                        y: Number(JSON.parse(req.body.position).y) || 0,
                        z: resultPossition.z
                    },
                    area: {
                        x: resultPossition.areaX,
                        z: resultPossition.areaZ
                    }
                }
                writeClient.create(doc)
            } 
        })
        .then(() => {
            return res.json({message: `Added to Landia successfully to the area of {${resultPossition.areaX}, ${resultPossition.areaZ}} and the block of {${resultPossition.x}, ${resultPossition.y}, ${resultPossition.z}}`})
        })
        .catch(err => {
            return res.status(500).json({error: "Something is wrong"})
        })
}

module.exports.checkBlock = async (req, res) => {
    const bodyPosition = JSON.parse(req.body.position)
    let resultPossition = {
        x: calcPositions(bodyPosition.x).newPos,
        y: bodyPosition.y || 0,
        z: calcPositions(bodyPosition.z).newPos,
        areaX: calcPositions(bodyPosition.x).area,
        areaZ: calcPositions(bodyPosition.z).area
    }
    try {
        const data = await checkVisibleBlock(resultPossition)
        if(data.isThere){
            return res.json({
                message: `this area of {${resultPossition.areaX}, ${resultPossition.areaZ}} and block of {${resultPossition.x}, ${resultPossition.y}, ${resultPossition.z}} is unavailable. It belongs to ${data.user.userName} 😭`,
                blockStatus: 0
            })
        } else {
            return res.json({
                message: `this area of {${resultPossition.areaX}, ${resultPossition.areaZ}} and block of {${resultPossition.x}, ${resultPossition.y}, ${resultPossition.z}} is available. You can use it, 😍`,
                blockStatus: 1
            })
        }
    } catch (error) {
        return res.status(500).json({error: "Something is wrong"})
    }
}
