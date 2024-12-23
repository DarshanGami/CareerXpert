const request = require('supertest');
const { describe, it, beforeEach, before } = require('mocha');
const app = require('../app'); // Import the app instance
const { connection } = require('../DB_connect'); // Import your DB connection logic
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../models/userModel'); // Assuming your user model is in this path

// Use chai-http for making requests and chai for assertions
chai.use(chaiHttp);
const expect = chai.expect; // Define expect as chai's expect function

before(async () => {
  try {
    await connection();
    // console.log('DB connection successful');
  } 
  catch (error) {
    console.error('DB connection failed', error);
  }
});

let jobSeekerRegTkn;
let recruiterRegTkn;
let jobseekerLogTkn;
let recruiterLogTkn;
let forgetPswTkn;
let invalidLogTkn;
let jobSeekerId;
let recruiterId;

const jobSeeker = {
    username: 'ValidJobSeeker',
    email: 'jobseeker1@gmail.com',
    password: 'Passw0rd@123',
    role: 'Job Seeker',
};

const recruiter = {
    username: 'ValidRecruiter',
    email: 'recruiter1@gmail.com',
    password: 'Passw0rd@123',
    role: 'Recruiter',
};

describe('User Registration API Unit Tests', function () {
  describe('Positive Test Cases', function () {
      it('Register a Job Seeker Successfully with Valid Inputs', async function () {
          this.timeout(0); 

          const response = await request(app).post('/api/v1/user/register').send(jobSeeker);

          jobSeekerRegTkn = response.body.verificationToken;
          jobSeekerId = response.body.user._id;
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('status', 'success');
          expect(response.body).to.have.property('message', 'Signup successful, check your email to verify your account.');
      });

      it('Register a Recruiter Successfully with Valid Inputs', async function () {
          this.timeout(0); 
          
          const response = await request(app).post('/api/v1/user/register').send(recruiter);
          
          recruiterRegTkn = response.body.verificationToken;
          recruiterId = response.body.user._id;
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('status', 'success');
          expect(response.body).to.have.property('message', 'Signup successful, check your email to verify your account.');
      });
  });

  describe('Negative Test Cases', function () {
      it('Return an Error if the Email is Already Registered', async function () {
          this.timeout(0); 

          const response = await request(app).post('/api/v1/user/register').send(jobSeeker);

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Email is already registered.');
      });

      it('Return an Error for Empty Request Body', async function () {
          this.timeout(0); 

          const response = await request(app).post('/api/v1/user/register').send({});

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Empty required field.');
      });

      it('Return an Error for Missing Username', async function () {
          this.timeout(0); 

          const userData = {
              email: 'email1@gmail.com',
              password: 'Passw0rd@123',
              role: 'Job Seeker',
          };

          const response = await request(app).post('/api/v1/user/register').send(userData);

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Empty required field.');
      });

      it('Return an Error for Missing Email', async function () {
          this.timeout(0); 

          const userData = {
              username: 'Harmit',
              password: 'Passw0rd@123',
              role: 'Job Seeker',
          };

          const response = await request(app).post('/api/v1/user/register').send(userData);

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Empty required field.');
      });

      it('Return an Error for Missing Password', async function () {
          this.timeout(0); 

          const userData = {
              username: 'Harmit',
              email: 'email2@gmail.com',
              role: 'Job Seeker',
          };

          const response = await request(app).post('/api/v1/user/register').send(userData);

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Empty required field.');
      });

      it('Return an Error for Missing Role', async function () {
          this.timeout(0); 

          const userData = {
              username: 'Harmit',
              email: 'email3@gmail.com',
              password: 'Passw0rd@123',
          };

          const response = await request(app).post('/api/v1/user/register').send(userData);

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Empty required field.');
      });

      // it('Return an Error for Invalid Email Format', async function () {
      //     this.timeout(0); 

      //     const userData = {
      //         username: 'Harmit',
      //         email: 'invalid-email',
      //         password: 'Passw0rd@123',
      //         role: 'Job Seeker',
      //     };

      //     const response = await request(app).post('/api/v1/user/register').send(userData);

      //     expect(response.status).to.equal(400);
      //     expect(response.body).to.have.property('message', 'User validation failed: email: Please provide a valid email');
      // });

      // it('Return an Error for Weak Password', async function () {
      //     this.timeout(0); 

      //     const userData = {
      //         username: 'Harmit',
      //         email: 'email4@gmail.com',
      //         password: 'weakpass',
      //         role: 'Job Seeker',
      //     };

      //     const response = await request(app).post('/api/v1/user/register').send(userData);

      //     expect(response.status).to.equal(400);
      //     expect(response.body).to.have.property(
      //         'message',
      //         'User validation failed: password: Password must contain at least one letter, one number, and one special character'
      //     );
      // });

      it('Return an Error for Invalid Role', async function () {
          this.timeout(0); 

          const userData = {
              username: 'JohnDoe',
              email: 'email5@gmail.com',
              password: 'Passw0rd@123',
              role: 'Admin', // Invalid role
          };

          const response = await request(app).post('/api/v1/user/register').send(userData);

          expect(response.status).to.equal(400);
      });
  });
});

