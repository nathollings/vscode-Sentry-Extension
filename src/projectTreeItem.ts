import * as vscode from 'vscode';
import { Project } from './project';

export class ProjectTreeItem extends vscode.TreeItem {
  constructor(
    public readonly project: Project,
    collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(project.name, collapsibleState);
  }
}