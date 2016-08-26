var q = require("q");
var request = require("request");
var config = require("../config");


var makeReq = function(options){
  
  var defer = q.defer();
console.log(config.apiBaseUrl + options.url, config, options)
    request({
        method: 'GET',
        uri: config.apiBaseUrl + options.url, 
        json:true
    },
    function (error, response, body) {
        if (error) {
            defer.reject(error);
        } else {
            defer.resolve(body);
        }
        
    });

    return defer.promise;
}

module.exports = makeReq;