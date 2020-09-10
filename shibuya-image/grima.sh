#!/bin/bash

# GRIMA:

# GRIMA's
# Really
# Intense
# Minimalist
# Aesthetic
# an imagemagick-based FEH wallpaper generator
# made by butterfly42, 2020

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

printf 'num '
read number
printf 'nme '
read name
printf 'epi '
read epithet
printf 'cl '
read cl
printf 'wp '
read wp
printf 'im '
read image
# type/weapon colors, from 0: sword, lance, axe, staff, bow, dagger, tome, breath, beast
echo ${name^^} > name.txt
echo ${epithet^^} > epithet.txt
img=illust/${number}.webp
f=${color[$cl]};
g=${shade[$cl]};
h=${color[$wp]};
i=${shade[$wp]};
if [ $wp -eq $cl ]; then
  h=${shade[$wp]};
  i=${color[$wp]};
fi

io='0';
# handle parameters, they override stuff
while [ -n "$1" ]; do # traverse parameters if needed

  case "$1" in

    -t)
      cl='9'
      wp='9'
      ;; # trans colors

    -i)
      io='1';
      ;; # force image download

    -n)
      sl='0'
      ;; # no silhouette

    *)
      echo "GRIMA - GRIMA's Really Intense Minimalist Aesthetic";
      echo "an imagemagick-based FEH wallpaper generator";
      echo "---------------------------------------------------";
      echo "prompts are given when script is run"
      echo "--- parameters"
      echo "-t - special mode that uses trans color bars"
      echo "-n - don't draw portrait as a silhouette"
      exit 0
      ;; # help
  esac

  shift

done

  curl -s $image > $img

# generate bg
convert -size 2200x1300 -background '#e6e6e6' xc: label.png

# generate color lines and text
# weapon line
echo "name: $(cat name.txt)"
convert label.png -fill $h -draw 'rectangle 0,780 2000,1100' label.png
# color line
echo "epithet: $(cat epithet.txt)"
convert label.png -fill $f -draw 'rectangle 0,940 2000,1100' label.png
if [ $j ]; then
  # name (weapon)
  convert label.png -fill $i -font font/Raleway-BoldItalic.ttf -pointsize 180 -annotate +40+939 @name.txt label.png
  # epithet (color)
  convert label.png -fill $g -font font/Raleway-BoldItalic.ttf -pointsize 180 -annotate +40+1099 @epithet.txt label.png
else
  # name (weapon)
  convert label.png -fill $i -font font/Raleway-BoldItalic.ttf -pointsize 180 -annotate +40+938 @name.txt label.png
  # epithet (color)
  convert label.png -fill $g -font font/Raleway-BoldItalic.ttf -pointsize 180 -annotate +40+1098 @epithet.txt label.png
fi

# rotate the thing and crop it
convert label.png -rotate "-3.5" label.png
convert label.png -background '#e6e6e6' -crop 1920x1080+50+150 +repage label.png

# add unrotated number
echo "no. ${number}"
convert -fill '#cdcdcd' -font font/Oswald-Regular.ttf -pointsize 480 -gravity NorthWest -draw "text 20,-40 '$number'" label.png label.png

# generate the image

if [ "$sl" -eq '1' ]; then
  mogrify -background transparent -rotate "-3.5" $img # silhouetted
  convert $img -background '#000' -alpha extract - | convert - -background '#000' -alpha shape -resize 600x600 portrait.png # silhouetted
else
  convert $img -resize 900x900 portrait.png # not silhouetted
fi
echo "weapon type: ${weapon}"
# overlay the silhouetted image
convert label.png portrait.png -gravity east -geometry +150-226 -composite output/$number.png
# display output/$number.png
echo "--- DONE! ---"
rm label*
rm portrait.png
rm name.txt
rm epithet.txt
