#!/bin/bash
declare -a array=(2010 2011 2012 2013 2014 2015 2016)
arraylength=${#array[@]}

for (( i=0; i<${arraylength}; i++ ));
do
  year=${array[$i]}
  node twitter_harvester.js 01/01/$year 01/07/$year Melbourne
  node twitter_harvester.js 02/07/$year 31/12/$year Melbourne
  sleep 10s
done
