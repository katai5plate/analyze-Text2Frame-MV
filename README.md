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

// JS から動的に生成されたテキスト
const place = ["城", "宿屋", "洞窟の前"][Math.floor(Math.random() * 3)];
const text = `長老に会って挨拶は済ませてきたかい？
<ShowChoices>
<When: はい>
そうか。それならよかった。
早速長老の依頼のとおり、${place}に向かってくれないかい。
<When: いいえ>
それはいけない。
長老は君のような若者を探しているんだ。
挨拶に行って話を聞いてくれないかい。
<End>`;

// list 形式で出力される
const list = parse(text);
console.log(list);
// [
//   { code: 101, indent: 0,
//     parameters: ["", 0, 0, 2, ""] },
//   { code: 401, indent: 0,
//     parameters: ["長老に会って挨拶は済ませてきたかい？"] },
//   { code: 102, indent: 0,
//     parameters: [["はい", "いいえ"], 1, 0, 2, 0] },
//   { code: 402, indent: 0,
//     parameters: [0, "はい"] },
//   ...
// ];

// 挿入場所によって indent を変更したり、条件によって内容を変えたりできる
const result = list.map(({ indent, ...rest }) => ({
  ...rest,
  indent: indent + 2,
}));

// 例えばこういう、特定のコモンイベントの指定されたラベル部分に結果を挿入したり
// そういう自由度の高い処理が書けるようにしたい
injectCommonEvent({ id: 3, labelName: "長老の会話変化" }, result);
```
