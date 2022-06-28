import * as vsc from "vscode";
import {
	saveCopied,
	getTrimmedLines,
} from "../functions/base";

export default async function copyWithIndent() {
	const tEditor = vsc.window.activeTextEditor;
	if (tEditor) {
		await vsc.commands.executeCommand("editor.action.clipboardCopyAction");
		const 
			[text, firstLineIndent] = await saveCopied(tEditor),
			trimmedText  = getTrimmedLines(firstLineIndent + text).join("\n");
		await vsc.env.clipboard.writeText(trimmedText);
	} else {
		vsc.window.showWarningMessage("copypaste-with-indent.copyWithIndent: can't get 'tEditor'.");
	}
}