# Download all images from gallery.json and gallery2.json into public/gallery and public/gallery2

$ErrorActionPreference = "Continue"

# Create target directories
$baseDir = "e:/ashma-web/public"
$galleryDir = "$baseDir/gallery"
$gallery2Dir = "$baseDir/gallery2"

New-Item -ItemType Directory -Force -Path $galleryDir | Out-Null
New-Item -ItemType Directory -Force -Path $gallery2Dir | Out-Null

# Parse gallery.json (repo 1)
Write-Host "=== Downloading gallery images (repo: Jedi898/gallery) ===" -ForegroundColor Cyan
$galleryJson = Get-Content "e:/ashma-web/gallery.json" -Raw | ConvertFrom-Json
$count1 = 0
foreach ($item in $galleryJson) {
    $name = $item.name
    $url = $item.download_url
    $dest = Join-Path $galleryDir $name
    if (-not (Test-Path $dest)) {
        try {
            curl.exe -L -s -o $dest $url
            if ($LASTEXITCODE -eq 0 -and (Test-Path $dest)) {
                $count1++
                Write-Host "  [OK] $name"
            } else {
                Write-Host "  [FAIL] $name"
            }
        } catch {
            Write-Host "  [ERR] $name : $_"
        }
    } else {
        $count1++
        Write-Host "  [SKIP] $name (already exists)"
    }
}

# Parse gallery2.json (repo 2)
Write-Host "`n=== Downloading gallery2 images (repo: Jedi898/gallery2) ===" -ForegroundColor Cyan
$gallery2Json = Get-Content "e:/ashma-web/gallery2.json" -Raw | ConvertFrom-Json
$count2 = 0
foreach ($item in $gallery2Json) {
    $name = $item.name
    $url = $item.download_url
    $dest = Join-Path $gallery2Dir $name
    if (-not (Test-Path $dest)) {
        try {
            curl.exe -L -s -o $dest $url
            if ($LASTEXITCODE -eq 0 -and (Test-Path $dest)) {
                $count2++
                Write-Host "  [OK] $name"
            } else {
                Write-Host "  [FAIL] $name"
            }
        } catch {
            Write-Host "  [ERR] $name : $_"
        }
    } else {
        $count2++
        Write-Host "  [SKIP] $name (already exists)"
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Green
Write-Host "Gallery 1 downloaded: $count1 / $($galleryJson.Count)"
Write-Host "Gallery 2 downloaded: $count2 / $($gallery2Json.Count)"
Write-Host "Done!"

