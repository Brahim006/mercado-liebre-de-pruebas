module.exports = {
    /** DE USO INTERNO - Reemplaza las comas por puntos */
    toThousand: function(n){
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    /**
     * Parsea el precio de los productos para que estos puedan ser mostrados de manera
     * correcta en las vistas que se carguen. Inserta las siguientes propiedades.
     *      product.parsedPrice : El precio del producto cuyos miles se separan por puntos
     *                            (ej: 1000 = 1.000).
     *      product.parsedDiscount : El porcentaje de descuento (siempre y cuando éste sea 
     *                               mayor a 0) como cadena (ej: 10 = "10%").
     *      product.discountedPrice : El "precio final" con el descuento ya aplicado (siempre
     *                                y cuando éste sea mayor a 0),
     *                                (ej: 100 y "50%" = 50).
     * Es recomendable su aplicación antes de enviar el producto a las vistas que requieran
     * mostrar estas propiedades.
     * @param {object} product El objeto producto sobre el cual se quiera parsear.
     * @returns {object} El mismo objeto product pero con las propiedades "parsedPrice", 
     *                   "parsedDiscount" y "discountedPrice" ya añadidas.
     */
    parse: function(product){
        // Se añaden los precios procesados para mostrarlos como cadenas
        product.parsedPrice = this.toThousand(product.price);

        if(product.discount != 0){ // En caso de que haya descuento, se aplica
            // Se parsea el porcentaje de descuento para mostrarlo como cadena
            product.parsedDiscount = product.discount + "%";
            product.discountedPrice = this.toThousand(product.price - product.price * (product.discount / 100));
        }
        
        return product;
    },
}