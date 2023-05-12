const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const localhost = '127.0.0.1'
const sqlite3 = require('sqlite3').verbose();
const PATH = "./curriculo.db";

const app = express();

// LETRA C NO CRUD 
app.post('/insereFormacao', urlencodedParser, (req,res)=> {
	res.statusCode = 200;
    var db = new sqlite3.Database(PATH); // Abre o banco
	sql = "INSERT INTO TblFORMACAO (DATA_DE_INICIO, DATA_DE_CONCLUSAO, CURSO, DESCRICAO) VALUES ('" + req.body.DATA_DE_INICIO + "', '" + req.body.DATA_DE_CONCLUSAO + "', '" + req.body.CURSO + "', '" + req.body.DESCRICAO + "')";
    console.log(sql);
	db.run(sql, [],  (err, rows) => {
		if (err) {
		    console.log(err);
		}
        res.json(rows);	
	});
	db.close(); // Fecha o banco
	res.end();
})

// LETRA R NO CRUD 
app.get('/listaFormacao', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT * FROM TblPESSOA';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);//
		});
		db.close(); // Fecha o banco
})

//   LETRA U NO CRUD GETPOST
app.get('/atualizaFormacao', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'SELECT * FROM TblaPESSOA WHERE ID_PESSOA=' + req.query.ID_PESSOA;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})
//   LETRA U NO CRUD GETPOST
app.post('/atualizaFormacao', (req,res) => {
    var db = new sqlite3.Database(PATH); // Abre o banco
    var sql = 'UPDATE TblPESSOA SET ID_PESSOA=' + req.query.ID_PESSOA;//?
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
})

// LETRA D NO CRUD
app.get('/removeFormacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM TblPESSOA WHERE ID_PESSOA='" + req.query.ID_PESSOA + "'";
	var db = new sqlite3.Database(PATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        res.json(rows);
		res.write('<p>tchau formacao');
		res.end();
	});
	db.close(); // Fecha o banco
});
app.listen(3030, localhost, () => {
    console.log('Servidor rodando em http://localhost:3030/');})

