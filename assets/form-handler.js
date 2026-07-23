(function () {
  'use strict';

  var EMAIL = 'jay.lorino@leadingedgemgt.com';

  function val(form, selector) {
    var el = form.querySelector(selector);
    return el && el.value ? el.value.trim() : '';
  }

  function showNotice(form, message) {
    var existing = form.querySelector('.form-notice');
    if (existing) existing.remove();
    var note = document.createElement('p');
    note.className = 'form-notice';
    note.textContent = message;
    note.style.cssText = 'margin-top:16px;font-size:14px;color:#1D3121;line-height:1.5;';
    form.appendChild(note);
  }

  document.querySelectorAll('form[data-le-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var subject = form.getAttribute('data-subject') || 'LeadingEdge Website Inquiry';
      var lines = [];
      var inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(function (input) {
        if (!input.name && !input.placeholder) return;
        if (input.type === 'radio' && !input.checked) return;
        var label = input.closest('div') && input.closest('div').querySelector('label');
        var key = label ? label.textContent.trim() : (input.name || input.placeholder);
        var value = input.value.trim();
        if (value) lines.push(key + ': ' + value);
      });
      if (!lines.length) {
        showNotice(form, 'Please fill in at least one field before sending.');
        return;
      }
      var body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
      showNotice(form, 'Your email app should open shortly. If it does not, email us at ' + EMAIL + '.');
    });
  });
})();
