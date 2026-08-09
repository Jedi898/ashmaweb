# Remove broken 404 placeholder files (14 bytes) from gallery2
$dir = "public/gallery2"
$files = Get-ChildItem $dir -Filter "*.jpg"
$removed = 0
foreach ($f in $files) {
    if ($f.Length -eq 14) {
        Remove-Item $f.FullName -Force
        Write-Host "Removed: $($f.Name)"
        $removed++
    }
}
Write-Host "** Removed $removed broken files **"
Write-Host "Remaining jpg in gallery2: $((Get-ChildItem $dir -Filter '*.jpg').Count)"
