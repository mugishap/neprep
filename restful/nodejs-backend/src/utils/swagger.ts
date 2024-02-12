import { Application, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NE NodeJS API',
            description: "API endpoints for ne nodejs documented on swagger",
            contact: {
                name: "Precieux Mugisha",
                email: "precieuxmugisha@gmail.com",
                url: "https://github.com/mugisha/neprep"
            },
            version: '1.0.0',
        },

        servers: [
            {
                url: "http://localhost:5006/",
                description: "Local server"
            }
        ]
    },
    // looks for configuration in specified directories
    apis: [`./routes/*.ts`],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app: Application) {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/api/v1/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}
export default swaggerDocs