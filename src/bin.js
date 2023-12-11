// developer mode
//
// $ node Text2Frame.js
if (typeof require.main !== "undefined" && require.main === module) {
  const program = require("commander");
  program
    .version("0.0.1")
    .usage("[options]")
    .option(
      "-m, --mode <map|common|test>",
      "output mode",
      /^(map|common|test)$/i
    )
    .option("-t, --text_path <name>", "text file path")
    .option("-o, --output_path <name>", "output file path")
    .option("-e, --event_id <name>", "event file id")
    .option("-p, --page_id <name>", "page id")
    .option("-c, --common_event_id <name>", "common event id")
    .option("-w, --overwrite <true/false>", "overwrite mode", "false")
    .option("-v, --verbose", "debug mode", false)
    .parse();
  const options = program.opts();

  Laurus.Text2Frame.IsDebug = options.verbose;
  Laurus.Text2Frame.TextPath = options.text_path;
  Laurus.Text2Frame.IsOverwrite = options.overwrite === "true";

  if (options.mode === "map") {
    Laurus.Text2Frame.MapPath = options.output_path;
    Laurus.Text2Frame.EventID = options.event_id;
    Laurus.Text2Frame.PageID = options.page_id ? options.page_id : "1";
    Game_Interpreter.prototype.pluginCommandText2Frame("COMMAND_LINE", [
      "IMPORT_MESSAGE_TO_EVENT",
    ]);
  } else if (options.mode === "common") {
    Laurus.Text2Frame.CommonEventPath = options.output_path;
    Laurus.Text2Frame.CommonEventID = options.common_event_id;
    Game_Interpreter.prototype.pluginCommandText2Frame("COMMAND_LINE", [
      "IMPORT_MESSAGE_TO_CE",
    ]);
  } else if (options.mode === "test") {
    const folder_name = "test";
    const file_name = "basic.txt";
    const map_id = "1";
    const event_id = "1";
    const page_id = "1";
    const overwrite = "true";
    Game_Interpreter.prototype.pluginCommandText2Frame(
      "IMPORT_MESSAGE_TO_EVENT",
      [folder_name, file_name, map_id, event_id, page_id, overwrite]
    );
  } else {
    console.log("===== Manual =====");
    console.log(`
    NAME
       Text2Frame - Simple compiler to convert text to event command.
    SYNOPSIS
        node Text2Frame.js
        node Text2Frame.js --verbose --mode map --text_path <text file path> --output_path <output file path> --event_id <event id> --page_id <page id> --overwrite <true|false>
        node Text2Frame.js --verbose --mode common --text_path <text file path> --common_event_id <common event id> --overwrite <true|false>
        node Text2Frame.js --verbose --mode test
    DESCRIPTION
        node Text2Frame.js
          テストモードです。test/basic.txtを読み込み、data/Map001.jsonに出力します。
        node Text2Frame.js --verbose --mode map --text_path <text file path> --output_path <output file path> --event_id <event id> --page_id <page id> --overwrite <true|false>
          マップへのイベント出力モードです。
          読み込むファイル、出力マップ、上書きの有無を引数で指定します。
          test/basic.txt を読み込み data/Map001.json に上書きするコマンド例は以下です。

          例1：$ node Text2Frame.js --mode map --text_path test/basic.txt --output_path data/Map001.json --event_id 1 --page_id 1 --overwrite true
          例2：$ node Text2Frame.js -m map -t test/basic.txt -o data/Map001.json -e 1 -p 1 -w true

        node Text2Frame.js --verbose --mode common --text_path <text file path> --common_event_id <common event id> --overwrite <true|false>
          コモンイベントへのイベント出力モードです。
          読み込むファイル、出力コモンイベント、上書きの有無を引数で指定します。
          test/basic.txt を読み込み data/CommonEvents.json に上書きするコマンド例は以下です。

          例1：$ node Text2Frame.js --mode common --text_path test/basic.txt --output_path data/CommonEvents.json --common_event_id 1 --overwrite true
          例2：$ node Text2Frame.js -m common -t test/basic.txt -o data/CommonEvents.json -c 1 -w true
    `);
  }
}
