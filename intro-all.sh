echo "Creating intros..."
for f in $(find m/ -maxdepth 1 | sed 1d | sed -e 's/m\///g'); do ./intro.sh $f; done;
echo "Generating intro page..."
cp index-template.html index.html; sr=$(for f in intros/*; do echo "<img src=\"$f\">"; done); echo $sr >> index.html; echo '</div></div></body></html>' >> index.html
