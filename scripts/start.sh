#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  npm run build
  npm run start
else
  npm run db:sync
  npm run db:migrate
  npm run dev
fi