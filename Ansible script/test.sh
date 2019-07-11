#!/bin/bash

source ./openrc-test.sh 
export ANSIBLE_HOST_KEY_CHECKING=FALSE
ansible-playbook -i staging -vvv test.yml