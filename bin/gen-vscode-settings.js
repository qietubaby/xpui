const path = require('path')
const fileSave = require('file-save')
const vscodeSettings = require('./vscode-settings.json')
const settingsPath = path.join(__dirname, '../.vscode/settings.json')

fileSave(settingsPath)
  .write(JSON.stringify(vscodeSettings, null, '  '), 'utf8')
  .end('\n')
