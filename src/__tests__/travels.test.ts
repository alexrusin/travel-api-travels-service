import supertest from "supertest";
import { createServer } from "../server";
import TravelRepository from "../repositories/TravelRepository";
import { travel } from "./__fixtures__/travels";
import { ConnectionRefusedError } from "sequelize";

jest.mock("../repositories/TravelRepository");

const getAll = jest.fn();
const getById = jest.fn();
//@ts-ignore
TravelRepository.mockImplementation(() => {
  return {
    getAll,
    getById,
  };
});

beforeEach(() => {
  // @ts-ignore
  TravelRepository.mockClear();
  getAll.mockClear();
  getById.mockClear();
});

describe("list travels endpoint", () => {
  it("it returns travels", async () => {
    getAll.mockImplementation(
      async (
        options?: Record<string, any>
      ): Promise<Array<TravelAttributes>> => {
        return [travel];
      }
    );

    await supertest(createServer())
      .get("/v1/travels")
      .expect(200)
      .then((res) => {
        expect(res.body.travels.length).toBe(1);
        expect(res.body.travels[0]).not.toHaveProperty("created_at");
        expect(res.body.travels[0].tours.length).toBe(1);
      });
  });

  it("it returns no travels", async () => {
    getAll.mockImplementation(
      async (
        options?: Record<string, any>
      ): Promise<Array<TravelAttributes>> => {
        return [];
      }
    );
    await supertest(createServer())
      .get("/v1/travels")
      .expect(200)
      .then((res) => {
        expect(res.body.travels.length).toBe(0);
      });
  });

  it("throws and an error when getting travels", async () => {
    const errorMessage = "Connection refused";
    getAll.mockImplementation(
      async (
        options?: Record<string, any>
      ): Promise<Array<TravelAttributes>> => {
        const parentError = new Error(errorMessage);
        throw new ConnectionRefusedError(parentError);
      }
    );
    await supertest(createServer())
      .get("/v1/travels")
      .expect(400)
      .then((res) => {
        expect(res.body.error.message).toBe(errorMessage);
      });
  });
});

describe("get travel endpoint", () => {
  it("it returns a travel", async () => {
    getById.mockImplementation(
      async (
        id: string,
        options?: Record<string, any>
      ): Promise<TravelAttributes> => {
        return travel;
      }
    );

    await supertest(createServer())
      .get("/v1/travels/abcd")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("travel");
        expect(res.body.travel).not.toHaveProperty("created_at");
      });
  });

  it("it returns 404 not found", async () => {
    getById.mockImplementation(
      async (
        id: string,
        options?: Record<string, any>
      ): Promise<TravelAttributes | null> => {
        return null;
      }
    );

    await supertest(createServer())
      .get("/v1/travels/abcd")
      .expect(404)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
        expect(res.body.error.code).toBe("ERR_NF");
      });
  });
});
