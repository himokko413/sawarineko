for f in $(find m/ -maxdepth 1 | sed 1d | sed -e 's/m\///g'); do ./intro.sh $f; done;
