$(document).ready(function(){
    //Set textbox type to number, make provision for the base task
    //Tell the user if the input box is empty and also make provision for any error message
    //We might need to get the base and not the latest
    const access_key = "daf3474557a166dc25cf0ffa61f537d3";
    $('.form-inline-converter').submit(function(event){
        var endpoint = 'convert';
        var valAmount =  $("form :input[name='convertValue']").val();
        var fromValue = $("#FromCurrency option:selected").val();
        var toValue = $("#ToCurrency option:selected").val()
        //url:'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key + '&from=' + fromValue + '&to='+ toValue + '&amount=' + valAmount,

        if(!valAmount) return alert("Value can't be empty")
        $.ajax({
            url:'http://data.fixer.io/api/latest?access_key=' + access_key,
            dataType:'jsonp',
            success: function(json){
                if(!json.success && !valAmount){
                    alert(json.error.info)
                }
                else{
                    if(fromValue != 'EUR'){
                        var getFromRate = getValues(json.rates, fromValue);
                        var getToRate = getValues(json.rates, toValue);
                        // var baseToConversionUnit =   valAmount * getToRate / getFromRate;
                        var convertedValue = valAmount * getToRate / getFromRate;
                        alert(valAmount + " " + fromValue + " to " + toValue + " is " + convertedValue.toFixed(2));
                        // console.log(toVal);
                        // console.log('100 euros in GBP is ' + json.rates);
                    }
                    else{
                        var convertedValue = valAmount * getValues(json.rates,toValue);
                        alert(valAmount + " " + fromValue + " to " + toValue + " is " + convertedValue);
                        // alert()
                    }
                }
            },
            fail: function(xhr, statusText, body){
                alert("Please try again later.")
            }
        })
        event.preventDefault();
    })

    //return an array of values that match on a certain key
    function getValues(obj, key) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getValues(obj[i], key));
            } else if (i == key) {
                objects.push(obj[i]);
            }
        }
        return objects;
    }
})