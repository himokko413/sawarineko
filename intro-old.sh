#!/bin/bash
# Sothis is the default. She ALWAYS is. -th
[[ -z $1 ]] && m='99991' || m=$1

# Source the depiction of the member
source m/$m/dep.sh

# Colorize the background -th
convert profilebg002.png -colorspace RGB -fill $SWR_COLOR -tint 50 profilebg002-color.png;

# Get the portrait, resize to scale, overlay on right
if [ -f m/$m/p2.png ]
then
  convert m/$m/p2.png -resize x900 resized_p.png
else
  convert m/$m/p.png -resize x900 resized_p.png
fi
convert profilebg002-color.png resized_p.png -colorspace RGB -gravity east -composite profilebg002-color.png
rm resized_p.png

# Add the colored rectangle for the member's title
mogrify -gravity northwest -fill $SWR_COLOR -draw "rectangle 0,136 750,185" profilebg002-color.png;

# Full name in top
echo "Full name: $SWR_FULL_NAME"
mogrify -font Roboto-Condensed-Light-Italic -pointsize 72 -draw "gravity northwest fill $SWR_COLOR text 25,35 '${SWR_FULL_NAME^^}'" profilebg002-color.png;

# Epithet in rectangle
echo "Title: $SWR_EPITHET"
mogrify -font Helvetica -pointsize 42 -draw "gravity northwest fill \"#fefefe\" text 58,144 '${SWR_EPITHET}'" profilebg002-color.png;

# Add "info" box
mogrify -gravity northwest -fill $SWR_COLOR -draw "polygon 57,195 288,195 297,204 297,220 654,220 654,222 57,222" profilebg002-color.png;
mogrify -font Helvetica -pointsize 28 -draw "gravity northwest fill \"#fefefe\" text 65,196 'd a t a'" profilebg002-color.png;

# Type
echo "Type: $SWR_TYPE"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1380,-199 'type :'" profilebg002-color.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-199 '${SWR_TYPE}'" profilebg002-color.png;

# Source
echo "Source: $SWR_SOURCE"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1380,-150 'source :'" profilebg002-color.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-150 '${SWR_SOURCE}'" profilebg002-color.png;

# Age
echo "Age: $SWR_AGE"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1380,-101 'age :'" profilebg002-color.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-101 '${SWR_AGE}'" profilebg002-color.png;

# Pronouns
echo "Pronouns: $SWR_PRONOUNS"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1380,-52 'pronouns :'" profilebg002-color.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-52 '${SWR_PRONOUNS}'" profilebg002-color.png;

# Role
echo "Role: $SWR_ROLE"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1380,-3 'role :'" profilebg002-color.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,-3 '${SWR_ROLE}'" profilebg002-color.png;

# Proxy
echo "Proxy: $SWR_PROXY"
mogrify -font Helvetica -pointsize 32 -draw "gravity east fill \"#212221\" text 1380,46 'proxy :'" profilebg002-color.png;
mogrify -font Helvetica -pointsize 32 -draw "gravity west fill \"#212221\" text 230,46 '${SWR_PROXY}'" profilebg002-color.png;

# Intro/description field will only render if intro is provided
if [ ! -z "$SWR_DESC" ]
then
echo "Intro: $SWR_DESC"
# Add "intro" box
mogrify -gravity northwest -fill $SWR_COLOR -draw "polygon 57,630 288,630 297,639 297,655 654,655 654,657 57,657" profilebg002-color.png;
mogrify -font Helvetica -pointsize 28 -draw "gravity northwest fill \"#fefefe\" text 65,631 'i n t r o'" profilebg002-color.png;

# Make the text itself
convert -background none -size 597x -fill "#212221" -font Helvetica -pointsize 28 caption:"${SWR_DESC}" text.png
convert profilebg002-color.png text.png -gravity northwest -geometry +60+665 -compose over -composite profilebg002-color.png
rm text.png
fi
mogrify -colorspace sRGB profilebg002-color.png
mv profilebg002-color.png intros/$m.png
rm profilebg002-color.png*
