import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user } from "../../data/user";

describe("USER SIGN UP", () => {
  describe("POSITIVE TEST", () => {
    // it("create new user", async () => {
    //   const res = await request.post("/users/signup").send({
    //     name: "Dasha",
    //     email: "test31@gmail.com",
    //     password: "pass1234",
    //     passwordConfirm: "pass1234",
    //   });
    // });

    it.only("create new user with imported data", async () => {
      const res = await request.post("/users/signup").send(user).expect(201);
      console.log(res.body, "+++++++++++++++++++");
      expect(res.body.status).toBe("success");
      expect(res.statusCode).toEqual(201);
    });

    it("create new user with imported data version 2", async () => {
      await request
        .post("/users/signup")
        .send(user)
        .then((res) => {
          console.log(res.body, "++++++++++++++++");
          expect(res.statusCode).toEqual(201);
          expect(res.body.status).toBe("success");
          expect(res.statusCode).toEqual(201);
          expect(res.body.data.user.name).toBe(user.name);
        });
    });

    it("create new user with imported data version 3", (done) => {
      request
        .post("/users/signup")
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          console.log(res.body, "=====================");
          expect(res.statusCode).toEqual(201);
          expect(res.body.status).toBe("success");
          done();
        });
    });
  });

  describe("NEGATIVE TEST", () => {
    it("should not create new user with the same email", async () => {
      await request.post("/users/signup").send(user);
      await request
        .post("/users/signup")
        .send(user)
        .then((resp) => {
          console.log(resp.body, "==========================");
          expect(resp.body.message).toBe(
            `E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${user.email}" }`
          );
          expect(resp.statusCode).toEqual(500);
          expect(resp.body.status).toBe("error");
          expect(resp.body.KeyValue).not.toBe({ email: "${user.email}" });
        });
    });

    it("should not create new user with the same email version2", (done) => {
      request
        .post("/users/signup")
        .send(user)
        .end(() => {});
      request
        .post("/users/signup")
        .send(user)
        .end((err, resp) => {
          if (err) return done(err);
          console.log(resp.body, "==========================");
          expect(resp.body.message).toBe(
            `E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${user.email}" }`
          );
          expect(resp.statusCode).toEqual(500);
          expect(resp.body.status).toBe("error");
          expect(resp.body.KeyValue).not.toBe({ email: "${user.email}" });
          done();
        });
    });

    it("should not create new user w/o name field", async () => {
      await request
        .post("/users/signup")
        .send({
          email: user.email,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
        })
        .then((resMissingField) => {
          console.log(resMissingField,"====================");
          expect(resMissingField.statusCode).toEqual(500);
          expect(resMissingField.body.status).toBe("error");
          expect(resMissingField.body.error.name).toBe("ValidationError");
          expect(resMissingField.body.message).toBe(
            "User validation failed: name: Please tell us your name!"
          );
        });
    });

    it("should not create new user w/o name field version2", (done) => {
      request
        .post("/users/signup")
        .send({
          email: user.email,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
        })
        .end((err, resMissingFieldV2) => {
          if (err) return done(err);
          console.log(resMissingFieldV2, "++++++++++++++++");
          expect(resMissingFieldV2.statusCode).toEqual(500);
          expect(resMissingFieldV2.body.status).toBe("error");
          expect(resMissingFieldV2.body.error.name).toBe("ValidationError");
          expect(resMissingFieldV2.body.message).toBe(
            "User validation failed: name: Please tell us your name!"
          );
          done();
        });
    });
    it("should not create new user w/o password", async () => {
      await request
      .post("/users/signup")
      .send({
        name: user.name,
        email: user.email,
        passwordConfirm: user.passwordConfirm
      })
      .then((resMissingPassword) => {
      console.log(resMissingPassword, "0+-_+=-=-=-=-==-=-=-=-")
      expect(resMissingPassword.statusCode).toEqual(500);
      expect(resMissingPassword.body.error._message).toBe('User validation failed');
      expect(resMissingPassword.body.message)
      .toBe('User validation failed: password: Please provide a password, passwordConfirm: Passwords are not the same!')});
    });

    it("should not creatw user w/o password version 2", (done) => {
      request
      .post("/users/signup")
      .send({
        email: user.email,
        password: user.password,
        passwordConfirm: user.passwordConfirm,
      })
      .end((err, resMissingPasswordV2) =>{
        if (err) return done(err);
        console.log(resMissingPasswordV2, '-------++++++');
        expect(resMissingPasswordV2.body.status).toBe('error');
        expect(resMissingPasswordV2.body.error._message).toBe('User validation failed');
        expect(resMissingPasswordV2.statusCode).toEqual(500);
        expect(resMissingPasswordV2.body.error.name).toBe('ValidationError');
        expect(resMissingPasswordV2.body.message).toBe('User validation failed: name: Please tell us your name!')
        done()
      })
    })

    it("should not create user w/o password conformation", async () => {
      await request
      .post("/users/signup")
      .send({
        name: user.name,
        email: user.email,
        password: user.password
      })
      .then((resMissingConf) => {
        console.log(resMissingConf)
        expect(resMissingConf.statusCode).toEqual(500);
        expect(resMissingConf.body.error._message).toBe('User validation failed');
        expect(resMissingConf.body.error.name).toBe('ValidationError');
        expect(resMissingConf.body.message)
        .toBe('User validation failed: passwordConfirm: Please confirm your password')
      })
    })
    
    it("should not create user w/o password conformation version 2", (done) =>{
      request
      .post("/users/signup")
      .send({
        name: user.name,
        email: user.email,
        password: user.password
      })
      .end((err, resMissingConfV2) =>{
        if(err) return done(err);
        console.log(resMissingConfV2, '------------------')
        expect(resMissingConfV2.statusCode).toEqual(500);
        expect(resMissingConfV2.body.status).toBe('error')
        expect(resMissingConfV2.body.error._message).toBe('User validation failed');
        expect(resMissingConfV2.body.error.status).toBe('error')
        expect(resMissingConfV2.body.message).toBe('User validation failed: passwordConfirm: Please confirm your password')
        done()
      })  
    })
  });
});
