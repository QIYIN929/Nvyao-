# -*- coding: utf-8 -*-
"""从聊斋 OCR 文本库提取文言文原文，生成 public/texts_wenyan.json"""
import json
import os
import re
import sys
import unicodedata

sys.stdout.reconfigure(encoding='utf-8')

LIAOZHAI_DIR = r'c:\Users\39241\OneDrive\桌面\大创资料\liaozhai_output(1)\liaozhai_output'
ENTRIES_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'entries.json')
OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'texts_wenyan.json')
CORPUS = '聊斋志异'


def norm(s):
    return unicodedata.normalize('NFKC', str(s or '')).strip()


def normalize_entry_title(title):
    return re.sub(r'[（(][^）)]*[）)]', '', norm(title)).strip()


def parse_filename(fname):
    base = os.path.splitext(fname)[0]
    m = re.match(r'^(\d+)_(.+)$', base)
    if not m:
        return ''
    rest = m.group(2)
    title = re.sub(r'卷[一二三四五六七八九十百零〇两]+$', '', rest)
    title = re.sub(r'第[一二三四五六七八九十百零〇两]+$', '', title)
    return norm(title)


def extract_classical(raw):
    text = raw.strip()
    lines = text.splitlines()
    if lines:
        lines = lines[1:]
    text = '\n'.join(lines).strip()
    for pattern in (r'原文原文\s*⇛\s*段译', r'原文\s*⇛\s*段译'):
        m = re.search(pattern, text)
        if m:
            text = text[m.end():]
            break
    text = re.sub(r'上一章目录下一章完善\s*$', '', text)
    text = re.sub(r'完善\s*$', '', text)
    return text.strip()


def load_liaozhai_wenyan():
    wenyan = {}
    if not os.path.isdir(LIAOZHAI_DIR):
        return wenyan
    for fname in os.listdir(LIAOZHAI_DIR):
        if not fname.endswith('.txt'):
            continue
        title = parse_filename(fname)
        if not title:
            continue
        path = os.path.join(LIAOZHAI_DIR, fname)
        with open(path, encoding='utf-8', errors='ignore') as f:
            raw = f.read()
        text = extract_classical(raw)
        if text:
            wenyan[title] = text
    return wenyan


def make_key(title):
    return f'{CORPUS}|{norm(title)}'


def main():
    wenyan_by_title = load_liaozhai_wenyan()
    with open(ENTRIES_PATH, encoding='utf-8') as f:
        entries = json.load(f)

    out = {}
    missing = []
    for e in entries:
        if e['语料库'] != CORPUS:
            continue
        title = norm(e['篇名'])
        base = normalize_entry_title(title)
        text = wenyan_by_title.get(title) or wenyan_by_title.get(base)
        if text:
            out[make_key(title)] = text
        else:
            missing.append(title)

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False)

    print(f'Liaozhai files parsed: {len(wenyan_by_title)}')
    print(f'Liaozhai entries matched: {len(out)}')
    print(f'Missing: {len(missing)}')
    if missing:
        print('Missing:', ', '.join(missing))


if __name__ == '__main__':
    main()
