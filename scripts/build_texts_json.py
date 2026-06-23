# -*- coding: utf-8 -*-
"""从女妖-拆分版 Excel 提取原文，生成 public/texts.json"""
import json
import os
import re
import sys
import unicodedata

import pandas as pd

sys.stdout.reconfigure(encoding='utf-8')

SPLIT_DIR = r'C:\Users\39241\OneDrive\桌面\女妖\女妖-拆分版'
ENTRIES_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'entries.json')
OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'texts.json')

# 拆分版中未收录或篇名不一致的手动补录
MANUAL_TEXTS = {
    '阅微草堂笔记|飞天夜叉': (
        '纪晓岚先生在乌鲁木齐时，把总蔡良栋言：此地初定时，尝巡瞭至南山深处，日色薄暮，'
        '似见隔涧有人影，疑为盗，伏丛莽中密侦之。见一人戎装坐磐石上，数卒侍立，貌皆狰狞，'
        '其语稍远不可辨。惟见指挥一卒自石洞中呼六女子出，并姣丽白皙，所衣皆绘彩，各反缚其手，'
        '觳觫俯首跪。以次引至坐者前，褫下裳，伏地鞭之，流血号呼，凄惨声彻林谷。鞭讫径去，'
        '六女战栗跪送，望不见影，乃呜咽归洞。其地一射可及，而涧深崖陡，无路可通。'
        '乃使弓力强者攒射对崖一树，有两矢著树上，用以为识。明日迂回数十里寻至其处，则洞口尘封。'
        '秉炬而入，曲折约深四丈许，绝无行迹，不知昨所遇者何神，其所鞭者又何物。'
        '或曰："此飞天夜叉化为女子者也。"'
    ),
}


def norm(s):
    return unicodedata.normalize('NFKC', str(s or '')).strip()


def parse_title(corpus, raw):
    raw = norm(raw)
    if not raw:
        return ''
    if corpus == '阅微草堂笔记':
        return raw.split('-')[-1].strip() if '-' in raw else raw
    if corpus == '子不语':
        return raw.split('-', 1)[1].strip() if '-' in raw else raw
    raw = re.sub(r'\.txt$', '', raw, flags=re.I)
    for sep in ('·', '・', '•'):
        if sep in raw:
            return raw.split(sep)[-1].strip()
    if '-' in raw:
        return raw.split('-')[-1].strip()
    return raw


def normalize_entry_title(title):
    return re.sub(r'[（(][^）)]*[）)]', '', norm(title)).strip()


def get_raw_name(corpus, row):
    if corpus == '子不语':
        return row.get('一级名目', '')
    if corpus == '阅微草堂笔记':
        return row.get('篇目', row.get('篇名', ''))
    return row.get('篇名', row.get('一级名目', ''))


def get_text(row, corpus):
    if corpus == '子不语':
        return norm(row.get('文本内容', '') or '')
    text = norm(row.get('正文', '') or '')
    if not text:
        text = norm(row.get('文本内容', '') or '')
    parts = text.split('\n', 1)
    if len(parts) == 2 and len(parts[0]) <= 24 and parts[1].strip():
        return parts[1].strip()
    return text


def make_key(corpus, title):
    return norm(corpus) + '|' + norm(title)


def load_texts():
    texts = {}
    for fname in sorted(os.listdir(SPLIT_DIR)):
        if not fname.endswith('.xlsx') or '标注' in fname:
            continue
        if '子不语' in fname:
            corpus = '子不语'
        elif '聊斋' in fname:
            corpus = '聊斋志异'
        elif '阅微' in fname:
            corpus = '阅微草堂笔记'
        else:
            continue
        df = pd.read_excel(os.path.join(SPLIT_DIR, fname))
        for _, row in df.iterrows():
            raw_name = get_raw_name(corpus, row)
            title = parse_title(corpus, raw_name)
            text = get_text(row, corpus)
            if not title or not text:
                continue
            texts[make_key(corpus, title)] = text
    return texts


def lookup_text(texts, corpus, entry_title):
    for title in (entry_title, normalize_entry_title(entry_title)):
        key = make_key(corpus, title)
        if key in texts:
            return texts[key]
    return None


def main():
    texts = load_texts()
    with open(ENTRIES_PATH, encoding='utf-8') as f:
        entries = json.load(f)

    out = {}
    missing = []
    for e in entries:
        key = make_key(e['语料库'], e['篇名'])
        text = lookup_text(texts, e['语料库'], e['篇名'])
        if text:
            out[key] = text
        else:
            missing.append({'语料库': e['语料库'], '篇名': e['篇名'], '序号': e['序号']})

    for key, text in MANUAL_TEXTS.items():
        if key not in out:
            out[key] = text

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False)

    print(f'Excel unique texts: {len(texts)}')
    print(f'Entries: {len(entries)}')
    print(f'Matched: {len(out)}')
    print(f'Missing: {len(missing)}')
    if missing:
        print('Missing sample:')
        for m in missing[:20]:
            print(f"  {m['语料库']} · {m['篇名']} (#{m['序号']})")


if __name__ == '__main__':
    main()
