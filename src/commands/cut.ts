import * as vsc from "vscode";
import {
	saveCopied,
} from "../functions/base";

export default async function cutWithIndent() {
	const tEditor = vsc.window.activeTextEditor;
	if (tEditor) {
		await vsc.commands.executeCommand("editor.action.clipboardCutAction");
		const [text] = await saveCopied(tEditor);
		await vsc.env.clipboard.writeText(text);
		vsc.window.showInformationMessage("Cuted with indent.");
	} else {
		vsc.window.showWarningMessage("copypaste-with-indent.cut: can't get 'tEditor'.");
	}
}