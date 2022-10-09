const  sanityClient = require('@sanity/client')
const  imageUrlBuilder = require('@sanity/image-url')
require('dotenv').config()
const client = sanityClient({
    projectId: process.env.SANITY_PRJ_ID,
    dataset: "production",
    apiVersion: '2022-09-04',
    useCdn: false,
})

const builder = imageUrlBuilder(client)
const writeClient = sanityClient({
    projectId: process.env.SANITY_PRJ_ID,
    dataset: "production",
    apiVersion: '2022-09-04',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
})


const urlFor = source => builder.image(source)

module.exports = {
    client,
    writeClient,
    urlFor   
}