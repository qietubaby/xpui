const childProcess = require('child_process')

childProcess.execSync('git config --global core.autocrlf input')
childProcess.execSync('git config --global core.safecrlf true')
