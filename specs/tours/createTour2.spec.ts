import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user } from "../../data/user";
import { tour, createRandomTour } from "../../data/tour";
import { deleteFunction, signUp, login } from "../../data/helpers";

let cookie: [x: string] 
let signupRes, tourRes;

describe("Poitive scenarios", () => {
  
  beforeAll(async () => {
    signupRes = await signUp(user).then((res) => {
      cookie = res.header["set-cookie"];
      console.log(res.body, " ----- user sign up  ------");
    });

    tourRes = await request.post("/tours").set("Cookie", cookie).send(tour);
    console.log(tourRes.body, "-----tour created----");
  });


  
  it("verify status for Tour creation", async () => {
    expect(tourRes.body.status).toBe("success");
  });

  it("verify tour is an object", async () => {
    expect(typeof tourRes).toBe("object");
  });

  it("verify tour has an id", async () => {
    expect(tourRes.body.data.data.id).toBeTruthy;
  });

  it("verify status code is 201", () => {
    expect(tourRes.statusCode).toBe(201);
  });
});



// describe.skip("TOUR creation with Promise", () => {
//   let cookie: [x: string] = null;
//   beforeAll(async () => {
//     console.log(user, "==== user1===");
//     await signUp(user).then((res) => {
//       expect(res.statusCode).toBe(201);
//       expect(res.body.data.user.email).toBe(user.email);
//       cookie = res.header["set-cookie"];
//       //console.log(res.body);
//     }); });
//     it.skip("create tour with Promise", () => {
//       // let cookie: [x: string] = null;
//        const req = request.post("/tours").set("Cookie", cookie).send(tour);

//        return new Promise((resolve, reject) => {
//          req.end((err, res) => {
//            if (err) {
//              console.error("Error", err);
//              console.log("Error 2", err);
//              reject(err);
//            } else {
//              console.log("Create successfull", res.body);
//              expect(res.status).toBe(200);
//              resolve(res);
//            }
//          });
//        });
//      });
//     });
