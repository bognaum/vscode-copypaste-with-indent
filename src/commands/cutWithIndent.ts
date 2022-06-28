import * as vsc from "vscode";
import {
	saveCopied,
	getTrimmedLines,
} from "../functions/base";

export default async function cutWithIndent() {
	const tEditor = vsc.window.activeTextEditor;
	if (tEditor) {
		await vsc.commands.executeCommand("editor.action.clipboardCutAction");
		const 
			[text, firstLineIndent] = await saveCopied(tEditor),
			trimmedText  = getTrimmedLines(firstLineIndent + text).join("\n");
		await vsc.env.clipboard.writeText(trimmedText);
	} else {
		vsc.window.showWarningMessage("copypaste-with-indent.cutWithIndent: can't get 'tEditor'.");
	}
}