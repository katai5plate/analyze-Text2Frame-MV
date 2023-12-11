# analyze-Text2Frame-MV

Text2Frame-MV を分解して解析するためのリポジトリ

## 成果物

### compile.js

テキストを単純な JSON に変換する

```
node compile -t ./specs/basic.txt -o ./result.json
```

## 本当はやりたかったこと

JS コード内部からテキストを JSON 化する

```js
const { parse } = require("Text2Frame.js");

const text = `長老に会って挨拶は済ませてきたかい？
<ShowChoices>
<When: はい>
そうか。それならよかった。
早速長老の依頼のとおり、北に向かってくれないかい。
<When: いいえ>
それはいけない。
長老は君のような若者を探しているんだ。
挨拶に行って話を聞いてくれないかい。
<End>`;

const list = parse(text);

console.log({ list });
```
