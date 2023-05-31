import { Environment } from './environment';
/**
 * Represents a project in Sentry.
 */
export class Project {
  /**
   * Creates a new instance of Project.
   * @param id - The unique identifier of the project.
   * @param name - The name of the project.
   * @param slug - The URL slug for the project.
   * @param environments - The environments associated with the project (optional).
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly environments?: Environment[],
  ) { }
}
