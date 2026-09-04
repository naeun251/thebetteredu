# 위키미디어 공용 사진 1장 내려받기 + figure HTML 생성
# 사용: powershell -File tools\get_photo.ps1 -File "Gwangmyeong Station and skyline.jpg" -Slug gwangmyeong -Alt "광명역 주변 전경"
param(
  [Parameter(Mandatory=$true)][string]$File,   # "File:" 없이 파일명만
  [Parameter(Mandatory=$true)][string]$Slug,   # 저장 이름 (도시 슬러그)
  [string]$Alt = ''
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$UA   = 'betteredu-photo/1.0 (https://betteredu.kr; x26589334@gmail.com)'
$repo = Split-Path $PSScriptRoot -Parent
$dest = Join-Path $repo 'geomjeong\news\images'
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }

$u = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo' +
     '&iiprop=url|extmetadata|mime&iiurlwidth=960' +
     '&iiextmetadatafilter=LicenseShortName|Artist|LicenseUrl' +
     '&titles=' + [uri]::EscapeDataString('File:' + $File)
$r  = Invoke-RestMethod -Uri $u -Headers @{ 'User-Agent' = $UA }
$pg = @($r.query.pages.PSObject.Properties.Value)[0]
if (-not $pg.imageinfo) { throw "그런 파일이 없습니다: $File" }
$ii = $pg.imageinfo[0]

$lic    = ($ii.extmetadata.LicenseShortName.value -replace '<[^>]+>','').Trim()
$artist = ($ii.extmetadata.Artist.value -replace '<[^>]+>','').Trim()
$out    = Join-Path $dest "$Slug.jpg"
Invoke-WebRequest -Uri $ii.thumburl -Headers @{ 'User-Agent' = $UA } -OutFile $out
$kb = [math]::Round((Get-Item $out).Length / 1KB)

Add-Type -AssemblyName System.Drawing
$im = [System.Drawing.Image]::FromFile($out); $w = $im.Width; $h = $im.Height; $im.Dispose()

if (-not $Alt) { $Alt = $Slug }
$cap = if ($lic -match 'Public domain|CC0') { "사진 $lic" }
       else { "사진 <a href=`"$($ii.descriptionurl)`" target=`"_blank`" rel=`"noopener`">$artist</a>, $lic" }

Write-Output "저장: $out  ($kb KB, ${w}x${h}, $lic / $artist)"
Write-Output ""
Write-Output "--- 기사 상단 (기존 <div class=`"hero-img`">...</div> 줄을 이걸로 교체) ---"
Write-Output "        <figure class=`"hero-photo`"><img src=`"images/$Slug.jpg`" alt=`"$Alt`" width=`"$w`" height=`"$h`" loading=`"eager`"><figcaption>$cap</figcaption></figure>"
Write-Output ""
Write-Output "--- og:image 태그 ---"
Write-Output "<meta property=`"og:image`" content=`"https://betteredu.kr/geomjeong/news/images/$Slug.jpg`">"
Write-Output ""
Write-Output "--- news/index.html 카드 썸네일 (<div class=`"ov`"></div> 를 교체) ---"
Write-Output "<img src=`"images/$Slug.jpg`" alt=`"$Alt`" loading=`"lazy`">"