describe('Email Verification API Unit Tests', function () {
  describe('Positive Test Cases', function () {
      it('Verify Email Successfully with Valid Token - Job Seeker', async function () {
          this.timeout(0);
        //   const userData = {
        //       username: 'ValidUser',
        //       email: 'email94@gmail.com',
        //       password: 'Passw0rd@123',
        //       role: 'Job Seeker',
        //   };

        //   const response = await request(app).post('/api/v1/user/register').send(userData);
          // console.log(response.body);
        //   expect(response.status).to.equal(200);
        //   token = response.body.verificationToken;
        // console.log(jobSeekerRegTkn);

          const res = await request(app).get(`/api/v1/user/verify-email?token=${jobSeekerRegTkn}`);
          // console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status', 'success');
          expect(res.body.message).to.equal('Email verified successfully.');    
      });

      it('Verify Email Successfully with Valid Token - Recruiter', async function () {
        this.timeout(0);
        const res = await request(app).get(`/api/v1/user/verify-email?token=${recruiterRegTkn}`);
        // console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.message).to.equal('Email verified successfully.');    
    });
    });

    describe('Negative Test Cases', function () {
        it('Return an Error if the Email is Already Verified', async function () {
            this.timeout(0);
        
            const res = await request(app).get(`/api/v1/user/verify-email?token=${jobSeekerRegTkn}`);
            // console.log(res.body);
            expect(res.status).to.be.equal(400);
            expect(res.body).to.have.property('message', 'Invalid token or already verified account.');
        });

        it('Return an Error for Invalid or Expired Token', async function () {
            this.timeout(0);
        
            const invalidTkn = "eyICTGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYnNlZWtlcjFAZ21haWwuY29tIiwiaWF0IjoxNzMyOTU5MjY3LCJleHAiOjE3MzMwNDU2Njd9.b_eLq1g9veatbKpCTzuz4QqQ0f4mpzgyS6fPmHOOK8Q";
            const res = await request(app).get(`/api/v1/user/verify-email?token=${invalidTkn}`);
            // console.log(res.body);
            expect(res.status).to.be.equal(400);
            expect(res.body).to.have.property('message', 'invalid token');
        });
    });
});

