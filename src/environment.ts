/**
 * Represents an environment in Sentry.
 */
export class Environment {
  /**
   * Creates a new instance of SentryEnvironment.
   * @param id - The unique identifier of the environment.
   * @param projectId - The project to which the environment belongs.
   * @param name - The name of the environment.
   * @param displayName - The display name of the environment.
   */
  constructor(
    public readonly id: string,
    public readonly projectId: string,
    public readonly name: string,
    public readonly displayName: string,
  ) { }
}
