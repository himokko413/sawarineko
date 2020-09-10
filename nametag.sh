printf "name: " 
read name
CutyCapt --url="http://127.0.0.1/s/p/shibuya/namebox.html" --out="nb.png" --smooth; mogrify -transparent black -fuzz 1% -trim nb.png; convert nb.png -alpha extract tb2.png; mogrify -define connected-components:mean-color=true -define connected-components:area-threshold=50 -connected-components 4 tb2.png; convert nb.png tb2.png -alpha off -compose copy_opacity -composite ${name}.png; rm tb2.png; rm nb.png; mogrify -resize x32 -crop x40+0+0 +repage ${name}.png
feh ${name}.png
