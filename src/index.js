const express = require('express');
const { v4: uuidv4 } = require("uuid")

const app = express();

//localhost:3333

//Receber JSON na aplicação
app.use(express.json());

const customers = [];

//Middleware
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customer.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "customer not found" })
  }

  request.customer = customer;

  return next();
}

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExistis = customers.some(
    (customer) => customer.cpf === cpf
  )

  if (customerAlreadyExistis) {
    return response.status(400).json({ error: "Customer already Exists!" })
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });
  return response.status(201).send()
})

//app.use(verifyIfExistsAccountCPF) Todas as rotas usarão o middleware

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement)
});

app.listen(3333); //Start application
