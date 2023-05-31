/**
 * Represents an issue or error captured by Sentry.
 */
export class Issue {
  /**
   * Creates a new instance of SentryIssue.
   * @param id - The unique identifier of the issue.
   * @param title - The title or summary of the issue.
   * @param culprit - The culprit or source code file responsible for the issue.
   * @param status - The current status of the issue.
   * @param level - The severity level of the issue.
   * @param projectId - The project to which the issue belongs.
   * @param environmentId - The environment to which the issue belongs.
   * @param assignedTo - The user or team assigned to the issue (optional).
   * @param createdAt - The date and time when the issue was created (optional).
   * @param lastSeen - The date and time when the issue was last seen (optional).
   * @param permalink - The URL to the issue in Sentry (optional).
   */
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly culprit: string,
    public readonly status: string,
    public readonly level: string,
    public readonly projectId: string,
    public readonly permalink?: string,
    public readonly assignedTo?: string,
    public readonly createdAt?: Date,
    public readonly lastSeen?: Date,
  ) { }
}
