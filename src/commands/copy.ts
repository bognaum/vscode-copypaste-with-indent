import * as vsc from "vscode";
import {
	saveCopied,
} from "../functions/base";

export default async function copyWithIndent() {
	const tEditor = vsc.window.activeTextEditor;
	if (tEditor) {
		await vsc.commands.executeCommand("editor.action.clipboardCopyAction");
		const [text] = await saveCopied(tEditor);
		await vsc.env.clipboard.writeText(text);
		vsc.window.showInformationMessage("Copied with indent.");
	} else {
		vsc.window.showWarningMessage("copypaste-with-indent.copy: can't get 'tEditor'.");
	}
}