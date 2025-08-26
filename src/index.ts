// This file is meant to be deleted when you clone the project
// Sample TypeScript index.ts content
import { type User } from './interfaces.js'

class Greeter {
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return 'Hello, ' + this.greeting
  }
}

function sum(a: number, b: number): number {
  return a + b
}

const printUser = (user: User): void => {
  console.log(`User ID: ${user.id}`)
  console.log(`Username: ${user.username}`)
  console.log(`Email: ${user.email}`)
}

const user: User = {
  id: 1,
  username: 'johndoe',
  email: 'john.doe@example.com',
}

const greeter = new Greeter('world')

console.log(greeter.greet())
printUser(user)
console.log(`The sum of 5 and 3 is ${sum(5, 3)}`)
