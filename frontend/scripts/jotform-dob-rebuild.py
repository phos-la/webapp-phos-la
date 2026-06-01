#!/usr/bin/env python3
"""
Replace the 3-select control_birthdate field with a single control_textbox
that uses a date mask (MM/DD/YYYY). JotForm's birthdate widget is hard-coded
to render three dropdowns, so a real single-input requires a type swap.

Same name='dateOfBirth' so any Keragon or webhook integration keyed by
field name keeps working. The qid changes.

Idempotent: skips forms where q1 is already a textbox.
"""
import os, sys, json, urllib.request, urllib.parse, urllib.error

API = 'https://hipaa-api.jotform.com'
KEY = os.environ.get('JOTFORM_API_KEY')
if not KEY:
    print('Set JOTFORM_API_KEY', file=sys.stderr); sys.exit(1)

# Only at-home and new-patient have DOB; existing-patient is just email.
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
        return {'responseCode': e.code, 'error': e.read().decode()}


def dob_textbox_exists(fid):
    qs = http('GET', f'/form/{fid}/questions').get('content', {})
    for q in qs.values():
        if q.get('name') in ('dateOfBirth', 'dob') and q.get('type') == 'control_textbox':
            return True
    return False


def main():
    for fid in FORMS:
        print(f'\n=== {fid} ===')
        if dob_textbox_exists(fid):
            print(f'  textbox DOB already exists, skipping')
            continue

        q_resp = http('GET', f'/form/{fid}/question/1')
        if q_resp.get('responseCode') == 200:
            q = q_resp['content']
            order = q.get('order', '1')
            text = q.get('text', 'Date of Birth')
            required = q.get('required', 'Yes')
            if q.get('type') == 'control_birthdate':
                d = http('DELETE', f'/form/{fid}/question/1')
                print(f'  delete old q1: {d.get("responseCode")}')
            else:
                print(f'  q1 is {q.get("type")}, not deleting, proceeding to create')
        else:
            print('  q1 not found, creating fresh')
            order, text, required = '1', 'Date of Birth', 'Yes'

        body = {'questions': {'0': {
            'type': 'control_textbox',
            'text': text,
            'name': 'dateOfBirth',
            'order': order,
            'required': required,
            'inputMask': '##/##/####',
            'inputMaskValue': '##/##/####',
            'masked': 'Yes',
            'hint': 'MM/DD/YYYY',
            'size': '40',
        }}}
        c = http('PUT', f'/form/{fid}/questions', body=body)
        content = c.get('content') or []
        qid = content[0].get('qid') if content else None
        print(f'  create: {c.get("responseCode")} qid={qid}')


if __name__ == '__main__':
    main()
