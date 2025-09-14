import { describe, expect, it } from "vitest";

import {
  validateCreatePost,
  validateUpdatePost,
} from "@/lib/validators/post/validator";

describe("Create Post Validator", () => {
  it("Valid data passes validation", () => {
    const input = {
      title: "Die Verwandlung",
      content:
        "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.",
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateCreatePost(input).success).toBe(true);
  });

  it("Title exceeding max length fails validation", () => {
    const input = {
      title: "g".repeat(61),
      content:
        "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.",
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateCreatePost(input).success).toBe(false);
  });

  it("Title at max length passes validation", () => {
    const input = {
      title: "g".repeat(60),
      content:
        "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.",
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateCreatePost(input).success).toBe(true);
  });

  it("Missing title fails validation", () => {
    const input = {
      content:
        "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.",
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateCreatePost(input).success).toBe(false);
  });

  it("Missing authorId fails validation", () => {
    const input = {
      title: "Die Verwandlung",
      content:
        "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.",
    };

    expect(validateCreatePost(input).success).toBe(false);
  });

  it("Content exceeding max length fails validation", () => {
    const input = {
      title: "Die Verwandlung",
      content: "g".repeat(281),
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateCreatePost(input).success).toBe(false);
  });

  it("Content at max length passes validation", () => {
    const input = {
      title: "Die Verwandlung",
      content: "g".repeat(280),
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateCreatePost(input).success).toBe(true);
  });

  it("Empty content fails validation", () => {
    const input = {
      title: "Die Verwandlung",
      content: "",
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateCreatePost(input).success).toBe(false);
  });

  it("Missing content passes validation", () => {
    const input = {
      title: "Die Verwandlung",
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateCreatePost(input).success).toBe(true);
  });

  it("Invalid authorId fails validation", () => {
    const input = {
      title: "Die Verwandlung",
      content:
        "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.",
      authorId: "invalid-cuid",
    };

    expect(validateCreatePost(input).success).toBe(false);
  });

  it("Empty input fails validation", () => {
    const input = {};

    expect(validateCreatePost(input).success).toBe(false);
  });
});

describe("Update Post Validator", () => {
  it("Valid update data passes validation", () => {
    const input = {
      title: "The Metamorphosis",
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateUpdatePost(input).success).toBe(true);
  });

  it("Invalid title fails validation", () => {
    const input = {
      title: "",
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateUpdatePost(input).success).toBe(false);
  });

  it("Title exceeding max length fails validation", () => {
    const input = {
      title: "g".repeat(61),
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateUpdatePost(input).success).toBe(false);
  });

  it("Title at max length passes validation", () => {
    const input = {
      title: "g".repeat(60),
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateUpdatePost(input).success).toBe(true);
  });

  it("Missing title passes if not required", () => {
    const input = {
      content:
        "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.",
      published: true,
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateUpdatePost(input).success).toBe(true);
  });

  it("Content exceeding max length fails validation", () => {
    const input = {
      content: "g".repeat(281),
    };

    expect(validateUpdatePost(input).success).toBe(false);
  });

  it("Content at max length passes validation", () => {
    const input = {
      content: "g".repeat(280),
    };

    expect(validateUpdatePost(input).success).toBe(true);
  });

  it("Empty content fails validation", () => {
    const input = {
      content: "",
    };

    expect(validateUpdatePost(input).success).toBe(false);
  });

  it("Missing content passes if not required", () => {
    const input = {
      title: "The Metamorphosis",
    };

    expect(validateUpdatePost(input).success).toBe(true);
  });

  it("Invalid authorId fails validation", () => {
    const input = {
      authorId: "invalid-cuid",
    };

    expect(validateUpdatePost(input).success).toBe(false);
  });

  it("Valid authorId passes validation", () => {
    const input = {
      authorId: "cmfivd1xv000104l5hkcq6pkp",
    };

    expect(validateUpdatePost(input).success).toBe(true);
  });

  it("Empty input fails validation", () => {
    const input = {};

    expect(validateUpdatePost(input).success).toBe(false);
  });
});
