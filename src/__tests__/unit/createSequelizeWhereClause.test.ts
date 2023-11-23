import { Op } from "sequelize";
import createSequelizeWhereClause from "../../utils/getSequelizeWhereClause";
import { parse } from "liqe";
import { depthOfObject } from "../../utils/functions";

describe("the function throws errors", () => {
  it("it throws error if filter by string is invalid", () => {
    expect(() => {
      createSequelizeWhereClause(parse("name hello~dkjfj&"), ["name"]);
    }).toThrow(Error);
  });

  it("it throws error if expression contains single term", () => {
    expect(() => {
      createSequelizeWhereClause(parse("name"), ["name"]);
    }).toThrow(Error);
  });

  it("it throws error if expression doesn't have an operator", () => {
    expect(() => {
      createSequelizeWhereClause(parse("name hello"), ["name"]);
    }).toThrow(Error);
  });

  it("it throws error if expression has multiple words without quotes", () => {
    expect(() => {
      createSequelizeWhereClause(parse("greeting:hello world"), ["name"]);
    }).toThrow(Error);
  });

  it("it throws error if expression contains field not included in filter by", () => {
    expect(() => {
      createSequelizeWhereClause(parse("status:Shipped"), ["name"]);
    }).toThrow(Error);
  });
});

describe("the function returns where clause", () => {
  it("returns where clause for an equality", () => {
    const result = createSequelizeWhereClause(parse("name:Alex"), ["name"]);
    expect(result).toMatchObject({
      name: {
        [Op.eq]: "Alex",
      },
    });
  });
  it("returns where clause for a different equality", () => {
    const result = createSequelizeWhereClause(parse("name:John"), ["name"]);
    expect(result).toMatchObject({
      name: {
        [Op.eq]: "John",
      },
    });
  });
  it("returns where clause multiple words", () => {
    const result = createSequelizeWhereClause(parse('name:"John Doe"'), [
      "name",
    ]);
    expect(result).toMatchObject({
      name: {
        [Op.eq]: "John Doe",
      },
    });
  });

  it("returns greater", () => {
    const result = createSequelizeWhereClause(parse("number_of_days:>5"), [
      "name",
      "number_of_days",
    ]);
    expect(result).toMatchObject({
      number_of_days: {
        [Op.gt]: 5,
      },
    });
  });

  it("returns greater or equal", () => {
    const result = createSequelizeWhereClause(parse("number_of_days:>=5"), [
      "name",
      "number_of_days",
    ]);
    expect(result).toMatchObject({
      number_of_days: {
        [Op.gte]: 5,
      },
    });
  });

  it("returns between", () => {
    const result = createSequelizeWhereClause(
      parse("number_of_days:[3 TO 5]"),
      ["name", "number_of_days"]
    );
    expect(result).toMatchObject({
      number_of_days: {
        [Op.between]: [3, 5],
      },
    });
  });

  it("returns and expression", () => {
    const result = createSequelizeWhereClause(
      parse('name:"Cool Trip" AND number_of_days:[3 TO 5]'),
      ["name", "number_of_days"]
    );
    expect(result).toMatchObject({
      [Op.and]: [
        {
          name: {
            [Op.eq]: "Cool Trip",
          },
        },
        {
          number_of_days: {
            [Op.between]: [3, 5],
          },
        },
      ],
    });
  });

  it("returns or expression", () => {
    const result = createSequelizeWhereClause(
      parse('name:"Cool Trip" OR number_of_days:[3 TO 5]'),
      ["name", "number_of_days"]
    );
    expect(result).toMatchObject({
      [Op.or]: [
        {
          name: {
            [Op.eq]: "Cool Trip",
          },
        },
        {
          number_of_days: {
            [Op.between]: [3, 5],
          },
        },
      ],
    });
  });

  it("returns double and expression", () => {
    const result = createSequelizeWhereClause(
      parse('name:"Cool Trip" AND number_of_days:>3 AND number_of_days:<5'),
      ["name", "number_of_days"]
    );
    expect(result).toMatchObject({
      [Op.and]: [
        {
          [Op.and]: [
            {
              name: {
                [Op.eq]: "Cool Trip",
              },
            },
            {
              number_of_days: {
                [Op.gt]: 3,
              },
            },
          ],
        },
        {
          number_of_days: {
            [Op.lt]: 5,
          },
        },
      ],
    });
  });
});
