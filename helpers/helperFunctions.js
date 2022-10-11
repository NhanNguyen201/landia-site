const { client, writeClient } = require('./sanityClient')
module.exports.calcPositions = pos => {
    let roundPos = Math.round(pos)
    const areaSize = 3
    const posRem = {
        '2': -1,
        '1': 1,
        '0': 0,
        '-0': 0,
        '-1': -1,
        '-2': 1
    }
    const rem = {
        '0': 0,
        '-0': 0,
        '1': 0,
        '-1': 0,
        '2': 1,
        '-2': -1
    }
    return  {
        newPos: pos ? posRem[String(roundPos % areaSize)] : 0,
        area: pos ? Math.trunc(roundPos / areaSize) + rem[String(roundPos % areaSize)] : 0
    }
}
module.exports.checkVisibleBlock = ({x, y, z, areaX, areaZ}) => {
    
    return new Promise((resolve, reject) => {
        client.fetch(`*[_type == "sideImage" &&  block.x == ${x} && block.y == ${y} && block.z == ${z} && area.x == ${areaX} && area.z == ${areaZ}]{
            user
        }`)
        .then(data => {
            if(data[0]){
                resolve({
                    isThere: Boolean(data[0]),
                    user: data[0].user
                })
            } else {
                resolve({
                    isThere: Boolean(data[0])
                })
            }
        })
        .catch(error => {
            console.log(error)
            reject("something is wrong");
        });
    });
}

module.exports.getAllBlock = () => {
    return new Promise((resolve, reject) => {
        client.fetch(`*[_type == "sideImage" ]{
            mainImage,
            area {
                x,
                z
            },
            block {
                x,
                y,
                z
            }
        }`)
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            console.log(error)
            reject("something is wrong");
        });
    });
}
module.exports.getWorldSetting = ({size}) => {
    return new Promise((resolve, reject) => {
        client.fetch(`*[_type == "siteSetting" && minBlocks < ${size} && maxBlocks > ${size}]`)
        .then(data => {
            resolve(data[0])
        })
        .catch(error => {
            console.log(error)
            reject("something is wrong");
        });
    });
}