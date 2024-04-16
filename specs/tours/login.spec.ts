import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user } from "../../data/user";
import { deleteFunction, signUp, login } from "../../data/helpers";

describe("USER SIGNUP AND LOGIN", () => {
  describe("POSITIVE", () => {
    let cookie: [x: string];
    
    beforeEach(async ()=> {
      await signUp(user).then((res) => {
        expect(res.statusCode).toBe(201)
        cookie = res.header['set-cookie']
        console.log(res.header, '---res header cookie---')
      })
    })
  
    afterEach(async () => {
      await deleteFunction(cookie).then((el) => {
        expect(el.statusCode).toBe(204);
        expect(el.body).toEqual({})
      })   
      await login(user).then(el => {
        console.log(el.body, '---el.body---');
        expect(el.statusCode).toEqual(401)
      })
    })

    it("login user with delete request", async () => {
      await login(user)
      .then((resLogin) => {
        console.log(resLogin.body, '---- resLogin.body ----');
        expect(resLogin.statusCode).toEqual(200);
      });
      // const res = await signUp(user).then((res) => {
      //   console.log(res.headers,'---- res headers ----');
      //   expect(res.statusCode).toBe(201);
      // });
  
      // cookie = await login(user).then((resLogin) => {
      //   console.log(resLogin.body, '---- resLogin.body ----');
      //   return resLogin.header["set-cookie"];
      //   expect(resLogin.statusCode).toEqual(200);
      // });
      // await deleteFunction(cookie).then((el) => {
      //   console.log(el.body, "------delete f el body-----");
      //   expect(el.statusCode).toBe(204);
      // });

      // await login(user).then((el) => {
      //   console.log(el.body, "------login after del el body-----");
      //   expect(el.statusCode).toBe(401);
      // });
    });
    it("login user vesrion 2", async () => {
      // await request
      //   .post("/users/signup")
      //   .send(user)
      //   .then((res) => {
      //     console.log(res.body, "--------------");
      //     expect(res.statusCode).toEqual(201);
      //     expect(res.body.status).toBe("success");
      //     expect(res.body.data.user.role).toBe("user");
      //   });
        const userLog = await login(user)
        console.log(userLog.body, "-----resLogn body -----");
        expect(userLog.statusCode).toEqual(200);
    });
  
    it("login user vesrion 3", (done) => {
      // request
      //   .post("/users/signup")
      //   .send(user)
      //   .end((err, res) => {
      //     if (err) return done(err);
      //     console.log(res.body, "-----res body -----");
      //     expect(res.statusCode).toEqual(201);
          request
            .post("/users/login")
            .send({
              email: user.email,
              password: user.password,
            })
            .end((err, resLogin) => {
              if (err) return done(err);
              console.log(resLogin.body, "------resLogin -----");
              expect(resLogin.statusCode).toEqual(200);
              done();
            });
  });  
});

  describe("NEGATIVE", () => {
    let cookie: [x: string];
    
    beforeEach(async () => {
      await signUp(user).then((res) => {
        expect(res.statusCode).toBe(201);
        cookie = res.header["set-cookie"];
      });
    });

    afterEach(async () => {
      await deleteFunction(cookie).then((el) => {
        expect(el.statusCode).toBe(204);
        expect(el.body).toEqual({});
      });
    });

    it("user can not login with invalid credentials ", async () => {
      await login({
        email: user.email + '1',
        password: user.password + '1'
      }).then(el => {
        console.log(el.body, '-----BODY-----')
        expect(el.statusCode).toBe(401)
      })
    })

    it('user can not login with invalid credentials ver2', async () => {
        let userLogin2 = await login({
          email: user.email + '1',
          password: user.password + '1'
        })
        console.log(userLogin2, '--- userLogin v2---')
        expect(userLogin2.statusCode).toBe(401)
    })

    it('user can not login with invalid credentials ver3', (done) => {
      request
      .post("/users/login")
      .send({
        email: user.email + '1',
          password: user.password + '1'
      })
      .end((err, resLogin) => {
        if (err) return done(err);
        console.log(resLogin, '--- resLogin v3 ---')
        expect(resLogin.statusCode).toBe(401)
        done()
      })
    })
  });
});

