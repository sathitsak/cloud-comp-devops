This script builds the infrastructure for the Cluster and Cloud Computing COMP90024 assignment.

#### Pre Requisities
* Python
* Pip

#### Setup

* Make the key private:
  chmod 600 cloud.key
* Make the scripts executable:
  chomd +x openrc.sh
  chmod +x build.sh
* Install Ansible
  pip install ansible


#### Running the Script
./build.sh


### The cluster couchDB script were taken from
https://github.com/AURIN/comp90024/tree/master/couchdb