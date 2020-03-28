# README

This README would normally document whatever steps are necessary to get your application up and running.

#### [TLDR] Getting Up & Running

- Install dependencies with `npm install` or `yarn`
- Use Docker Compose to start the service with `npm run docker`
- GET `http://localhost:3000/crisis/priority?priorityGrant=food|delivery&mobileNumber=07843627131` or

  ```
  curl --location --request GET 'http://localhost:3000/crisis/priority?priorityGrant=food|delivery&mobileNumber=07843627130' \
  --header 'x-correlation-id: 66FC5B0F-D5A2-405C-8C86-9C41A30A151A' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmppZ3Nhdy54eXovIiwiaWQiOiI2MDVBNEM0MC04MEExLTQxQUUtQTU5Qi1BMUZGQ0UxQzVEOTAiLCJuYW1lIjoiSm9lIEJsb2dncyIsImVtYWlsIjoiam9lQGppZ3Nhdy54eXoiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidGVuYW50X2lkIjoiMzA1NkU5MDQtNjg3Ny00Qjg1LTgyQzEtQjE3NjcyRDJFNDk5IiwidGVuYW50X25hbWUiOiJKaWdzYXcgWFlaIiwiaWF0IjoxNTE2MjM5MDIyfQ.SxTtQbBMoU-Bc8H1g844I1TPJ5FtstZCr3GfpQhgGZI'
  ```

- Stop the service with `ctrl + c`

### What is this repository for?

- Quick summary
- Version
- [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up?

- Summary of set up
- Configuration
- Dependencies
- Database configuration
- How to run tests
- Deployment instructions

### Contribution guidelines

- Writing tests
- Code review
- Other guidelines

### Who do I talk to?

- Repo owner or admin
- Other community or team contact
