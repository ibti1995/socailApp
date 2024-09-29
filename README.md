# Linkup
 this repo is a monorepo generated by nx


[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!


## steps to run the project

* clone the  project
* in apps/backend make sure to add .env file similar to .env.example and add your MONGODB_URI

* make sure you have node version 20 or install it using nvm
```sh
node -v
```
* to install dependencies 
```sh
yarn install
```

To run the dev server for your app, use:

```sh
npx nx serve backend
```
To run the dev frontend for your app, use:

```sh
npx nx serve frontend
```

To create a production bundle:

```sh
npx nx build frontend
```
```sh
npx nx build backend
```    
