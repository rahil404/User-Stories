## User-Exercises

**Description:** This is a React JS app with a backend REST api built with Golang and MongoDB. The idea is to enter new users, assign exercises to each user, and retrieve a full exercise log of a user, with optional filters of **date_from**, **date_to** and **limit**. 

**Instructions for installing the app:**

1. Clone or download the repository.
2. Install MongoDB as a server in your computer: https://docs.mongodb.com/manual/administration/install-community/
3. Install Go: https://golang.org/doc/install

    Create new folder named **test-project** in the **src** folder of your **GoPath**, move the **main.go** file in the src folder. Head to this file      through command prompt and run following commands:
    1. `go get github.com/gorilla/mux`
    2. `go get go.mongodb.org/mongo-driver/mongo`

    This will install the required packages. Then simply run `go run main.go` to turn the backend api active.

4. Make sure to have yarn installed in the system. Now head back to this directory and run `yarn install` to get the dependecies. Finally, run `yarn start` which will start the app in port 3000.
