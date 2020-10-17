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

# add unrotated number
convert -fill '#eeeeee' -font font/FOT-CometStd-B.otf -pointsize 480 -gravity NorthWest -draw "text 20,-40 '$url'" label.png label.png

# generate the image
convert $img -resize x1080 portrait.png # not silhouetted
# overlay the image
convert label.png portrait.png -gravity east -geometry +0+0 -composite background/$url.png
# display output/$number.png
rm label*
rm portrait.png
rm name.txt
rm epithet.txt
