'use strict';

module.exports = function(Category) {
    Category.handleChangeError = function(err) {
        console.warn('No se puede actualizar para el modelo Product:', err);
      };
};
