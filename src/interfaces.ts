// This file is meant to be deleted when you clone the project

export interface Person {
  name: string
  age: number
}

export interface Address {
  street: string
  city: string
  zipCode: string
}

export interface Company {
  name: string
  address: Address
}

export interface User {
  id: number
  username: string
  email: string
}
