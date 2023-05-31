import * as vscode from 'vscode';
import { ProjectDataProvider } from './projectDataProvider';
import { Project } from './project';
import { Environment } from './environment';
import { IssueDataProvider } from './issueDataProvider';
import { env } from 'process';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "sentry-tracking" is now active!');

  const projectDataProvider = new ProjectDataProvider();
  const issueDataProvider = new IssueDataProvider(projectDataProvider);

  // Register the sentryProjectView and create a tree view manually
  const sentryProjectView = vscode.window.createTreeView('sentryProjectView', {
    treeDataProvider: projectDataProvider
  });
  // stop the ree view from being able to expand


  // issue view
  const sentryIssueView = vscode.window.createTreeView('sentryIssueView', {
    treeDataProvider: issueDataProvider
  });
  sentryIssueView.title = 'Sentry Issues';

  // openwebpage command
  context.subscriptions.push(vscode.commands.registerCommand('issueDataProvider.openWebpage', (permalink: string) => {
    vscode.env.openExternal(vscode.Uri.parse(permalink));
  }));


  let disposableSelectProject = vscode.commands.registerCommand('sentry-tracking.selectProject', (element: Project | Environment) => {

    if (element instanceof Environment) {
      issueDataProvider.setSelectedProjectId(element.projectId);
      issueDataProvider.setSelectedEnvironmentId(element.id);
    } else if (element instanceof Project) {
      issueDataProvider.setSelectedProjectId(element.id);
      issueDataProvider.setSelectedEnvironmentId(undefined);
    }
    issueDataProvider.refresh();
  });
  context.subscriptions.push(disposableSelectProject);

  let disposableClearAll = vscode.commands.registerCommand('sentryTracking.clearAll', () => {
    // Your code to clear the sentry tracking goes here.
    console.log('Clear All command invoked!');
  });

  context.subscriptions.push(disposableClearAll);

  // sentry-tracking.refreshProjects
  context.subscriptions.push(vscode.commands.registerCommand('sentry-tracking.refreshProjects', () => {
    projectDataProvider.refresh();
  }));
}

export function deactivate() { }
