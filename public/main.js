$(document).ready(function() {
  const update = $('#update-button');

  update.addEventListener('click', _ => {
    fetch('/restaurants', {
      method: 'put',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({
        name: $('#new-name').value,
        address: $('#new-address').value,
        city: $('#new-city').value,
        state: $('#new-state').value,
        zipcode: $('#new-zipcode').value,
        phone: $('#new-phone').value,
        type: $('#new-type').value
      })
    })
  });

})
