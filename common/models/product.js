'use strict';

module.exports = function(Product) {
    Product.handleChangeError = function(err) {
        console.warn('No se puede actualizar para el modelo Product:', err);
      };
};
