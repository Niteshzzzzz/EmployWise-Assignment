
# EmployWise Assignment

This project is a user management system with authentication, user listing, and CRUD operations. Users log in via POST /api/login with predefined credentials. Upon successful authentication, a token is stored, and the user is redirected to the Users List page. The list is fetched from GET /api/users?page=1, displaying user details in a structured format with pagination or lazy loading. Users can edit (PUT /api/users/{id}) or delete (DELETE /api/users/{id}) their details, with appropriate success and error messages.


## Install Dependencies

To Install all Dependencies run this command:
    
    npm Install

## Tun The Project

To run the project use this command:

    npm run dev

## Login Credentials
    
    1) email: eve.holt@reqres.in
    2) password: cityslicka

## Project Diployed Link :

    https://employ-wise-assignment-rho.vercel.app/