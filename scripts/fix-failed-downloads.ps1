# Fix the 7 failed downloads from gallery.json (Unicode filenames)

$ErrorActionPreference = "Continue"

$galleryDir = "e:/ashma-web/public/gallery"
New-Item -ItemType Directory -Force -Path $galleryDir | Out-Null

# Unicode characters
$apostrophe = [string][char]0x2019  # ' right single quote
$leftQuote = [string][char]0x201C   # " left double quote
$rightQuote = [string][char]0x201D  # " right double quote

$files = @(
    @{
        url = "https://raw.githubusercontent.com/Jedi898/gallery/master/Da%20Vinci%E2%80%99s%20Notebook%20Design%20Development.jpg"
        name = "Da Vinci" + $apostrophe + "s Notebook Design Development.jpg"
    },
    @{
        url = "https://raw.githubusercontent.com/Jedi898/gallery/master/Da%20Vinci%E2%80%99s%20Notebook%20Final%20Garment.jpg"
        name = "Da Vinci" + $apostrophe + "s Notebook Final Garment.jpg"
    },
    @{
        url = "https://raw.githubusercontent.com/Jedi898/gallery/master/Da%20Vinci%E2%80%99s%20Notebook%20Final%20Rendering.jpg"
        name = "Da Vinci" + $apostrophe + "s Notebook Final Rendering.jpg"
    },
    @{
        url = "https://raw.githubusercontent.com/Jedi898/gallery/master/Da%20Vinci%E2%80%99s%20Notebook.jpg"
        name = "Da Vinci" + $apostrophe + "s Notebook.jpg"
    },
    @{
        url = "https://raw.githubusercontent.com/Jedi898/gallery/master/Da%20Vivci%E2%80%99s%20Notebook%20Design%20Development_.jpg"
        name = "Da Vivci" + $apostrophe + "s Notebook Design Development_.jpg"
    },
    @{
        url = "https://raw.githubusercontent.com/Jedi898/gallery/master/Digital%20Artistic%20Portrait%20%E2%80%9CThe%20Queen%E2%80%9D.png"
        name = "Digital Artistic Portrait " + $leftQuote + "The Queen" + $rightQuote + ".png"
    },
    @{
        url = "https://raw.githubusercontent.com/Jedi898/gallery/master/Digital%20Artistic%20Surreal%20Portrait%20%E2%80%9CThe%20Hope%E2%80%9D.png"
        name = "Digital Artistic Surreal Portrait " + $leftQuote + "The Hope" + $rightQuote + ".png"
    }
)

Write-Host "=== Fixing 7 failed downloads ===" -ForegroundColor Cyan

foreach ($file in $files) {
    $dest = Join-Path $galleryDir $file.name
    # Remove garbled version if it exists
    $garbled = Get-ChildItem $galleryDir -Filter "*â*" -ErrorAction SilentlyContinue
    foreach ($g in $garbled) {
        if ($g.Name -like "*Notebook*" -or $g.Name -like "*Queen*" -or $g.Name -like "*Hope*") {
            Remove-Item $g.FullName -Force -ErrorAction SilentlyContinue
            Write-Host "  [CLEAN] Removed garbled: $($g.Name)" -ForegroundColor Yellow
        }
    }

    if (Test-Path $dest) {
        Write-Host "  [SKIP] $($file.name) (already exists)"
        continue
    }

    try {
        curl.exe -L -s -o $dest $file.url
        if ($LASTEXITCODE -eq 0 -and (Test-Path $dest)) {
            $size = (Get-Item $dest).Length
            if ($size -gt 1000) {
                Write-Host "  [OK] $($file.name) ($size bytes)"
            } else {
                Write-Host "  [FAIL] $($file.name) - file too small ($size bytes), likely 404"
                Remove-Item $dest -Force -ErrorAction SilentlyContinue
            }
        } else {
            Write-Host "  [FAIL] $($file.name) - curl exit $LASTEXITCODE"
        }
    } catch {
        Write-Host "  [ERR] $($file.name) : $_"
    }
}

Write-Host "`n=== Verification ===" -ForegroundColor Green
$total = (Get-ChildItem $galleryDir -File).Count
Write-Host "Total files in public/gallery: $total"

# Check for any remaining garbled files
$remainingGarbled = Get-ChildItem $galleryDir -Filter "*â*" -ErrorAction SilentlyContinue
if ($remainingGarbled) {
    Write-Host "Remaining garbled files:" -ForegroundColor Yellow
    $remainingGarbled | ForEach-Object { Write-Host "  $($_.Name)" }
} else {
    Write-Host "No garbled files remaining. All clean!" -ForegroundColor Green
}

Write-Host "Done!"

