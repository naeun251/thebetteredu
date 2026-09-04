# 위키미디어 공용에서 지역 사진 후보 찾기 (키 불필요)
# 사용: powershell -File find_photo.ps1 "광명" 
param([Parameter(Mandatory=$true)][string]$Keyword, [int]$Limit = 12)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$OK = @('cc0','public domain','cc by 2.0','cc by 3.0','cc by 4.0','cc by-sa 2.0',
        'cc by-sa 3.0','cc by-sa 4.0','cc by-sa 2.0 kr','cc by-sa 3.0 kr','cc by 2.0 kr')
$UA = 'betteredu-photo/1.0 (https://betteredu.kr; x26589334@gmail.com)'

$u = 'https://commons.wikimedia.org/w/api.php?action=query&format=json' +
     '&generator=search&gsrnamespace=6&gsrlimit=' + $Limit +
     '&gsrsearch=' + [uri]::EscapeDataString($Keyword) +
     '&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=960' +
     '&iiextmetadatafilter=LicenseShortName|Artist|LicenseUrl|ImageDescription'

$r = Invoke-RestMethod -Uri $u -Headers @{ 'User-Agent' = $UA }
if (-not $r.query) { Write-Output "결과 없음: $Keyword"; exit }

foreach ($p in $r.query.pages.PSObject.Properties.Value) {
  $ii = $p.imageinfo[0]
  if ($ii.mime -ne 'image/jpeg') { continue }          # PNG/SVG 제외(썸네일이 jpg 로 안 나옴)
  $lic = $ii.extmetadata.LicenseShortName.value
  if (-not $lic) { continue }
  $licL = ($lic -replace '<[^>]+>','').Trim().ToLower()
  if ($OK -notcontains $licL) { continue }             # 상업적 재사용 가능 라이선스만
  $artist = ($ii.extmetadata.Artist.value -replace '<[^>]+>','').Trim()

  Write-Output "제목  : $($p.title -replace '^File:','')"
  Write-Output "라이선스: $lic   작가: $artist"
  Write-Output "썸네일: $($ii.thumburl -replace '\?.*$','')"
  Write-Output "출처  : $($ii.descriptionurl)"
  Write-Output ""
}
