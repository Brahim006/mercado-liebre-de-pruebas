const dataModel = require("../utils/dataModel");

const productsModel = dataModel("products");

const controller = {
	index: (req, res) => {
		let visited = productsModel.getAllByField("category", "visited");
		let inSale = productsModel.getAllByField("category", "in-sale");

		res.render("main/index", {visited, inSale});
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
