module.exports = (req, res) => {
    req.app.locals.currentLink = 'user'
    res.render('admin/article-edit')
}