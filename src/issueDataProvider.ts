import * as vscode from 'vscode';
import fetch, { Response } from 'node-fetch';
import { Issue } from './issue';
import { AppDataProvider } from './appDataProvider';
import { ProjectDataProvider } from './projectDataProvider';

export class IssueDataProvider extends AppDataProvider implements vscode.TreeDataProvider<Issue> {
  private _issues: Issue[];
  private _onDidChangeTreeData: vscode.EventEmitter<Issue | undefined> = new vscode.EventEmitter<Issue | undefined>();

  constructor(
    protected projectDataProvider: ProjectDataProvider,
  ) {
    super();
    this._issues = [
      new Issue('issue-1-id', 'Issue 1 Title', 'Issue 1 Culprit', 'Open', 'High', 'project-1-id', 'environment-1-id'),
      new Issue('issue-1-id', 'Issue 1 Title', 'Issue 1 Culprit', 'Open', 'High', 'project-1-id', 'environment-2-id'),
      new Issue('issue-2-id', 'Issue 2 Title', 'Issue 2 Culprit', 'Closed', 'Low', 'project-2-id', 'environment-3-id'),
      new Issue('issue-2-id', 'Issue 2 Title', 'Issue 2 Culprit', 'Closed', 'Low', 'project-2-id', 'environment-4-id'),
      new Issue('issue-3-id', 'Issue 3 Title', 'Issue 3 Culprit', 'Open', 'Medium', 'project-1-id', 'environment-1-id'),
      new Issue('issue-4-id', 'Issue 4 Title', 'Issue 4 Culprit', 'Open', 'High', 'project-2-id', 'environment-4-id'),
      new Issue('issue-5-id', 'Issue 5 Title', 'Issue 5 Culprit', 'Closed', 'Low', 'project-1-id', 'environment-1-id'),
      // Add more dummy issues here
    ];
  }

  onDidChangeTreeData: vscode.Event<Issue | undefined> = this._onDidChangeTreeData.event;

  fetchIssues(): void {
    // get items from sentry api 

    // get url from settings
    const settingsUrl: string | undefined = vscode.workspace.getConfiguration('sentry-tracking').get('url');
    // strip https:// from url
    const settingsUrlStripped = settingsUrl ? settingsUrl.replace('https://', '') : '';
    const settingsToken = vscode.workspace.getConfiguration('sentry-tracking').get('token');
    const settingsSecret = vscode.workspace.getConfiguration('sentry-tracking').get('secret');
    const settingsOrganizationSlug = vscode.workspace.getConfiguration('sentry-tracking').get('organisationSlug');

    const projectSlug = this.projectDataProvider.getSelectedProjectSlug(this._selectedProjectId);
    console.log('projectSlug', projectSlug);
    console.log('orgslug', settingsOrganizationSlug);


    const url = `https://${settingsUrlStripped}/api/0/projects/${settingsOrganizationSlug}/${projectSlug}/issues/`;
    console.log('url', url);

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

        console.log('issues:', data);
        // Assuming the fetched data is an array of issues
        this._issues = data.map((issue: any) => {
          //   // Convert the fetched data to an instance of the `Issue` class
          return new Issue(
            issue.id,
            issue.title,
            issue.culprit,
            issue.status,
            issue.priority,
            issue.project.id,
            issue.permalink,
          );
        });
        // Trigger the tree data change event to refresh the view


        this._onDidChangeTreeData.fire(undefined);
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });
  }

  refresh(): void {
    // todo: get items from sentry
    if (this._selectedProjectId && this._selectedProjectId !== 'all') {
      this.fetchIssues();
    }
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: Issue): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const name = element.title + ' [' + element.status + ']';
    const treeItem = new vscode.TreeItem(name, vscode.TreeItemCollapsibleState.None);
    treeItem.tooltip = element.id;
    treeItem.command = {
      command: 'issueDataProvider.openWebpage',
      title: 'Select Issue',
      arguments: [element.permalink],
    };

    return treeItem;
  }

  getChildren(element?: Issue): vscode.ProviderResult<Issue[]> {
    if (!element) {
      let _issues: Issue[] = this._issues;
      if (this._selectedProjectId && this._selectedProjectId !== 'all') {
        console.log('filtering by project id', this._selectedProjectId);
        _issues = this._issues.filter(issue => issue.projectId === this._selectedProjectId);
      }
      return _issues;
    }
  }
}
