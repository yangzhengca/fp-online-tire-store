// var stripe = Stripe('pk_test_51J1nqnKmu8GjevWW184jdbbzj8Pr7DsBL8Q2LzWhLFXg5QuXAKrP1fIxmCuZCvHwspnlfIWyQoFT7qbmWYTtRwa000YvsF9qNF');

// var $form=$('#checkout-form');

// $form.submit((event)=>{
//     $('charge-error').addClass('hidden');
//     $form.find('button').prop('disabled',true);
//     Stripe.card.createToken({
//         number:$('#card-number').val(),
//         cvc:$('#card-cvc').val(),
//         exp_month:$('#card-expiry-month').val(),
//         exp_year:$('#card-expiry-year').val(),
//         name:$('#card-name').val()
//     },stripeResponseHandler);
//     return false;
// });

// function stripResponseHandler(status,response) {
//     if(response.error){
//         $('#charge-error').text(response.error.message);
//         $('#charge-error').removeClass('hidden');
//         $form.find('button').prop('disabled',false);
//     }else{
//         var token=response.id;
//         $form.append($('<input type="hidden" name="stripeToken"/>').val(token));
//         $form.get(0).submit();
//     }
// }