describe('User Login API Unit Tests', function () {
  this.timeout(0);

  describe('Positive Test Cases', function () {
    //   it('Register - and verify email', async function () {
    //       this.timeout(0);
    //       const userData = {
    //           username: 'ValidUser',
    //           email: 'email111@gmail.com',
    //           password: 'Passw0rd@123',
    //           role: 'Job Seeker',
    //       };

    //       const response = await request(app).post('/api/v1/user/register').send(userData);
    //       expect(response.status).to.equal(200);

    //       token = response.body.verificationToken;
    //       const res = await request(app).get(`/api/v1/user/verify-email?token=${token}`);
    //       expect(res.status).to.equal(200);
    //   });

      it('Successful Login After Email Verification - Job Seeker', async function () {
        //   const userData = {
        //       email: 'email111@gmail.com',
        //       password: 'Passw0rd@123',
        //       role: 'Job Seeker',
        //   };

          const response = await request(app).post('/api/v1/user/login').send(jobSeeker);
          jobseekerLogTkn = response.body.token;

          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('status', 'success');
          expect(response.body).to.have.property('message', 'user logged in successfully');
      });

      it('Successful Login After Email Verification - Recruiter', async function () {

          const response = await request(app).post('/api/v1/user/login').send(recruiter);
          recruiterLogTkn = response.body.token;

          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('status', 'success');
          expect(response.body).to.have.property('message', 'user logged in successfully');
      });
  });

  describe('Negative Test Cases', function () {
      it('Missing role', async function () {
          const userData = {
              email: 'email1@gmail.com',
              password: 'Passw0rd@123',
              // role is missing
          };

          const response = await request(app).post('/api/v1/user/login').send(userData);
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Empty required field.');
      });

      it('Missing email', async function () {
          const userData = {
              role: 'Job Seeker',
              password: 'Passw0rd@123',
              // email is missing
          };

          const response = await request(app).post('/api/v1/user/login').send(userData);
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Empty required field.');
      });

      it('Missing password', async function () {
          const userData = {
              email: 'email1@gmail.com',
              role: 'Job Seeker',
              // password is missing
          };

          const response = await request(app).post('/api/v1/user/login').send(userData);
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Empty required field.');
      });

      it('Invalid email', async function () {
          const userData = {
              email: 'nonexistent@gmail.com',
              password: 'Passw0rd@123',
              role: 'Job Seeker',
          };

          const response = await request(app).post('/api/v1/user/login').send(userData);
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Invalid Email.');
      });

      it('Wrong password', async function () {
          const userData = {
              email: 'jobseeker1@gmail.com',
              password: 'WrongPass@123',
              role: 'Job Seeker',
          };

          const response = await request(app).post('/api/v1/user/login').send(userData);
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Wrong password.');
      });

      it('Incorrect role', async function () {
          const userData = {
              email: 'jobseeker1@gmail.com',
              password: 'Passw0rd@123',
              role: 'Admin', // assuming 'Admin' is not the user's role
          };

          const response = await request(app).post('/api/v1/user/login').send(userData);
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'invalid credentials');
      });

      it('Unregistered email', async function () {
          const userData = {
              email: 'unregistered@gmail.com',
              password: 'Passw0rd@123',
              role: 'Job Seeker',
          };

          const response = await request(app).post('/api/v1/user/login').send(userData);

          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('message', 'Invalid Email.');
      });

      it('Unverified email', async function () {
        const userData = {
            username: 'unverifiedUser',
            email: 'unverified@gmail.com',
            password: 'Passw0rd@123',
            role: 'Job Seeker',
        };

        const res = await request(app).post('/api/v1/user/register').send(userData);
        expect(res.status).to.equal(200);
        token = res.body.verificationToken;

        const response = await request(app).post('/api/v1/user/login').send(userData);
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('message', 'Email is not verified yet, please do it first');
    });
  });
});

describe('USER Get Me API UNIT TESTS', async function () {
  describe('Positive Test Cases', function () {
  it('should retrieve the current logged-in user', async function () {
      this.timeout(0); 
      const res = await request(app).get('/api/v1/user/me').set('cookie', [`token=${jobseekerLogTkn}`]);

      // console.log(res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status', 'success');
      expect(res.body.data).to.have.property('user');
  });
});

describe('Negative Test Cases', function () {
  // it('should return 404 if the user does not exist', async function () {
  //   this.timeout(0); 
  //     // Remove the user from the database
  //     const userId = "674b005a740b41d2e78a275f";
  //     // await User.findByIdAndDelete(userId);

  //     const res = await request(app)
  //         .get('/api/v1/user/me')
  //         .set('cookie', [`token=${jobseekerLogTkn}`]); // Use token of deleted user

      // console.log(res.body);
  //     expect(res).to.have.status(404);
  //     expect(res.body).to.have.property('status', 'failure');
  //     expect(res.body).to.have.property('message', 'No user found with that ID');
  // });

  it('should return 400 if no token is provided', async function () {
    this.timeout(0); 
      const res = await request(app)
          .get('/api/v1/user/me'); // No token sent

      // console.log(res.body);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('success', false);
      expect(res.body).to.have.property('message', 'You are not logged in');
  });

  it('should return 401 if an invalid token is provided', async function () {
    this.timeout(0); 
    invalidLogTkn = "eyICTGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGFlMzRkY2Y5NmRmZDNjZjg5ZDhhYiIsImlhdCI6MTczMjk2MTExNSwiZXhwIjoxNzMzMTMzOTE1fQ.hz-1f9T3CDW40SO76vTgwcbXjjOiOSM3Sj2VbFRp2N0";
      const res = await request(app)
          .get('/api/v1/user/me')
          .set('cookie', [`token=${invalidLogTkn}`]); // Invalid token

        // console.log(res.body);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('success', false);
      expect(res.body).to.have.property('message', 'InValid JWT, Try again.');
  });
});
});

