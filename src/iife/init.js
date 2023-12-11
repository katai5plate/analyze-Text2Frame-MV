"use strict";
const fs = require("fs");
const path = require("path");
const PATH_SEP = path.sep;
const BASE_PATH = path.dirname(process.mainModule.filename);

if (typeof PluginManager === "undefined") {
  Laurus.Text2Frame.WindowPosition = "Bottom";
  Laurus.Text2Frame.Background = "Window";
  Laurus.Text2Frame.FileFolder = "test";
  Laurus.Text2Frame.FileName = "basic.txt";
  Laurus.Text2Frame.CommonEventID = "1";
  Laurus.Text2Frame.MapID = "1";
  Laurus.Text2Frame.EventID = "1";
  Laurus.Text2Frame.PageID = "1";
  Laurus.Text2Frame.IsOverwrite = true;
  Laurus.Text2Frame.CommentOutChar = "%";
  Laurus.Text2Frame.IsDebug = true;
  Laurus.Text2Frame.DisplayMsg = true;
  Laurus.Text2Frame.DisplayWarning = true;
} else {
  // for default plugin command
  Laurus.Text2Frame.Parameters = PluginManager.parameters("Text2Frame");
  Laurus.Text2Frame.WindowPosition = String(
    Laurus.Text2Frame.Parameters["Default Window Position"]
  );
  Laurus.Text2Frame.Background = String(
    Laurus.Text2Frame.Parameters["Default Background"]
  );
  Laurus.Text2Frame.FileFolder = String(
    Laurus.Text2Frame.Parameters["Default Scenario Folder"]
  );
  Laurus.Text2Frame.FileName = String(
    Laurus.Text2Frame.Parameters["Default Scenario File"]
  );
  Laurus.Text2Frame.CommonEventID = String(
    Laurus.Text2Frame.Parameters["Default Common Event ID"]
  );
  Laurus.Text2Frame.MapID = String(
    Laurus.Text2Frame.Parameters["Default MapID"]
  );
  Laurus.Text2Frame.EventID = String(
    Laurus.Text2Frame.Parameters["Default EventID"]
  );
  Laurus.Text2Frame.PageID = String(
    Laurus.Text2Frame.Parameters["Default PageID"]
  );
  Laurus.Text2Frame.IsOverwrite =
    String(Laurus.Text2Frame.Parameters.IsOverwrite) === "true";
  Laurus.Text2Frame.CommentOutChar = String(
    Laurus.Text2Frame.Parameters["Comment Out Char"]
  );
  Laurus.Text2Frame.IsDebug =
    String(Laurus.Text2Frame.Parameters.IsDebug) === "true";
  Laurus.Text2Frame.DisplayMsg =
    String(Laurus.Text2Frame.Parameters.DisplayMsg) === "true";
  Laurus.Text2Frame.DisplayWarning =
    String(Laurus.Text2Frame.Parameters.DisplayWarning) === "true";
  Laurus.Text2Frame.TextPath = `${BASE_PATH}${PATH_SEP}${Laurus.Text2Frame.FileFolder}${PATH_SEP}${Laurus.Text2Frame.FileName}`;
  Laurus.Text2Frame.MapPath = `${BASE_PATH}${path.sep}data${path.sep}Map${(
    "000" + Laurus.Text2Frame.MapID
  ).slice(-3)}.json`;
  Laurus.Text2Frame.CommonEventPath = `${BASE_PATH}${path.sep}data${path.sep}CommonEvents.json`;
}

const addMessage = function (text) {
  if (Laurus.Text2Frame.DisplayMsg) {
    $gameMessage.add(text);
  }
};

const addWarning = function (warning) {
  if (Laurus.Text2Frame.DisplayWarning) {
    $gameMessage.add(warning);
  }
};

const getDefaultPage = function () {
  return {
    conditions: {
      actorId: 1,
      actorValid: false,
      itemId: 1,
      itemValid: false,
      selfSwitchCh: "A",
      selfSwitchValid: false,
      switch1Id: 1,
      switch1Valid: false,
      switch2Id: 1,
      switch2Valid: false,
      variableId: 1,
      variableValid: false,
      variableValue: 0,
    },
    directionFix: false,
    image: {
      characterIndex: 0,
      characterName: "",
      direction: 2,
      pattern: 0,
      tileId: 0,
    },
    list: [{ code: 0, indent: 0, parameters: [] }],
    moveFrequency: 3,
    moveRoute: {
      list: [{ code: 0, parameters: [] }],
      repeat: true,
      skippable: false,
      wait: false,
    },
    moveSpeed: 3,
    moveType: 0,
    priorityType: 0,
    stepAnime: false,
    through: false,
    trigger: 0,
    walkAnime: true,
  };
};

//= ============================================================================
// Game_Interpreter
//= ============================================================================

// for MZ plugin command
if (typeof PluginManager !== "undefined" && PluginManager.registerCommand) {
  PluginManager.registerCommand(
    "Text2Frame",
    "IMPORT_MESSAGE_TO_EVENT",
    function (args) {
      const file_folder = args.FileFolder;
      const file_name = args.FileName;
      const map_id = args.MapID;
      const event_id = args.EventID;
      const page_id = args.PageID;
      const is_overwrite = args.IsOverwrite;
      this.pluginCommand("IMPORT_MESSAGE_TO_EVENT", [
        file_folder,
        file_name,
        map_id,
        event_id,
        page_id,
        is_overwrite,
      ]);
    }
  );
  PluginManager.registerCommand(
    "Text2Frame",
    "IMPORT_MESSAGE_TO_CE",
    function (args) {
      const file_folder = args.FileFolder;
      const file_name = args.FileName;
      const common_event_id = args.CommonEventID;
      const is_overwrite = args.IsOverwrite;
      this.pluginCommand("IMPORT_MESSAGE_TO_CE", [
        file_folder,
        file_name,
        common_event_id,
        is_overwrite,
      ]);
    }
  );
}

const _Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  _Game_Interpreter_pluginCommand.apply(this, arguments);
  this.pluginCommandText2Frame(command, args);
};
