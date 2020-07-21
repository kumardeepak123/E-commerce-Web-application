var braintree = require("braintree");
const e = require("express");


var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'your merchantId',
    publicKey:    'your publicKey',
    privateKey:   'your privateKey'
});


exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, function (err, response) {
       if(err)
       {
            res.status(500).send(err);
       }
       else{
        res.status(500).send(response);

       }
      });
}

exports.processPayment=(req,res)=>{
let nonceFromTheClient =req.body.paymentMethodNonce ;
let amountFromClient =req.body.amount ;

    gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err)
          {
              res.status(500).json(err) ;
          }else{
              res.json(result);
          }
      });
}