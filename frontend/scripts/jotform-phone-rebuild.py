#!/usr/bin/env python3
"""
Replace the split control_phone field with a single-input control_textbox
on the two patient forms that have it. Same name='phone' so any Keragon
or webhook integration keyed by field name keeps working. The qid changes,
so any integration keyed by qid (2) needs updating.

Idempotent: skips forms where q2 is already not a control_phone.
"""
import os, sys, json, urllib.request, urllib.parse, urllib.error

API = 'https://hipaa-api.jotform.com'
KEY = os.environ.get('JOTFORM_API_KEY')
if not KEY:
    print('Set JOTFORM_API_KEY', file=sys.stderr); sys.exit(1)

FORMS = ['261267150831049', '261265432029150']


def http(method, path, fields=None, body=None):
    url = f'{API}{path}?apiKey={KEY}'
    data = None
    headers = {}
    if body is not None:
        data = json.dumps(body).encode()
        headers['Content-Type'] = 'application/json'
    elif fields:
        data = urllib.parse.urlencode(fields).encode()
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        body_text = e.read().decode()
        return {'responseCode': e.code, 'error': body_text}


def phone_already_exists(fid):
    """Check if any question of type control_textbox with name=phone exists."""
    qs = http('GET', f'/form/{fid}/questions').get('content', {})
    for q in qs.values():
        if q.get('name') == 'phone' and q.get('type') == 'control_textbox':
            return True
    return False


def main():
    for fid in FORMS:
        print(f'\n=== {fid} ===')
        if phone_already_exists(fid):
            print(f'  textbox phone already exists, skipping')
            continue

        q_resp = http('GET', f'/form/{fid}/question/2')
        if q_resp.get('responseCode') == 200:
            q = q_resp['content']
            order = q.get('order', '2')
            text = q.get('text', 'Phone')
            required = q.get('required', 'Yes')
            if q.get('type') == 'control_phone':
                d = http('DELETE', f'/form/{fid}/question/2')
                print(f'  delete old q2: {d.get("responseCode")}')
        else:
            print('  q2 not found (already deleted), creating fresh')
            order, text, required = '2', 'Phone', 'Yes'

        # Create new textbox in its place. New qid is assigned by JotForm.
        fields = {
            'questions[0][type]': 'control_textbox',
            'questions[0][text]': text,
            'questions[0][name]': 'phone',
            'questions[0][order]': order,
            'questions[0][required]': required,
            'questions[0][inputMask]': '(###) ###-####',
            'questions[0][inputMaskValue]': '(###) ###-####',
            'questions[0][masked]': 'Yes',
            'questions[0][hint]': '(555) 555-5555',
            'questions[0][size]': '40',
        }
        # JotForm requires JSON body for PUT /form/{id}/questions, not form-urlencoded.
        body = {'questions': {'0': {
            'type': 'control_textbox',
            'text': text,
            'name': 'phone',
            'order': order,
            'required': required,
            'inputMask': '(###) ###-####',
            'inputMaskValue': '(###) ###-####',
            'masked': 'Yes',
            'hint': '(555) 555-5555',
            'size': '40',
        }}}
        c = http('PUT', f'/form/{fid}/questions', body=body)
        print(f'  create: {c.get("responseCode")} qid={(c.get("content") or [{}])[0].get("qid")}')


if __name__ == '__main__':
    main()
