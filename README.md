# Loop Pro

### Getting Started

> First time? Add NX
- `npm i -g nx` 
- or you can use npx - ie. `npx nx serve`

> Run
- `nx serve`
- `npm run duo` (serve frontend + backend)
- `npm run all` (serve frontend + backend) + public-api)

### Command sets
- `nx serve {name}`
- `nx lint {name}`
- `nx build {name}`
- `nx build {name} production`
- `nx docker-build {name}`
- `nx test {name}`
- `nx e2e {name}-e2e`

## Understand this workspace
- Run `nx graph` to see a diagram of the dependencies of the projects.
- Run `npm run doc:{name}` to see documentation.
- Visit the [Nx Documentation](https://nx.dev) to learn more.

