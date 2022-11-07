var trash = document.getElementsByClassName("fa-trash-o");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const country = this.parentNode.parentNode.childNodes[3].innerText
    const rankhigh = this.parentNode.parentNode.childNodes[5].innerText
    const numberGrandSlam = this.parentNode.parentNode.childNodes[7].innerText
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleteName: name,
        deleteCountry: country,
        deleteRankHigh: rankhigh,
        deleteGrandSlam: numberGrandSlam
      }),
    }).then(function (response) {
      window.location.reload()
    })
  });
});










