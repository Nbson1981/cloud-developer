import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
// import { getUserId } from '../utils'


const updateTodoHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ')
  const jwtToken = split[1]

  await updateTodo(todoId, updatedTodo, jwtToken);

  return {
    statusCode: 200,
    body: ''
  };
}

export const handler = middy(updateTodoHandler).use(cors({ credentials: true }));