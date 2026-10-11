from html.parser import HTMLParser
from html import unescape
from pathlib import Path

class Marker(HTMLParser):
    def __init__(self, raw):
        super().__init__(convert_charrefs=False)
        self.raw = raw
        self.offsets = [0]
        for line in raw.splitlines(keepends=True):
            self.offsets.append(self.offsets[-1] + len(line))
        self.stack = []
        self.parts = []
        self.count = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.stack.append((tag, attrs)) if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'} else None
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, -1, -1):
            if self.stack[i][0] == tag:
                self.stack = self.stack[:i]
                break
    def handle_data(self, text):
        self.mark(text)
    def handle_entityref(self, name):
        self.mark('&' + name + ';')
    def handle_charref(self, name):
        self.mark('&#' + name + ';')
    def mark(self, text):
        tags = [t for t, _ in self.stack]
        if 'body' not in tags or not unescape(text).strip():
            return
        if any(t in {'script','style','button','dialog','select','textarea','svg','option'} or a.get('aria-hidden') == 'true' for t,a in self.stack):
            return
        line, col = self.getpos()
        start = self.offsets[line-1] + col
        if self.parts and self.parts[-1][1] == start:
            a, _, ident = self.parts[-1]
            self.parts[-1] = (a, start + len(text), ident)
        else:
            self.count += 1
            self.parts.append((start, start + len(text), f't{self.count:04d}'))

for path in Path('.').glob('*.html'):
    raw = path.read_text()
    if 'assets/js/text-editor.js' in raw or '<main' not in raw:
        continue
    parser = Marker(raw)
    parser.feed(raw)
    for start, end, ident in reversed(parser.parts):
        raw = raw[:start] + f'<editable-text data-edit-id="{ident}">' + raw[start:end] + '</editable-text>' + raw[end:]
    raw = raw.replace('</head>', '<link rel="stylesheet" href="assets/css/text-editor.css"><script type="module" src="assets/js/text-editor.js"></script></head>', 1)
    path.write_text(raw)
    print(path, parser.count)
