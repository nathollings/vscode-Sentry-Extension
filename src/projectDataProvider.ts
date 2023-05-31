import * as vscode from 'vscode';
import { Project } from './project';
import fetch, { Response } from 'node-fetch';
import { Environment } from './environment';
import { AppDataProvider } from './appDataProvider';

export class ProjectDataProvider extends AppDataProvider implements vscode.TreeDataProvider<Project | Environment> {
  private _projects: Project[];
  private _onDidChangeTreeData: vscode.EventEmitter<Project | Environment | undefined> = new vscode.EventEmitter<Project | Environment | undefined>();

  constructor() {
    super();
    this.fetchProjects();
    // this.fetchEnvs();
    this._projects = [];

  }

  // onDidChangeTreeData: vscode.Event<Issue | undefined> = this._onDidChangeTreeData.event;
  onDidChangeTreeData: vscode.Event<Project | Environment | undefined> = this._onDidChangeTreeData.event;

  refresh(): void {
    // todo: get items from sentry
    this._onDidChangeTreeData.fire(undefined);
  }

  // fetchEnvs(): void {
  //   // Get URL, token, secret, and organization slug from settings
  //   const settingsUrl: string | undefined = vscode.workspace.getConfiguration('sentry-tracking').get('url');
  //   const settingsToken = vscode.workspace.getConfiguration('sentry-tracking').get('token');
  //   const settingsSecret = vscode.workspace.getConfiguration('sentry-tracking').get('secret');
  //   const settingsOrganizationSlug = vscode.workspace.getConfiguration('sentry-tracking').get('organisationSlug');

  //   // Build the URL to fetch environments
  //   const environmentsUrl = `https://${settingsUrl}/api/0/organizations/${settingsOrganizationSlug}/environments/`;

  //   // Fetch the environments
  //   fetch(environmentsUrl, {
  //     method: 'GET',
  //     headers: {
  //       'authorization': `Bearer ${settingsToken}`,
  //       'contentType': 'application/json',
  //     },
  //   })
  //     .then((response: Response) => response.json())
  //     .then((data: any) => {
  //       console.log('environments:', data);

  //       // Assuming the fetched data is an array of environments
  //       this._environments = data.map((environment: any) => {
  //         return new Environment(environment.id, environment.projectId, environment.name, environment.displayName);
  //       });

  //       this.refresh();
  //     })
  //     .catch((error: any) => {
  //       console.error('Error:', error);
  //     });
  // }

  fetchProjects(): void {

    // get url from settings
    const settingsUrl: string | undefined = vscode.workspace.getConfiguration('sentry-tracking').get('url');
    // strip https:// from url
    const settingsUrlStripped = settingsUrl ? settingsUrl.replace('https://', '') : '';
    const settingsToken = vscode.workspace.getConfiguration('sentry-tracking').get('token');
    const settingsSecret = vscode.workspace.getConfiguration('sentry-tracking').get('secret');
    const settingsOrganizationSlug = vscode.workspace.getConfiguration('sentry-tracking').get('organisationSlug');
    const url = `https://${settingsUrlStripped}/api/0/projects/`;


    // fetch last 100 issues
    fetch(url, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${settingsToken}`,
        'contentType': 'application/json',
      },
    })
      .then((response: Response) => response.json())
      .then((data: any) => {
        // Assuming the fetched data is an array of issues
        console.log('projects:', data);

        this._projects = data.map((project: any) => {
          return new Project(project.id, project.name, project.slug);
        });
        this.refresh();
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });
  }

  getSelectedProjectSlug(projectId: string | undefined): string | undefined {

    if (!projectId) {
      return undefined;
    }
    return this._projects.find(project => project.id === projectId)?.slug;
  }

  getTreeItem(element: Project | Environment): vscode.TreeItem | Thenable<vscode.TreeItem> {
    if (element instanceof Project) {
      const treeItem = new vscode.TreeItem(element.name, vscode.TreeItemCollapsibleState.None);
      treeItem.tooltip = element.id;
      treeItem.command = {
        command: 'sentry-tracking.selectProject',
        title: 'Select Project',
        arguments: [element]
      };
      return treeItem;
    } else if (element instanceof Environment) {
      const treeItem = new vscode.TreeItem(element.name, vscode.TreeItemCollapsibleState.None);
      treeItem.tooltip = element.id;
      treeItem.command = {
        command: 'sentry-tracking.selectProject',
        title: 'Select Project',
        arguments: [element]
      };
      return treeItem;
    } else {
      throw new Error('Unknown tree item');
    }
  }

  getChildren(element?: Project | Environment): vscode.ProviderResult<(Project | Environment)[]> {
    if (!element) {
      return this._projects;
    }
  }
}