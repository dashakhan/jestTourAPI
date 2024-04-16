import { tourWithOutName } from './tour';
import * as supertest from "supertest";
import { user } from "../data/user";
import { tour, createRandomTour } from "../data/tour";
const request = supertest("localhost:8001/api/v1");
const requestSDET = supertest("https://practice-react.sdetunicorns.com/api/test")



export function upload(files: string[]): Promise<any> {
  const req = requestSDET
  .post('/upload/multiple')

  files.forEach(file =>{
    req .attach('multiple', file)
  })
  return req
}



export async function signUp(user: string | object | undefined): Promise<any> {
  return await request.post("/users/signup").send(user);
}


export async function login(user: {
  email: string;
  password: string;
}): Promise<any> {
  return await request.post("/users/login").send({
    email: user.email,
    password: user.password,
  });
}

export async function createTour(cookie: [x: string]): Promise<any>{
  return await request
  .post("/tours")
  .set("Cookie", cookie)
  .send(tour())
}


export async function deleteFunction(cookie: [x: string]): Promise<any> {
  return await request.delete("/users/deleteMe").set("Cookie", cookie);
  //.expect(204);
}


// export async function loginTest({
//   email: string;
//   password: string;
// }) {
//   return await request
//     .post("/users/login")
//     .send({
//     email: user.email,
//     password: user.password,
//   });
// }
