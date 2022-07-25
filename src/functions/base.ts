import * as vsc from "vscode";
import {getStorage} from "../globalState";

export {
	saveCopied,
	getTrimmedLines,
	getFirstLIndent,
	rangeToOffsets,
	offsetsToRange,
};

async function saveCopied(tEditor: vsc.TextEditor): Promise<[string, string]> {
	const 
		text   = await vsc.env.clipboard.readText(),
		indent = getFirstLIndent(tEditor, tEditor.selection.start);
	getStorage().update("copiedText", text);
	getStorage().update("copiedIndent", indent);
	return [text, indent];
}

function getTrimmedLines(text: string): string[] {
	const 
		lines = text.split("\n"),
		trimLength = getMinIndentLength(lines),
		trimmedLines = lines.map((v) => v.slice(trimLength));
	return trimmedLines;
}

function getMinIndentLength(lines: string[]): number {
	return lines.filter(v => !v.match(/^\s*$/))
		.map(v => (v.match(/^\s*/) || [""])[0].length)
		.sort()[0] || 0;
}

function getFirstLIndent(tEditor: vsc.TextEditor, pos: vsc.Position): string {
	const 
		doc  = tEditor.document,
		lineText = doc.getText(doc.lineAt(pos).range),
		m = lineText.match(/^\s*/),
		indent = m ? m[0] : "";
	return indent;
}

function rangeToOffsets(doc: vsc.TextDocument, range: vsc.Range) {
	return [range.start, range.end].map(doc.offsetAt);
}

function offsetsToRange(doc: vsc.TextDocument, offsets: [number, number]): vsc.Range {
	const [a, b] = offsets.map(doc.positionAt);
	return new vsc.Range(a, b);
}