'use strict';

module.exports = function(Type) {
    Type.handleChangeError = function(err) {
        console.warn('No se puede actualizar para el modelo Product:', err);
      };
};
