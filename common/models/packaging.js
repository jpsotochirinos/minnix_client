'use strict';

module.exports = function(Packaging) {
    Packaging.handleChangeError = function(err) {
        console.warn('No se puede actualizar para el modelo Product:', err);
      };
};
