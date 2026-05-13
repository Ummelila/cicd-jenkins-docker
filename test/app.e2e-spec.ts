import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
<<<<<<< HEAD
import * as request from 'supertest';
=======
import request from 'supertest';
>>>>>>> 51e75ef5f5a1f48bb8cd816c9ed81ac5c0c57157
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
<<<<<<< HEAD
=======

  afterEach(async () => {
    await app.close();
  });
>>>>>>> 51e75ef5f5a1f48bb8cd816c9ed81ac5c0c57157
});
