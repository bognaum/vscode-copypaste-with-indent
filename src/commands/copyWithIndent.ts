import * as vsc from "vscode";
import globalStorage from "../globalStorage";
import {
	getTrimmedLines,
	getFirstLIndent,
} from "../functions/base";

export default async function copyWithIndent() {
	const tEditor = vsc.window.activeTextEditor;
	if (tEditor) {
		await vsc.commands.executeCommand("editor.action.clipboardCopyAction");
		const 
			text         = await vsc.env.clipboard.readText(),
			oldIndent    = getFirstLIndent(tEditor, tEditor.selection.start),
			trimmedLines = getTrimmedLines(text),
			trimmedText  = trimmedLines.join("\n");
		globalStorage.copied = {
			text,
			indent: oldIndent,
		};
		await vsc.env.clipboard.writeText(trimmedText);
		vsc.window.showInformationMessage("Copied with indent.");
	} else {
		vsc.window.showWarningMessage("copypaste-with-indent.pasteWithIndent: \n can't get 'tEditor'.");
	}
}