describe('update profile',  async function () {
  describe('Positive Test Cases',  async function () {
  it('update-profile with username',  async function () {
    this.timeout(0);
    const updateData = {
      username: 'luffy'
    };
    const res = await request(app).patch('/api/v1/user/update-profile').set('cookie', [`token=${jobseekerLogTkn}`]).send(updateData);
    // console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('message', 'Profile updated successfully');
  });
});

describe('Negative Test Cases', function () {
  it('Updating email is not allowed via this route.',  async function () {
    this.timeout(0);
        const res = await request(app).patch('/api/v1/user/update-profile').set('cookie', [`token=${jobseekerLogTkn}`]).send({ email: 'newemail@example.com' });
        // console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'Updating email is not allowed via this route.');
  });

  it('Updating role is not allowed via this route.',  async function () {
    this.timeout(0);
    const res = await request(app).patch('/api/v1/user/update-profile').set('cookie', [`token=${jobseekerLogTkn}`]).send({ role: 'Recruiter' });
    // console.log(res.body);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('message', 'Updating role is not allowed via this route.');
  });
});
});

describe('delete profile', function () {

    describe('Negative Test Cases', function () {
        it('should return 404 if the user does not exist', async function () {
          const fakeUserId = "64d0e6fd4527b3c399000000";
    
          const res = await request(app)
            .delete(`/api/v1/user/delete/${fakeUserId}`)
            .set('cookie', [`token=${recruiterLogTkn}`]);
          
          // console.log(res.body);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status', 'failure');
          expect(res.body).to.have.property('message', `User with ID: ${fakeUserId} not found`);
        });
    
        it('should return 500 if a server error occurs', async function () {
          const res = await request(app)
            .delete('/api/v1/user/delete/invalid_id') 
            .set('cookie', [`token=${recruiterLogTkn}`]);
          
          // console.log(res.body);
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('status', 'error');
          expect(res.body).to.have.property('message', 'Server error');
        });
      });

    describe('Positive Test Cases', function () {
      it('should delete the user if the user exists', async function () {
       
        // console.log(recruiterId);
        const res = await request(app)
          .delete(`/api/v1/user/delete/${recruiterId}`)
          .set('cookie', [`token=${recruiterLogTkn}`]); 
        
          // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('message', `User with ID: ${recruiterId} deleted successfully`);
      });
    });
});

describe('User Forget Password API Unit Tests', function () {
    this.timeout(0);
    describe('Positive Test Cases', function () {
        it('forget pass - correct', async function () {
            this.timeout(0);
            
            // const userData = {
            //     // username: 'ValidUser',
            //     email: 'email1@gmail.com',
            //     // password: 'Passw0rd@123',
            //     // role: 'Job Seeker',
            // };

            const response = await request(app).post('/api/v1/user/forgot-password').send(jobSeeker);
            // console.log(response.body);
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('success');
            expect(response.body.message).to.equal('Token sent to email!');

            forgetPswTkn = response.body.resetToken;
        });
    });

    describe('Negative Test Cases', function () {
        it('forget pass - inv email', async function () {
            this.timeout(0);
            
            const userData = {
                // username: 'ValidUser',
                email: 'invemail1@gmail.com',
                // password: 'Passw0rd@123',
                // role: 'Job Seeker',
            };

            const response = await request(app).post('/api/v1/user/forgot-password').send(userData);
            // console.log(response.body);
            expect(response.status).to.equal(404);
            expect(response.body.success).to.equal(false);
            expect(response.body.message).to.equal('User not found with that email.');
        });

        it('forget pass - with no email', async function () {
            this.timeout(0);
            
            const userData = {
               
            };

            const response = await request(app).post('/api/v1/user/forgot-password').send(userData);
            // console.log(response.body);
            expect(response.status).to.equal(404);
            expect(response.body.success).to.equal(false);
            expect(response.body.message).to.equal('User not found with that email.');
        });
    });
});

