(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form) return;
  var email = form.getAttribute('data-email') || '';
  var fail = 'That did not send. Email me' + (email ? ' at ' + email : '') + '.';
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    status.textContent = 'Sending…';
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j.success) { form.reset(); status.textContent = 'Message sent. I usually reply within a day.'; }
        else { status.textContent = fail; }
      })
      .catch(function () { status.textContent = fail; });
  });
})();
