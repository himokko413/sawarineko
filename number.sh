inLoop=true

while $inLoop;
do
  ran=$((RANDOM % 9999))
  ran=$(printf "%04d\n" $ran)
  echo $ran
  if [ ! -d "m/$ran" ]; then inLoop=false; fi
done
echo "New member's number should be: $ran"
