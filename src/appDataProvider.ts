import * as vscode from 'vscode';


export class AppDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

  protected _selectedProjectId?: string;
  protected _selectedEnvironmentId?: string;

  setSelectedProjectId(projectId: string): void {
    this._selectedProjectId = projectId;
  }

  setSelectedEnvironmentId(environmentId: string | undefined): void {
    this._selectedEnvironmentId = environmentId;
  }


  getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
    return [];
  }
}