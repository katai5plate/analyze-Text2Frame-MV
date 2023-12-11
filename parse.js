const fs = require("fs");

// Text2Frame のコードを改造するために文字列で読み込み
let t2fSource = fs.readFileSync("./Text2Frame.js", { encoding: "utf8" });

// パラメータオブジェクトをグローバル定義にする
t2fSource = t2fSource.replace(
  "var Laurus = Laurus || {}",
  "globalThis.Laurus = {}"
);

// テキストを読み込ませず、第三引数から読ませるようにする
t2fSource = t2fSource.replace(
  "Game_Interpreter.prototype.pluginCommandText2Frame = function (command, args) {",
  "Game_Interpreter.prototype.pluginCommandText2Frame = function (command, args, $$text$$) {"
);
t2fSource = t2fSource.replace(
  "let scenario_text = readText(Laurus.Text2Frame.TextPath)",
  `let scenario_text = $$text$$`
);

// 結果が出たら強制リターン
t2fSource = t2fSource.replace(
  "event_command_list = autoIndent(event_command_list)",
  "event_command_list = autoIndent(event_command_list); return [...event_command_list, getCommandBottomEvent()];"
);

// developer mode から先を削除
t2fSource = t2fSource.replace(/\/\/ developer mode[\s\S]*/, "");

// Text2Frame を実行し、Text2Frame を定義
eval(t2fSource);

// パラメータ定義
Laurus = {
  Text2Frame: {
    ...Laurus.Text2Frame,
    IsDebug: false,
    FileFolder: "",
    TextPath: "",
    IsOverwrite: false,
    CommonEventPath: "",
    CommonEventID: 1,
  },
};

// 関数化
module.exports = (text) =>
  Game_Interpreter.prototype.pluginCommandText2Frame(
    "COMMAND_LINE",
    [
      null, // 出力させないため
    ],
    text
  );
