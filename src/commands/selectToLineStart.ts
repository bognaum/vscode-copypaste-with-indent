import * as vsc from "vscode";

export default function selectToLineStart(
	tEditor: vsc.TextEditor, 
	edit: vsc.TextEditorEdit, 
	...args: any[]
): void {
	const 
		doc  = tEditor.document,
		opts = tEditor.options,
		EOL  = ["", "\n", "\r\n"][doc.eol],
		TAB  = opts.insertSpaces && typeof opts.tabSize === "number" ? 
		" ".repeat(opts.tabSize) : "\t",
		newSelections: vsc.Selection[] = [];
	
	tEditor.edit((edit) => {
		for (let sel of tEditor.selections) {
			let
				startP = getLineStart(doc, sel.start),
				endP = sel.end;
			
			if (startP.isEqual(sel.start)) {
				startP = startP.translate(-1);
			}

			if (sel.isReversed) {
				newSelections.push(new vsc.Selection(endP, startP));
			} else {
				newSelections.push(new vsc.Selection(startP, endP));
			}
		}
		tEditor.selections = newSelections;
	});
}

function getLineStart(doc: vsc.TextDocument, pos: vsc.Position): vsc.Position {
	return doc.lineAt(pos).range.start;
}
