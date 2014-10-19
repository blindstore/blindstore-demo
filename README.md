# Blindstore event monitor

Event monitor for real-time tracking the execution of Blindstore clients and server.

## Install the event monitor

Check out this repository to your machine: <code>https://github.com/blindstore/blindstore-demo.git</code>.

### Prerequisites

#### Node.js and the Node package manager `npm`

* First, check if `nodejs` and `npm` is in your package repositories. The following distributions include it as of the writing of this document: 
  * [Ubuntu](http://packages.ubuntu.com/search?keywords=nodejs&searchon=names&suite=trusty&section=all) both since 14.04
  * [Debian](https://packages.debian.org/search?lang=de&searchon=names&keywords=nodejs): `nodejs` but not `npm` in wheezy-backports, both in jessie and sid. So for Wheezy, install from source or the provided binaries.
    * <code>apt-get -t wheezy-backports install "nodejs"</code>
  * [Arch](https://www.archlinux.org/packages/?q=nodejs): in the official repository, `nmp` comes with `nodejs`
  * [Mac OS](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager#osx): via Homebrew, MacPorts or the installer from the [Node.js website](http://nodejs.org/download/)
* Otherwise, try the provided binaries or the source http://nodejs.org/download/ . Instruction for installation without package manager can be found on the Github repository of Node.js https://github.com/joyent/node/ . Instruction for using third party package repositories can be found on https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager .
  * Tested on Debian with <code>cd /usr/local && tar --strip-components 1 -xzf /path/to/node-version-linux-architecture.tar.gz</code> as root.

#### Meteor (local installation as normal user)

    curl https://install.meteor.com/ | sh

#### meteor-collectionapi

    npm install meteorite
    cd bsmon
    node_modules/.bin/mrt add collection-api

In some cases, <code>node_modules/.bin/mrt</code> in in your home directory, so change the commend to <code>~/node_modules/.bin/mrt add collection-api</code>.

## Run

    cd bsmon
    meteor

## Usage

Open `localhost:3000` with a browser.

Use the rest API to update the interface live:

    curl -d '{"date": "2019-12-12", "title": "thushh", "description": "dsajdjsadsada"}' http://localhost:3000/rest/client-events

See also: https://github.com/crazytoad/meteor-collectionapi

## Set up a test environment using Blindstore based on libScarab

### Make sure you have Python 3.4 installed

… as `blindstore` server and client require it. Check the output of `python3 --version`. If it's < 3.4, you have to install it.

* on Debian based systems, do `apt-get install build-essential` beforehand
* download the latest source from https://www.python.org/downloads/ , unpack it and change to the new directory
* `./configure --prefix=/usr/local/opt/python3.4.2` . Adapt this to the version of Python you downloaded.
* `make`
* `sudo make install`

### Create a virtual Python environment

* Decide to which directory you will download all the Blindstore sources later, then for example do `mkdir ~/projects/blindstore`
* If you just installed Python manually: `/usr/local/opt/python3.4.2/bin/pyvenv ~/projects/blindstore/virtualenv3.4.2`
* If Python was already on your system: `pyvenv-3.4 ~/projects/blindstore/virtualenv3.4.2` . You might need to adapt the version number at the end of `pyvenv`.
* `source ~/projects/blindstore/virtualenv3.4.2/bin/activate` . Please remember this: You need to repeat this step in each new terminal you open!

### Install the libaries

* Install `libScarab`, the underlying crypto library, see https://github.com/blindstore/libScarab .
* Install `pyscarab`, a python wrapper to this library, see https://github.com/blindstore/pyscarab .
* Install the event monitor, see above in this readme.
* Install Blindstore, see https://github.com/blindstore/blindstore .
* Check out the `demo` branch of Blindstore: <code>git checkout demo</code>.
* In the Blindstore directory, do <code>cp ../blindstore-demo/bs_demo.py .</code>

### Start the demo

1. Start the event monitor
  * In `blindstore-demo/bsmon`, run <code>meteor</code>.
2. Start the Blindstore server
  * In `blindstore`, run <code>python server_script.py</code>.
3. Start the Blindstore client, which will run some example commands
  * In `blindstore`, run <code>python client_script.py</code>.

To repeat, stop the Blindstore server and the event monitor using `Ctrl+C` and start again from step 1.
You might want to insert some `input('Enter to continue')` at interesting places.