describe('User Reset Password API Unit Tests', function () {
    this.timeout(0);

    describe('Negative Test Cases', function () {
      it('reset-forget pass - missing psw', async function () {
          this.timeout(0);
          
          // const updPassword = {
          //     // username: 'ValidUser',
          //     email: 'email1@gmail.com',
          //     // password: 'Passw0rd@123',
          //     // role: 'Job Seeker',
          // };
  
          // const response = await request(app).post('/api/v1/user/forgot-password').send(updPassword);
          // console.log(response.body);
          // expect(response.status).to.equal(200);
          // expect(response.body.status).to.equal('success');
          // expect(response.body.message).to.equal('Token sent to email!');
  
          // rstToken = response.body.resetToken;
  
          const updPassword = {
              // password: 'newpassword123@',
          }

          const resetResp = await request(app).post(`/api/v1/user/reset-password/${forgetPswTkn}`).send(updPassword);
  
          // console.log(resetResp.body);
          expect(resetResp.status).to.equal(500);
          expect(resetResp.body).to.have.property('message').that.includes('password: Path `password` is required.');
          expect(resetResp.body).to.have.property('success', false);
      });
  
    //   it('reset-forget pass - psw invalid', async function () {
    //       this.timeout(0);
          
    //       // const userData = {
    //       //     // username: 'ValidUser',
    //       //     email: 'email1@gmail.com',
    //       //     // password: 'Passw0rd@123',
    //       //     // role: 'Job Seeker',
    //       // };
  
    //       // const response = await request(app).post('/api/v1/user/forgot-password').send(userData);
          // console.log(response.body);
    //       // expect(response.status).to.equal(200);
    //       // expect(response.body.status).to.equal('success');
    //       // expect(response.body.message).to.equal('Token sent to email!');
  
    //       // rstToken = response.body.resetToken;
  
    //       const updPassword = {
    //           password: 'nwpsw',
    //       }
  
    //       const resetResp = await request(app).post(`/api/v1/user/reset-password/${forgetPswTkn}`).send(updPassword);
  
          // console.log(resetResp.body);
    //       expect(resetResp.status).to.equal(400);
    //       expect(resetResp.body).to.have.property('message').that.includes('Password must be at least 8 characters long');
    //       expect(resetResp.body).to.have.property('success', false);
    //   });
    });

    describe('Positive Test Cases', function () {
    it('reset-forget pass - correct', async function () {
        this.timeout(0);
        
        const userData = {
            // username: 'ValidUser',
            email: 'email1@gmail.com',
            // password: 'Passw0rd@123',
            // role: 'Job Seeker',
        };

        // const response = await request(app).post('/api/v1/user/forgot-password').send(userData);
        // console.log(response.body);
        // expect(response.status).to.equal(200);
        // expect(response.body.status).to.equal('success');
        // expect(response.body.message).to.equal('Token sent to email!');

        // rstToken = response.body.resetToken;

        const updPassword = {
            password: 'newpassword123@',
        }

        const resetResp = await request(app).post(`/api/v1/user/reset-password/${forgetPswTkn}`).send(updPassword);

        // console.log(resetResp.body);
        expect(resetResp.status).to.equal(200);
        expect(resetResp.body.status).to.equal('success');
        expect(resetResp.body.message).to.equal('Password reset successfull.');
    });
  });
});

describe('User Logout API Unit Tests', function () {
  describe('Positive Test Cases', function () {
      it('Logout Successfully and Clear the Cookie', async function () {
          this.timeout(0);
              const userData = {
                  username: 'ValidUser',
                  email: 'email111@gmail.com',
                  password: 'Passw0rd@123',
                  role: 'Job Seeker',
              };
              const resReg = await request(app).post('/api/v1/user/register').send(userData);
              const token = resReg.body.verificationToken;
              const res = await request(app).get(`/api/v1/user/verify-email?token=${token}`);
              const resLog2 = await request(app).post('/api/v1/user/login').send(userData);
    
              const logToken = resLog2.body.token;

              const resLog = await request(app).post('/api/v1/user/logout').set('cookie', [`token=${logToken}`]);

              // console.log(resLog.body);
              expect(resLog).to.have.status(200);
              expect(resLog.body).to.have.property('status', 'success');
              expect(resLog.body).to.have.property('message', 'Logged out successfully...');

              // Check the cookie
            //   const cookies = response.headers['set-cookie'];
            //   expect(cookies).to.be.an('array').that.is.not.empty;

              // // Verify the token cookie is cleared
              // const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));
              // expect(tokenCookie).to.include('token=');
              // expect(tokenCookie).to.include('Expires='); // Check if expiry is set
      });
  });

  describe('Negative Test Cases', function () {
      it('with invalid login cookie', async function () {
          this.timeout(0);

              const response = await request(app)
                  .post('/api/v1/user/logout')
                  .set('cookie', [`token=${invalidLogTkn}`]);

              // console.log(response.body);

              expect(response).to.have.status(400);
              expect(response.body).to.have.property('message', 'InValid JWT, Try again.');
      });
  });
});