# Supabase Auth for CLI tools

This submodule provides convenience helpers for implementing user authentication in CLI applications.

## Install the CLI helper library

NPM
```shell
npm install supabase-auth-helpers-cli
```

YARN
```shell
yarn add supabase-auth-helpers-cli
```

## Basic Setup

Import the createCLISupabaseClient client object.
```js
import { createCLISupabaseClient } from 'supabase-auth-helpers-cli';

// define your supabase variables, must be passed to CLI tool at build
const supabaseUrl = '';
const supabaseKey = ''; // use your annon key and secure your db with RLS

// create a new client for the CLI application
export const supabase = createCLISupabaseClient(supabaseUrl, supabaseKey);
```
You can then use the client in your CLI apps, see: [fredoist/greeting-you](https://github.com/fredoist/greeting-you).
