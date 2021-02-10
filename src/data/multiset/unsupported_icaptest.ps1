sudo /usr/local/c-icap/bin/c-icap-client -s "info?view=text" -i $endpoint -req any -f '$files  -o '$uploaded -s gw_rebuild -v

$endpoint = "gw-icap01.westeurope.azurecontainer.io"  
$pathIn = C:\test\icap\input
$pathOut = C:\test\icap\output 
$fileIn = $pathIn.RootFolder.Files 
$fileOut = $pathOut.RootFolder.Files 
$files = get-childItem -Exclude *.ps1 foreach ($file in $files) {    $stream = $file.OpenRead()     
$uploaded = $fileOut.Add($file.Name, $stream, $TRUE)     "Uploaded " + $file.Name    if ($stream) {$stream.Dispose()} } if ($web) {$web.Dispose()} if ($site) {$site.Dispose()}