'use strict';

module.exports = function(Unity) {
    Unity.handleChangeError = function(err) {
        console.warn('No se puede actualizar para el modelo Unity:', err);
      };
};
