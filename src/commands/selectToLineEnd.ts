import * as vsc from "vscode";

export default function selectToLineEnd(
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
				startP = sel.start,
				endP = getLineEnd(doc, sel.end);
			
			if (endP.isEqual(sel.end)) {
				endP = endP.translate(1);
				endP = getLineEnd(doc, endP);
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

function getLineEnd(doc: vsc.TextDocument, pos: vsc.Position): vsc.Position {
	return doc.lineAt(pos).range.end;
}