import * as vscode from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind,
	Executable
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "redstone-code" is now active!');

	let serverPath = vscode.workspace.getConfiguration('redstone').get<string>('server.path');

	if (serverPath == undefined) {
		void vscode.window.showErrorMessage(
			`Cannot activate redstone extension: serverPath is undefined.
			Please set "redstone.server.path" in your settings.json`,
		);
		throw new Error("serverPath undefined");
	}

	let serverExecutable: Executable = {
		command: serverPath
	};

	let serverOptions: ServerOptions = {
		run: serverExecutable,
		debug: serverExecutable
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: "file", language: "java" }]
	};

	client = new LanguageClient(
		"redstone",
		"Redstone Java Language Server",
		serverOptions,
		clientOptions
	);

	client.start();


	let disposable = vscode.commands.registerCommand('redstone-code.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from redstone-code!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
