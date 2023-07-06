import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { deleteTodo } from '../../businessLogic/todos'

const deleteTodoHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const authorization = event.headers.Authorization;
  const split = authorization.split(' ')
  const jwtToken = split[1]

  await deleteTodo(todoId, jwtToken);

  return {
    statusCode: 204,
    body: ''
  };
}

export const handler = middy(deleteTodoHandler).use(cors({ credentials: true }));