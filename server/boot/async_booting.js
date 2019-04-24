'use strict';


module.exports = function(server) {
    //var app = require('../../server/server');
    

    var since = { push: -1, pull: -1 };
    
    // var LocalProduct = server.models.Product;
    // var RemoteProduct = server.models.productremote;
    
    server.network = {
        _isConnected: true,
        get isConnected() {
          console.log("Here is a conenectec funcion");
          console.log('isConnected?', this._isConnected);
          return this._isConnected;
        },
        set isConnected(value) {
          this._isConnected = value;
        }
      };
    
     var LocalCategory = server.models.Category;
     var RemoteCategory = server.models.Categoryremote;
    var LocalUnity = server.models.Unity;
    var RemoteUnity = server.models.Unityremote;
    var LocalImpost = server.models.Impost;
    var RemoteImpost = server.models.Impostremote;
    var LocalType = server.models.Type;
    var RemoteType = server.models.Typeremote;

    function syncUnity() {
        
      // It is important to push local changes first,
      // that way any conflicts are resolved at the client
      // Funcion de replicacion de Unity
      LocalUnity.replicate(
        since.push,
        RemoteUnity,
        function pushed(err, conflicts, cps) {
          if (conflicts)handleConflicts(conflicts)
          since.push = cps;
          RemoteUnity.replicate(
            since.pull,
            LocalUnity,
            function pulled(err, conflicts, cps) {
              if (conflicts)handleConflicts(conflicts.map(function(c) { return c.swapParties(); }));
              console.log("Here is a cps");
              console.log(cps);
              since.pull = cps;
            });
        });
    }
    function syncCategory() {  
      //Funcion de replicacion de Category
      LocalCategory.replicate(
        since.push,
        RemoteCategory,
        function pushed(err, conflicts, cps) {
          if (conflicts)handleConflicts(conflicts)
          since.push = cps;
          RemoteCategory.replicate(
            since.pull,
            LocalCategory,
            function pulled(err, conflicts, cps) {
              if (conflicts)handleConflicts(conflicts.map(function(c) { return c.swapParties(); }));
              console.log("Here is a cps");
              console.log(cps);
              since.pull = cps;
            });
        });
      }
      function syncImpost() { 
      // Funcion de repliacion de Impost
      LocalImpost.replicate(
        since.push,
        RemoteImpost,
        function pushed(err, conflicts, cps) {
          if (conflicts)handleConflicts(conflicts)
          since.push = cps;
          RemoteImpost.replicate(
            since.pull,
            LocalImpost,
            function pulled(err, conflicts, cps) {
              if (conflicts)handleConflicts(conflicts.map(function(c) { return c.swapParties(); }));
              console.log("Here is a cps");
              console.log(cps);
              since.pull = cps;
            });
        });
      }
      function syncType() { 
      // Funcion de repliacion de Type
      LocalType.replicate(
        since.push,
        RemoteType,
        function pushed(err, conflicts, cps) {
          if (conflicts)handleConflicts(conflicts)
          since.push = cps;
          RemoteType.replicate(
            since.pull,
            LocalType,
            function pulled(err, conflicts, cps) {
              if (conflicts)handleConflicts(conflicts.map(function(c) { return c.swapParties(); }));
              console.log("Here is a cps");
              console.log(cps);
              since.pull = cps;
            });
        });
    }
    // Obserbador de Unity de guardado y eliminado
    LocalUnity.observe('after save', function(ctx, next) {
      next();
      syncUnity(); // in background
    });
    LocalUnity.observe('after delete', function(ctx, next) {
      next();
      syncUnity(); // in background
    });
    // Obserbador de Category de guardado y eliminado
    LocalCategory.observe('after save', function(ctx, next) {
      next();
      syncCategory(); // in background
    });
    LocalCategory.observe('after delete', function(ctx, next) {
      next();
      syncCategory(); // in background
    });
    // Obserbador de Impost de guardado y eliminado
    LocalImpost.observe('after save', function(ctx, next) {
      next();
      syncImpost(); // in background
    });
    LocalImpost.observe('after delete', function(ctx, next) {
      next();
      syncImpost(); // in background
    });
    // Obserbador de Type de guardado y eliminado
    LocalType.observe('after save', function(ctx, next) {
      next();
      syncType(); // in background
    });
    LocalType.observe('after delete', function(ctx, next) {
      next();
      syncType(); // in background
    });

    //server.sync = sync;
    function handleConflicts(conflicts) {
      // TODO notify user about the 
      console.log("Here is a conflicts");
      console.log(conflicts);
      
    }
  };
  