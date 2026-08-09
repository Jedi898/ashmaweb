# Remove non-webp files from gallery that have webp counterparts
$dir = "public/gallery"
$files = Get-ChildItem $dir -File
$removed = 0
foreach ($f in $files) {
    if ($f.Extension -eq ".webp") { continue }
    $base = $f.BaseName
    $webp = Join-Path $dir ($base + ".webp")
    if (Test-Path $webp) {
        Remove-Item $f.FullName -Force
        Write-Host "Removed: $($f.Name)"
        $removed++
    } else {
        Write-Host "KEEP (no webp): $($f.Name)"
    }
}
Write-Host "** Removed $removed files **"
Write-Host "Remaining in gallery: $((Get-ChildItem $dir -File).Count)"
