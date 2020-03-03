
$(document).ready(() => {
  $('.logout').click(() => {
    $.ajax({
      method: 'GET',
      success: () => console.log('logout success'),
      error: (err) => console.error(err)
    })
  })
})
