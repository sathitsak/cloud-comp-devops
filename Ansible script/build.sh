#!/bin/bash

source ./openrc.sh 
export ANSIBLE_HOST_KEY_CHECKING=FALSE
ansible-playbook -i production --ask-become-pass site.yml