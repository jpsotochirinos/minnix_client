'use strict';

module.exports = function(Impost) {
    Impost.handleChangeError = function(err) {
        console.warn('No se puede actualizar para el modelo Product:', err);
      };
};
