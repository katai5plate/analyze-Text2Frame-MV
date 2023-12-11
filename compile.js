const fs = require("fs");
const path = require("path");
const program = require("commander");

// 引数設定
program
  .usage("[options]")
  .option("-t, --text_path <name>", "text file path")
  .option("-o, --output_path <name>", "output file path")
  .option("-v, --verbose", "debug mode", false)
  .parse();

// 引数取得
const { text_path, output_path, verbose } = program.opts();

// 前提ファイル作成
fs.writeFileSync(output_path, JSON.stringify([null, {}]));

// Text2Frame のコードを改造するために文字列で読み込み
let t2fSource = fs.readFileSync("./Text2Frame.js", { encoding: "utf8" });

// パラメータオブジェクトをグローバル定義にする
t2fSource = t2fSource.replace(
  "var Laurus = Laurus || {}",
  "globalThis.Laurus = {}"
);

// 不要なメッセージログを削除し、代わりの文章を挿入
t2fSource = t2fSource.replace(
  /addMessage\(\s*'Please[^]*?開き直してください'\s*\)\s*console\.log\(\s*'Please[^]*?開き直してください'\s*\)/,
  "console.log('Text compilation completed!\\nコンパイル完了！ ->', Laurus.Text2Frame.CommonEventPath)"
);

// developer mode から先を削除
t2fSource = t2fSource.replace(/\/\/ developer mode[\s\S]*/, "");

// Text2Frame を実行し、pluginCommandText2Frame を定義
eval(t2fSource);

// パラメータ定義
Laurus = {
  Text2Frame: {
    ...Laurus.Text2Frame,
    IsDebug: verbose,
    FileFolder: path.parse(text_path).dir,
    TextPath: text_path,
    IsOverwrite: true,
    CommonEventPath: output_path,
    CommonEventID: 1,
  },
};

// 実行
Game_Interpreter.prototype.pluginCommandText2Frame("COMMAND_LINE", [
  "IMPORT_MESSAGE_TO_CE",
]);

// 出力された結果のみ抽出する
const dist = fs.readFileSync(output_path, { encoding: "utf8" });
const { list } = JSON.parse(dist)[1];

// 結果を上書き
fs.writeFileSync(output_path, JSON.stringify(list, null, 2));
