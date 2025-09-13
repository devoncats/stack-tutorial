import {
  validateCreateUser,
  validateUpdateUser,
} from "@/validators/user/validate";

describe("Create User Validator", () => {
  test("Valid data passes validation", () => {
    const input = {
      email: "devoncats.dev@outlook.com",
      name: "Gregorio Samsa",
    };

    expect(validateCreateUser(input).success).toBe(true);
  });

  test("Invalid email fails validation", () => {
    const input = {
      email: "invalid-email",
      name: "Gregorio Samsa",
    };

    expect(validateCreateUser(input).success).toBe(false);
  });

  test("Missing email fails validation", () => {
    const input = {
      name: "Gregorio Samsa",
    };

    expect(validateCreateUser(input).success).toBe(false);
  });
});

describe("Update User Validator", () => {
  test("Valid update data passes validation", () => {
    const input = {
      email: "notdevoncats.dev@outlook.com",
      name: "Anti Gregorio Samsa",
    };
    expect(validateUpdateUser(input).success).toBe(true);
  });

  test("Invalid email fails validation", () => {
    const input = {
      email: "maybe-an-invalid-email",
      name: "Anti Gregorio Samsa",
    };
    expect(validateUpdateUser(input).success).toBe(false);
  });

  test("Missing email passes if not required", () => {
    const input = {
      name: "Anti Gregorio Samsa",
    };
    expect(validateUpdateUser(input).success).toBe(true);
  });

  test("Missing name passes if not required", () => {
    const input = {
      email: "notdevoncats.dev@outlook.com",
    };
    expect(validateUpdateUser(input).success).toBe(true);
  });

  test("Empty input fails validation", () => {
    const input = {};
    expect(validateUpdateUser(input).success).toBe(false);
  });
});
