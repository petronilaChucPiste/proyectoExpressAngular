var express = require('express');
var router = express.Router();
var movieHelper = require('../modules/MoviesHelper/index');
 /*
	movieHelper.search({query,title,year})
	movieHelper.getDetail(id,plotSize);
	movieHelper.getRandomSeach()
 */
var resultJson;
router.get('/', function(req, res) {

 
 	 res.render('index', { title: 'Home' });
  

});


router.get('/searchAngular', function(req, res) {


	var parametro=req.query.nombre;
if (parametro=='')
	parametro='marvel';
  res.render('resultados', { title: 'searchAngular' ,param: parametro, error:{status:500,message: 'Oops, something went wrong.'} });
});






router.get('/detail', function(req, res) {

  res.render('detail', { title: 'Detail' , error:{status:500,message: 'Oops, something went wrong.'} });
});

 




/*POST busqueda*/
router.post('/searchMovie', function(req, res) {

	var param=JSON.stringify(req.body);

	var nameMovie= req.param('nombre', req.query.nombre);
	var yearMovie= req.param('year', req.query.year);
	var pageMovie= req.param('page', req.query.page);


  	movieHelper.search({query:nameMovie,year:yearMovie, page:pageMovie}).then(function (result) {
 	// body...
 	res.json(result);
 
	 },function (errores) {
	 	res.json(errores);
	 	 
	 });


});
 
/* GET home page.  */
router.get('/searchDetail', function(req, res) {
 	//var param=JSON.stringify(req.body);
 
var nameMovie=req.query.nombre || '';
 if (nameMovie!='') {
 

  	movieHelper.getDetail(nameMovie,movieHelper.PLOTSIZE.FULL).then(function (result) {
 	// body...

 	 

 	  if(result.Response=='True')
 		 	res.render('detail', { title: 'Detail',movieResult:result});
 		else{
 			res.render('error', { title: 'Error' , error:{status:418,message: " I'm a teapot, \n  XD"} });
 		}
 },function (error) {
 	// body...
 	 res.render('error', { title: 'Error',error:error});
 });

 }

 else{

	res.render('error', { title: 'Error' , error:{status:404,message: 'Oops, something went wrong.'} });
 };



});
 
/*post */
router.post('/random', function(req, res, next) {

	movieHelper.getRandomSearch().then(function (result) {

 	res.json(result);
 	console.log(result);


	 },function (error) {
	 		res.json(error);
	 })

});
 



module.exports = router;
