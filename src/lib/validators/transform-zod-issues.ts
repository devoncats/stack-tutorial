export function transformZodIssues(error: {
  issues: Array<{ path: (string | number | symbol)[]; message: string }>;
}): Record<string, string[]> {
  const issues: Record<string, string[]> = {};

  error.issues.forEach((issue) => {
    const path = issue.path.map((p) => String(p)).join(".");
    if (!issues[path]) issues[path] = [];
    issues[path].push(issue.message);
  });

  return issues;
}
