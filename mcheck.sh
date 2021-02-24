# check which member depictions are ignored / processed, at a glance
for f in $(find m/ -maxdepth 1 | tail -n +2); do
  export SWR_IGNORE=true;
  source $f/dep.sh;
  g="${f:2}"
  if [ "$SWR_IGNORE" = false ]; 
  then
    tput setaf 2;
  else
    tput setaf 1;
  fi
  echo "${g} (${SWR_NAME}): ${SWR_IGNORE}"
done
