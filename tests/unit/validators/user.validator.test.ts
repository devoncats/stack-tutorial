import { describe, expect, it } from "vitest";
import {
  validateCreateUser,
  validateUpdateUser,
} from "@/lib/validators/user/validator";

describe("Create User Validator", () => {
  it("Valid data passes validation", () => {
    const input = {
      email: "devoncats.dev@outlook.com",
      name: "Gregorio Samsa",
    };

    expect(validateCreateUser(input).success).toBe(true);
  });

  it("Invalid email fails validation", () => {
    const input = {
      email: "invalid-email",
      name: "Gregorio Samsa",
    };

    expect(validateCreateUser(input).success).toBe(false);
  });

  it("Missing email fails validation", () => {
    const input = {
      name: "Gregorio Samsa",
    };

    expect(validateCreateUser(input).success).toBe(false);
  });
});

describe("Update User Validator", () => {
  it("Valid update data passes validation", () => {
    const input = {
      email: "notdevoncats.dev@outlook.com",
      name: "Anti Gregorio Samsa",
    };
    expect(validateUpdateUser(input).success).toBe(true);
  });

  it("Invalid email fails validation", () => {
    const input = {
      email: "maybe-an-invalid-email",
      name: "Anti Gregorio Samsa",
    };
    expect(validateUpdateUser(input).success).toBe(false);
  });

  it("Missing email passes if not required", () => {
    const input = {
      name: "Gregor Samsa Updated",
    };
    expect(validateUpdateUser(input).success).toBe(true);
  });

  it("Missing name passes if not required", () => {
    const input = {
      email: "updated.email@outlook.com",
    };
    expect(validateUpdateUser(input).success).toBe(true);
  });

  it("Empty input fails validation", () => {
    const input = {};
    expect(validateUpdateUser(input).success).toBe(false);
  });
});
