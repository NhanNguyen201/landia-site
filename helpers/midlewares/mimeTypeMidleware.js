module.exports = (req, res, next) => {
    if(req.file.mimetype === 'image/png' ||
        req.file.mimetype === 'image/svg' ||
        req.file.mimetype === 'image/jpeg' ||
        req.file.mimetype === 'image/gif' ||
        req.file.mimetype === 'image/tiff'
    ) {
        next()
    } else {
        res.status(400).json({error: "wrong type input"})
    }
}