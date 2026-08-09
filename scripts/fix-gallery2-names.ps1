# Fix garbled Unicode filenames in public/gallery2
# Pattern: files containing "â€™" (mojibake of U+2019 right single quote)

$ErrorActionPreference = "Stop"
$dir = "e:/ashma-web/public/gallery2"

# Build proper Unicode apostrophe
$apostrophe = [string][char]0x2019  # '

Write-Host "=== Fixing garbled filenames in gallery2 ===" -ForegroundColor Cyan

$fixed = 0
Get-ChildItem $dir -File | ForEach-Object {
    $oldName = $_.Name
    if ($oldName.Contains("â€™")) {
        $newName = $oldName.Replace("â€™", $apostrophe)
        $newPath = Join-Path $dir $newName
        # Avoid overwriting existing file
        if (-not (Test-Path $newPath)) {
            Rename-Item -Path $_.FullName -NewName $newName
            Write-Host "  [FIX] $oldName  ->  $newName" -ForegroundColor Green
            $fixed++
        } else {
            # File already exists with proper name - remove garbled duplicate
            Remove-Item -Path $_.FullName -Force
            Write-Host "  [DUP] Removed garbled duplicate: $oldName" -ForegroundColor Yellow
            $fixed++
        }
    }
}

Write-Host "`n=== Verification ===" -ForegroundColor Green
$total = (Get-ChildItem $dir -File).Count
Write-Host "Total files in public/gallery2: $total"
$remainingGarbled = Get-ChildItem $dir -File | Where-Object { $_.Name.Contains("â€™") }
if ($remainingGarbled) {
    Write-Host "Remaining garbled files:" -ForegroundColor Yellow
    $remainingGarbled | ForEach-Object { Write-Host "  $($_.Name)" }
} else {
    Write-Host "No garbled files remaining. All clean!" -ForegroundColor Green
}

Write-Host "`nFixed $fixed files. Done!"

