#!/bin/bash

# GRIMA:

# GRIMA's
# Really
# Intense
# Minimalist
# Aesthetic
# an imagemagick-based FEH wallpaper generator
# adopted for use in project Sawarineko

# type/weapon colors. sword, lance, axe, staff, bow, dagger, tome, breath, beast
readonly color=('#b81b36' '#2865df' '#0aae26' '#58686f' '#c1b621' '#cd8100' '#8f38bb' '#c195a2' '#896948' '#5bcefa')
# t/w offset  colors. sword, lance, axe, staff, bow, dagger, tome, breath, beast
readonly shade=('#8f192d' '#2256bf' '#0b841f' '#495255' '#99911e' '#a06603' '#773399' '#ad7f8d' '#6b543d' '#f5a9b8')

# usage: normal colors are used in lines. offset colors are used in line text
# NOTE: in case of color homogeny (sword, lance, axe, staff), weapon color must use offset, and wep text must use the normal color

# color of color line (that's a fun thing to type)
f=''
# text color of color line
g=''
# color of weapon line
h=''
# text color of weapon line
i=''
# set the baseline to actual or push? actual looks less jarring during homogeny
j=false

## modifiable by parameters

# unit color
cl='15'
# unit weapon type
wp='0'
# silhouetted portrait?
sl='1'

# Sothis is the default. She ALWAYS is. -th
[[ -z $1 ]] && url='99991' || url=$1

source m/${url}/dep.sh
if [ ! -z $GRI_NAME ]; then
epithet=$GRI_NAME
else
epithet=$SWR_NAME
fi
if [ ! -z $GRI_EPITHET ]; then
name=$GRI_EPITHET
else
name=$SWR_EPITHET
fi
# type/weapon colors, from 0: sword, lance, axe, staff, bow, dagger, tome, breath, beast
wp=$GRI_WEP
cl=$GRI_COL
#echo ${name^^} > name.txt
#echo ${epithet^^} > epithet.txt
echo ${name} > name.txt
echo ${epithet} > epithet.txt
img=m/${url}/p.png
bgi=m/${url}/bg.png
f=${color[$cl]};
g=${shade[$cl]};
h=${color[$wp]};
i=${shade[$wp]};
if [ $wp -eq $cl ]; then
  h=${shade[$wp]};
  i=${color[$wp]};
fi

# generate bg
convert -size 2200x1300 -background '#ffffff' xc: label.png

# generate color lines and text
# weapon line
convert label.png -fill $h -draw 'rectangle 0,780 2000,1100' label.png
# color line
convert label.png -fill $f -draw 'rectangle 0,940 2000,1100' label.png
if [ $j ]; then
  # name (weapon)
  convert label.png -fill $i -font font/FOT-CometStd-B.otf -pointsize 180 -annotate +40+932 @name.txt label.png
  # epithet (color)
  convert label.png -fill $g -font font/FOT-CometStd-B.otf -pointsize 180 -annotate +40+1092 @epithet.txt label.png
else
  # name (weapon)
  convert label.png -fill $i -font font/FOT-CometStd-B.otf -pointsize 180 -annotate +40+932 @name.txt label.png
  # epithet (color)
  convert label.png -fill $g -font font/FOT-CometStd-B.otf -pointsize 180 -annotate +40+1092 @epithet.txt label.png
fi

# rotate the thing and crop it
convert label.png -rotate "-3.5" label.png
convert label.png -background '#ffffff' -crop 1920x1080+50+150 +repage label.png

if [ -f "$bgi" ]; then
  convert label.png -transparent '#ffffff' label.png
  convert $bgi -fill white -colorize 50% label-bg.png
  convert label-bg.png label.png -composite label.png
fi

# Full name in top
echo "Full name: $SWR_FULL_NAME"
mogrify -font Roboto-Condensed-Light-Italic -pointsize 72 -draw "gravity northwest fill $SWR_COLOR text 25,35 '${SWR_FULL_NAME^^}'" label.png;

# Add the colored rectangle for the member's title
mogrify -gravity northwest -fill $SWR_COLOR -draw "rectangle 0,126 750,175" label.png;

# Epithet in rectangle
echo "Title: $SWR_EPITHET"
mogrify -font Helvetica -pointsize 42 -draw "gravity northwest fill \"#fefefe\" text 58,134 '${SWR_EPITHET}'" label.png;

# Type
echo "Type: $SWR_TYPE"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1700,-330 'type :'" label.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-330 '${SWR_TYPE}'" label.png;

# Source
echo "Source: $SWR_SOURCE"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1700,-290 'source :'" label.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-290 '${SWR_SOURCE}'" label.png;

# Age
echo "Age: $SWR_AGE"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1700,-250 'age :'" label.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-250 '${SWR_AGE}'" label.png;

# Pronouns
echo "Pronouns: $SWR_PRONOUNS"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1700,-210 'pronouns :'" label.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-210 '${SWR_PRONOUNS}'" label.png;

# Role
echo "Role: $SWR_ROLE"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1700,-170 'role :'" label.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-170 '${SWR_ROLE}'" label.png;

# Proxy
echo "Proxy: $SWR_PROXY"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1700,-130 'proxy :'" label.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-130 '${SWR_PROXY}'" label.png;

# Intro/description field will only render if intro is provided
if [ ! -z "$SWR_DESC" ]
then
echo "Intro: $SWR_DESC"
# Add "intro" box
mogrify -gravity northwest -fill $SWR_COLOR -draw "polygon 57,455 288,455 297,464 297,480 654,480 654,482 57,482" label.png;
mogrify -font Helvetica -pointsize 28 -draw "gravity northwest fill \"#fefefe\" text 65,456 'i n t r o'" label.png;

# Make the text itself
convert -background none -size 597x -fill "#212221" -font Helvetica -pointsize 28 caption:"${SWR_DESC}" text.png
convert label.png text.png -gravity northwest -geometry +60+490 -compose over -composite label.png
rm text.png
fi

# generate the image
convert $img -resize x1080 portrait.png # not silhouetted
# overlay the image
convert label.png portrait.png -gravity east -geometry +0+0 -composite intros/$url.png
# display output/$number.png
rm label*
rm portrait.png
rm name.txt
rm epithet.txt
