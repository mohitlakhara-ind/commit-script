$nodePath = "C:\Program Files\nodejs\node.exe" # Update if needed
$scriptPath = "E:\autocommit\gith\script.js" # Path to Node script

Start-Process -NoNewWindow -FilePath $nodePath -ArgumentList $scriptPath
