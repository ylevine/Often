# Getting Started

Fork the project to your own repo before making any changes. Use git to clone the project to a working folder on your computer.

I'll be using `C:\github\Often` on Windows, but these instructions should be relative for Apple/Linux as well.

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

#Installing MongoDB

Often requires a connect to a MongoDB server as the database engine. Installing and running MongoDB is straight forward.

http://www.mongodb.org

#Installing Dependencies

From your console navigate to the project folder `Often.io` that contains the file `package.json`. Node.js comes with a package manager, and project dependencies support.

You can perform an automatic download of all the dependencies for this project.

    C:\github\Often\src\Often.io\>npm install

Once all the packages are installed you can run Often using `npm`.

    C:\github\Often\src\Often.io\>npm start

Enjoy,