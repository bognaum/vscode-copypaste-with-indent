import * as vsc from "vscode";
import globalStorage from "../globalStorage";
import {
	getTrimmedLines,
	getFirstLIndent,
} from "../functions/base";

export default async function pasteWithIndent() {
	const tEditor = vsc.window.activeTextEditor;
	if (tEditor) {

		const primText = await vsc.env.clipboard.readText();
		let text = primText;
		if (text === globalStorage.copied.text) {
			text = globalStorage.copied.indent + text;
			/* const ind = globalStorage.copied.indent.replace(/\t/g, "<#>").replace(/ /g, "-");
			vsc.window.showInformationMessage( `Added first indent '${ind}'` ); */
		}
		const trimmedLines = getTrimmedLines(text);
		console.log(`trimmedLines.join("\n") >>`, trimmedLines.join("\n"));
		let shiftedText: string = "";

		if (tEditor.selections.length === trimmedLines.length) {
			shiftedText = trimmedLines.join("\n");
		} else {
			const newIndent = getFirstLIndent(tEditor, tEditor.selection.start);
			shiftedText = trimmedLines.join("\n" + newIndent);
		}
		await vsc.env.clipboard.writeText(shiftedText);
		await vsc.commands.executeCommand("editor.action.clipboardPasteAction");
		await vsc.env.clipboard.writeText(primText);
	} else {
		vsc.window.showWarningMessage("copypaste-with-indent.pasteWithIndent: can't get 'tEditor'.");
	}
}

