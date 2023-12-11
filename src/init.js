var Laurus = Laurus || {}; // eslint-disable-line no-var, no-use-before-define
Laurus.Text2Frame = {};

if (typeof PluginManager === "undefined") {
  // for test
  /* eslint-disable no-global-assign */
  Game_Interpreter = {};
  Game_Interpreter.prototype = {};
  $gameMessage = {};
  $gameMessage.add = function () {};
  /* eslint-enable no-global-assign */
}
