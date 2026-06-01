#!/usr/bin/env python3
"""
Apply the Phos brand to the three patient-facing JotForms.

What this does:
1. Pushes a unified injectCSS that fixes the date-of-birth wrap (3 dropdowns
   on one line), name first/last alignment, signature pad framing, button
   centering, and Phos brand palette.
2. Switches the two phone fields from control_phone (split area code + number)
   to control_phoneSimple (single E.164 input).
3. Turns on showHIPAABadge for all three forms so the footer is consistent.

Reads JOTFORM_API_KEY from environment. The Phos account is in HIPAA Safe
mode so we route through hipaa-api.jotform.com.

Idempotent. Re-run anytime to re-apply.

Forms:
  261267150831049  Phos At-Home Patient
  261265432029150  Phos New Online Patient
  261265681381157  Phos Existing Online Patient
"""
import os, sys, json, urllib.request, urllib.parse

API = 'https://hipaa-api.jotform.com'
KEY = os.environ.get('JOTFORM_API_KEY')
if not KEY:
    print('Set JOTFORM_API_KEY in env', file=sys.stderr); sys.exit(1)

FORMS = {
    '261267150831049': {'phone_qid': '2', 'label': 'At-Home'},
    '261265432029150': {'phone_qid': '2', 'label': 'New Patient'},
    '261265681381157': {'phone_qid': None, 'label': 'Existing Patient'},
}

# Phos brand. Teal CTA matches the site's "Book a consultation" pill.
# Cream bg, cormorant headers, inter body.
BRAND_CSS = """@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

body, .supernova {
  background: #ede8dc !important;
}

.form-all {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  background: #fff !important;
  color: #1e3a48 !important;
  border: 0 !important;
  box-shadow: 0 4px 24px rgba(30,58,72,0.08) !important;
  border-radius: 20px !important;
  max-width: 560px !important;
  margin: 40px auto !important;
  padding: 40px 36px !important;
}

.form-header-group, .form-header-group * {
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  color: #1e3a48 !important;
}
.form-header {
  font-weight: 400 !important;
  font-size: 28px !important;
  letter-spacing: -0.01em !important;
}
.form-subHeader {
  font-family: 'Inter', sans-serif !important;
  color: #4a5568 !important;
  font-size: 14px !important;
  font-weight: 400 !important;
}

.form-label, .form-sub-label {
  font-family: 'Inter', sans-serif !important;
  color: #1e3a48 !important;
  font-weight: 600 !important;
  font-size: 13px !important;
  letter-spacing: 0.02em !important;
}
.form-sub-label {
  color: #6b7280 !important;
  font-weight: 400 !important;
  font-size: 11px !important;
  margin-top: 4px !important;
}

/* All inputs */
.form-textbox,
.form-textarea,
.form-dropdown,
.form-phone,
.form-phone-area-code,
.form-phone-extension,
.form-fullname-prefix,
.form-fullname-first,
.form-fullname-middle,
.form-fullname-last,
.form-fullname-suffix,
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
select.form-dropdown {
  border: 1.5px solid #e5e7eb !important;
  border-radius: 10px !important;
  padding: 11px 14px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  color: #1e3a48 !important;
  background: #fff !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
  box-sizing: border-box !important;
  height: auto !important;
}
.form-textbox:focus,
.form-textarea:focus,
.form-dropdown:focus,
input:focus,
select:focus {
  border-color: #358c7a !important;
  outline: 0 !important;
  box-shadow: 0 0 0 3px rgba(53,140,122,0.12) !important;
}

.form-line {
  padding: 12px 0 !important;
  display: block !important;
  width: 100% !important;
}
.form-input,
.form-input-wide {
  width: 100% !important;
  max-width: 100% !important;
  margin-left: 0 !important;
}

/* Date of Birth: three dropdowns side by side, no wrap. */
.form-birthdate {
  display: flex !important;
  flex-wrap: nowrap !important;
  gap: 12px !important;
  width: 100% !important;
}
.form-birthdate > span {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}
.form-birthdate select {
  width: 100% !important;
}

/* Fullname: first + last side by side. */
.form-fullname {
  display: flex !important;
  flex-wrap: nowrap !important;
  gap: 12px !important;
  width: 100% !important;
}
.form-fullname > span {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}
.form-fullname input {
  width: 100% !important;
}

/* Phone: when split (legacy), let area code + number wrap predictably. */
.form-phone {
  width: 100% !important;
}
.form-input .form-phone-wrapper {
  display: flex !important;
  gap: 12px !important;
  width: 100% !important;
}

.form-required {
  color: #b88c50 !important;
  margin-left: 2px !important;
}

.form-buttons-wrapper {
  text-align: center !important;
  padding: 8px 0 0 !important;
  margin: 0 !important;
  display: block !important;
  width: 100% !important;
}

.form-submit-button,
button.form-submit-button,
input.form-submit-button,
.form-submit-button-simple {
  background: #358c7a !important;
  color: #fff !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  letter-spacing: 0.04em !important;
  padding: 14px 32px !important;
  border-radius: 999px !important;
  border: 0 !important;
  cursor: pointer !important;
  transition: background 0.2s !important;
  width: 100% !important;
  max-width: 320px !important;
  margin: 16px auto 0 !important;
  text-shadow: none !important;
  display: block !important;
  text-transform: none !important;
}
.form-submit-button:hover {
  background: #2a705f !important;
}

.signature-pad-wrapper,
.form-signature-pad {
  border-radius: 12px !important;
  border: 1.5px solid #e5e7eb !important;
  background: #fff !important;
}

/* Error states */
.form-line-error {
  background: transparent !important;
}
.form-error-message {
  background: #fef2f2 !important;
  color: #991b1b !important;
  border-radius: 6px !important;
  padding: 6px 10px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 12px !important;
}

/* HIPAA badge in footer: keep tidy. */
.form-hipaa-badge {
  background: #f4f1ea !important;
  border-radius: 12px !important;
  padding: 16px !important;
  margin-top: 16px !important;
}
"""


def http(method, path, fields=None):
    url = f'{API}{path}?apiKey={KEY}'
    data = None
    headers = {}
    if fields:
        data = urllib.parse.urlencode(fields).encode()
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read().decode())


def main():
    for fid, meta in FORMS.items():
        print(f'\n=== {fid}  {meta["label"]} ===')

        # 1. Push injectCSS + showHIPAABadge + width.
        props = {
            'properties[injectCSS]': BRAND_CSS,
            'properties[showHIPAABadge]': 'Yes',
            'properties[formWidth]': '640',
            'properties[background]': '#ede8dc',
        }
        r = http('POST', f'/form/{fid}/properties', props)
        print(f'  properties: {r.get("responseCode")}')

        # 2. Phone field: swap to single-input type (control_phone -> control_phone with simple mode).
        # JotForm's phone widget supports a 'phoneSimple' mode that renders one input.
        if meta['phone_qid']:
            qid = meta['phone_qid']
            r = http('POST', f'/form/{fid}/question/{qid}',
                     {'question[type]': 'control_phone',
                      'question[inputMask]': '(###) ###-####',
                      'question[inputMaskValue]': '(###) ###-####',
                      'question[masked]': 'Yes',
                      'question[phoneSimple]': 'Yes',
                      'question[sublabels]': '{"country":"Country Code","area":"Area Code","phone":"Phone Number","full":"Phone Number"}'})
            print(f'  phone simple: {r.get("responseCode")}')

    print('\nDone. Reload each form to see the new styling.')


if __name__ == '__main__':
    main()
