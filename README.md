# README

This README would normally document whatever steps are necessary to get your application up and running.

## What is this?

Crisis is an API to query a database of Key Workers during a public health crisis.

### [TLDR] Getting Up & Running

- pull down the repo with `git clone git@gitlab.spokedev.xyz:crisis/crisis-backend.git`
- Install dependencies with `npm install` or `yarn`
- Use Docker Compose to start the service with `npm run docker:up`
- GET `http://localhost:3000/crisis/priority?priorityGrant=food|delivery&mobileNumber=%2B447843627130` or

  ```
  curl --location --request GET 'http://localhost:3000/crisis/priority?priorityGrant=food|delivery&mobileNumber=%2B447843627130' \
  --header 'x-correlation-id: 66FC5B0F-D5A2-405C-8C86-9C41A30A151A' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmppZ3Nhdy54eXovIiwiaWQiOiI2MDVBNEM0MC04MEExLTQxQUUtQTU5Qi1BMUZGQ0UxQzVEOTAiLCJuYW1lIjoiSm9lIEJsb2dncyIsImVtYWlsIjoiam9lQGppZ3Nhdy54eXoiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidGVuYW50X2lkIjoiMzA1NkU5MDQtNjg3Ny00Qjg1LTgyQzEtQjE3NjcyRDJFNDk5IiwidGVuYW50X25hbWUiOiJKaWdzYXcgWFlaIiwiaWF0IjoxNTE2MjM5MDIyfQ.SxTtQbBMoU-Bc8H1g844I1TPJ5FtstZCr3GfpQhgGZI'
  ```

- Stop the service with `ctrl + c`
- Clean up with `npm run docker:down`

### Pre-requisites

- Install MSSql on your local machine using the following walk-through: https://www.microsoft.com/en-us/sql-server/developer-get-started/node/mac
- [Docker resources](https://docs.docker.com/compose/install/)
