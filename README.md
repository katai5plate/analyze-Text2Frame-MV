# analyze-Text2Frame-MV

Text2Frame-MV を分解して解析するためのリポジトリ

## 成果物

### compile.js

テキストを単純な JSON に変換する（読み込む度にコードを改造するため高負荷）

```
node compile -t ./specs/basic.txt -o ./result.json
```

### parse.js

要望に書いてあることを疑似的に再現（読み込む度にコードを改造するため高負荷）

### これではダメなの？

ダメ。  
ほぼスクレイピングみたいな処理方法だし、  
コードがまた大きく書き換わると動かなくなるので、アプデに脆弱すぎる。  
公式が対応してほしい。

## 要望

https://github.com/yktsr/Text2Frame-MV/issues/117 に提出済

### 下書き

JSON 変換部と埋め込み処理部を切り離し、JSON 変換部をモジュールとして使えるようにしてほしい

- 実現したらできそうなこと
  - 変換部だけ拝借して、埋め込み方法を自分が使いやすいようにカスタマイズする
  - バージョンや日付、テキストファイル名などをテキストに埋め込むことで、出力されたイベントコマンドの注釈からそれらが確認できるようにする
  - テキストで書いて JSON で保存しておいたイベントコマンドを、スクリプトから任意のタイミングで呼び出す
  - GitHub 上でテキストを編集したら、GitHub Actions が JSON 出力をやってくれるようにする
  - 「文章のスクロール表示」をジャックして直でテキストを書いて都度変換されるようなプラグインを書く（REPL みたいに試し書きができる）
  - イベントコマンドを作成する外部ツール開発で、中間コードとしてテキストを使用し、ビルドに変換部を使用する

```js
const TF = require("Text2Frame.js");

// JS から動的に生成されたテキスト
const place = ["城", "宿屋", "洞窟の前"][Math.floor(Math.random() * 3)];
const date = new Date().toLocaleString();
const text = `長老に会って挨拶は済ませてきたかい？
<ShowChoices>
<When: はい>
そうか。それならよかった。
早速長老の依頼のとおり、${place}に向かってくれないかい。
<When: いいえ>
それはいけない。
長老は君のような若者を探しているんだ。
挨拶に行って話を聞いてくれないかい。
<End>
<comment>
出力日時: ${date}
</comment>`;

// list 形式で出力される
const list = TF.parse(text);

// 挿入場所によって indent を変更したり、条件によって内容を変えたりできる
const result = list.map(({ indent, ...rest }) => ({
  ...rest,
  indent: indent + 2,
}));

console.log(result);
// [
//   { code: 101, parameters: [ '', 0, 0, 2, '' ], indent: 2 },
//   { code: 401, parameters: [ '長老に会って挨拶は済ませてきたかい？' ], indent: 2 },
//   { code: 102, parameters: [ [...], 1, 0, 2, 0 ], indent: 2 },
//   { code: 402, parameters: [ 0, 'はい' ], indent: 2 },
// ...
//   { code: 404, parameters: [], indent: 2 },
//   { code: 108, parameters: [ '出力日時: 2023/12/12 5:48:20' ], indent: 2 },
//   { code: 0, parameters: [], indent: 2 }
// ]

// 例えばこういう、特定のコモンイベントの指定されたラベル部分に挿入する処理とかに使えるようにしたい
myLib.injectToCommonEvent({ id: 3, labelName: "挿入：たのみごと" }, result);
```
