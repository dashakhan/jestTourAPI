import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user } from "../../data/user";
import { tour,tourWithOutName, tourWithoutDuration, tourWithoutDifficulty, tourWithoutGroupSize, createRandomTour } from "../../data/tour";
import { deleteFunction, signUp, login, createTour } from "../../data/helpers";

describe("TOUR", () => {
  let cookie: [x: string];

  beforeAll(async () => {
    await signUp(user).then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.data.user.email).toBe(user.email);
      cookie = res.header["set-cookie"];
      console.log(user, "==== user1===");
    });
  });

  afterAll(async () => {
    await deleteFunction(cookie).then((res) => {
      expect(res.statusCode).toBe(204);
    });
  });

  it("Create tour", async () => {
    await request
      .post("/tours")
      .set("Cookie", cookie)
      .send(tour())
      .then((res) => {
        console.log(res.body, "---TOUR RES ----");
        expect(res.statusCode).toBe(201);
      });
  });

  it("Create tour with createTour function", async () => {
    await createTour(cookie).then((res) => {
      console.log(res.body, "---res tour  ----");
      expect(res.statusCode).toBe(201);
    });
  });
});



describe("TOUR NEGATIVE", () => {
  let cookie: [x: string];
  beforeAll(async () => {
    await signUp(user).then((res) => {
      expect(res.statusCode).toBe(201);
      cookie = res.header["set-cookie"];
      console.log(user, "==== user2===");
    });
  });

 
  it('Shoud not create tour without Name field', async () => {
    await request
    .post("/tours")
    .set("Cookie", cookie)
    .send(tourWithOutName)
    .then(res => {
      expect(res.statusCode).toBe(500)
    })
  })



  it('Shoud not create tour without duration', async () => {
    await request
    .post("/tours")
    .set("Cookie", cookie)
    .send(tourWithoutDuration)
    .then(res => {
      expect(res.statusCode).toBe(500)
    })
  })

  // it('Shoud not create tour without group size', async () => {
  //   await request
  //   .post("/tours")
  //   .set("Cookie", cookie)
  //   .send(tourWithoutGroupSize)
  //   .then(res => {
  //     expect(res.statusCode).toBe(500)
  //   })
  // })

  it('Shoud not create tour without difficulty', async () => {
    await request
    .post("/tours")
    .set("Cookie", cookie)
    .send(tourWithoutDifficulty)
    .then(res => {
      expect(res.statusCode).toBe(500)
    })
  })

});
