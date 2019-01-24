#!/usr/bin/env node
const qr = require("qr-image");
const fastify = require("fastify")({ logger: true })

fastify.get("/", async (request, reply) => {
  const qr_png = qr.image(request.query.content, { type: 'png' });
  reply
    .code(200)
    .header("Content-Type", "image/png")
    .send(qr_png)
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, "0.0.0.0")
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
