const fs = require('fs');
const path = require('path');
const dataModel = require('../utils/dataModel');
const priceParser = require("../utils/priceParser");
const { check, validationResult, body } = require("express-validator");

const productsModel = dataModel("products");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let products = productsModel.all()
		// Parseo los precios y porcentajes de todos los productos antes de mandarlos
		products = products.map(product =>{
			return priceParser.parse(product);
		});

		res.render("products/products", { products });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let product = productsModel.getByField("id", id);

		if(product){
			res.render("products/detail", {product: priceParser.parse(product)});
		} else {
			res.redirect("/products");
		}
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("products/product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Array de errores
		let errors = validationResult(req);
		// Obtengo los nombres de todas las imágenes amacenadas en disco
		let img = [];
		req.files.forEach(image => {
			img.push(image.filename);
		});
		
		if(errors.isEmpty()){

			let product = req.body;
			product.images = img;
	
			productsModel.store(product);
	
			res.redirect("/products");
		} else {

			// Borro las imágenes que se hayan subido
			productsModel.deleteImages(img);

			res.render("products/product-create-form", 
			{ 
				errors : errors.mapped(),
			  	product : req.body
			});
		}

	},

	// Update - Form to edit
	edit: (req, res) => {

		let id = req.params.id;
		let product = productsModel.getByField("id", id);

		// Comprueba si se ha requerido un producto existente
		if(product){
			res.render("products/product-edit-form", {product});
		} else {
			res.redirect("/products");
		}

	},
	
	// Update - Method to update
	update: (req, res) => {

		let errors = validationResult(req);
		let product = req.body;

		if(errors.isEmpty()){ // Si todos los campos son válidos
			// Obtengo las imágenes y cargo las nuevas (si las hay)
			let img = productsModel.getByField("id", req.params.id).images;
			if(req.files){
				req.files.forEach(image => {
					img.push(image.filename);
				});
			}

			// Borro las imágenes que se hayan seleccionado
			if(product.deletePhoto){
				productsModel.deleteImages(product.deletePhoto);
				img = img.filter(image => {
					return !product.deletePhoto.includes(image);
				});
			}

			// Le inserto su ID y susbimágenes
			product.id = req.params.id;
			product.images = img;
			// Actualización en BD
			productsModel.update(product);
	
			res.redirect("/products/" + product.id);
		} else {
			// Borra las imágenes que se hayan subido
			if(req.files){
				productsModel.deleteImages(req.files);
			}
			res.render("products/product-edit-form",
				{
					errors : errors.mapped(),
					product : product
				}
			);
		}

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Obtengo las imágenes asociadas al producto a borrar
		let images = productsModel.getByField("id", req.params.id).images;
		// Borro las imágenes
		productsModel.deleteImages(images);
		// Borrado de la base de datos
		productsModel.delete(req.params.id);

		res.redirect("/products");
	}
};

module.exports = controller;