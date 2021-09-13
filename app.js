const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
//load restaurant info
const ResList = require('./restaurant.json')

//setup express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//routing for static files
app.use(express.static('public'))

// --------routing-------------
//main page
app.get('/', (req, res) => {
  res.render('index',{ResList: ResList.results})
})
//dynamic routing for individual Restarurant
app.get('/restaurants/:restaurant_id', (req, res) => {
 
    let index = req.params.restaurant_id-1
    res.render('show',{restaurant: ResList.results[index]})
 })
//search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const search_result =ResList.results.filter(function(restaurant){
        return restaurant.name.toLowerCase().includes(keyword)
    })
    res.render('index',{ResList: search_result})
  })



// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})