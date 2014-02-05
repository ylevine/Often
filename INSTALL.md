# Getting Started

Fork the project to your own repo before making any changes. Use git to clone the project to a working folder on your computer.

I'll be using `C:\github\Often` on Windows, but these instructions should be relative for Apple/Linux as well.

This project is dependent upon the following development tools

- NodeJS
- Python 2.7.x
- bcrypt
- MongoDB
- Git command line
- Bower

#Installing NodeJS

Often runs on the Node.js platform and is required to run the application locally. To install Node.js follow this link and download the appropriate installer for your environment.

http://nodejs.org/

#Installing Python

Often uses `bcrypt` package that depends upon Python to be installed to use the it. Do not install the `v3.x.x` version of Python. For this install guide I used Python 2.7.6 32-bit for Windows.

http://www.python.org/download/

#Installing bcrypt

Bcrypt has specific dependencies related to OpenSSL. For the latest guide on building bcrypt visit their github page. 

https://github.com/ncb000gt/node.bcrypt.js

Bcrypt is challenging to build from source for Windows users. You will need the Visual Studio 2010 C#/C++ compiler, the full OpenSLL library with source and also the `node-gyp` build tool.

There is no build instructions at this stage. Continue with the next tools.

#Installing MongoDB

Often requires a connect to a MongoDB server as the database engine. Installing and running MongoDB is straight forward.

http://www.mongodb.org

After install MongoDB it will have to be running for the server to connect to the DB.

# Installing Bower

Bower is a packaging manager for files used by the web browser. It can be installed easily by using `npm install -g bower`.

> Note: You must use the **-g** option when installing.

https://npmjs.org/package/bower

# Installing Git

Bower requires command line access to Git. Ensure you have `git` available on the command line.

Git command line tools for Windows can be downloaded here.

https://code.google.com/p/msysgit/

> Note: Make sure you select "Run Git from the Windows Command Prompt" during install.

#Building Dependencies

From your console navigate to the project folder `Often.io` that contains the file `package.json`. Node.js comes with a package manager, and project dependencies support.

You can perform an automatic download of all the dependencies for this project, and have `npm` build any dependencies that need building.

    C:\github\Often\>npm install

It's at this stage that `bcrypt` will be successful, or fail building. The first time you run `npm install` it generates a long list of build activities, but running it again will only show dependencies that aren't building successfully. If `bcrypt` is not building you can force a rebuild with `npm rebuild`, and if you are unable to get it to build open an issue on our GitHub project for support.

You will now need to install the Bower packages used by Often

    C:\github\Often\bower install

Once all the packages are installed you can run Often using `npm`.

    C:\github\Often\>npm start
