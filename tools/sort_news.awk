# 뉴스 목록(geomjeong/news/index.html)의 카드를 날짜 내림차순으로 재정렬한다.
# 사용: awk -f tools/sort_news.awk geomjeong/news/index.html > /tmp/x && mv /tmp/x geomjeong/news/index.html
# 같은 날짜면 원래 순서를 유지한다(안정 정렬). 대표글(news-feat)과 그리드 밖은 손대지 않는다.
BEGIN{ n=0; inblk=0; t=0; state=0 }   # state 0=그리드 앞, 1=그리드 안, 2=그리드 뒤
state==0 { print; if ($0 ~ /<div class="news-grid">/) state=1; next }
state==2 { tail[++t]=$0; next }
{
  if (!inblk && $0 ~ /<a class="ncard/) { inblk=1; n++; blk[n]=$0 }
  else if (inblk) { blk[n]=blk[n] "\n" $0 }
  else { state=2; tail[++t]=$0; next }     # 카드가 아닌 줄 = 그리드 끝
  if (inblk && $0 ~ /<\/a>/) {
    inblk=0
    if (match(blk[n], /<div class="date">[0-9.]+<\/div>/))
      key[n]=substr(blk[n], RSTART+18, RLENGTH-18-6)
    else key[n]="0000.00.00"
    ord[n]=n
  }
}
END{
  for (i=2; i<=n; i++) {
    ki=key[ord[i]]; oi=ord[i]; j=i-1
    while (j>=1 && key[ord[j]] < ki) { ord[j+1]=ord[j]; j-- }
    ord[j+1]=oi
  }
  for (i=1; i<=n; i++) print blk[ord[i]]
  for (i=1; i<=t; i++) print tail[i]
}
