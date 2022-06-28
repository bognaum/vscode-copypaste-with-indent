import * as vsc from 'vscode';
import cut             from "./commands/cut";
import copy            from "./commands/copy";
import paste           from "./commands/paste";
import pasteWithIndent from "./commands/pasteWithIndent";
import copyWithIndent  from "./commands/copyWithIndent";
import cutWithIndent   from "./commands/cutWithIndent";

export function activate(context: vsc.ExtensionContext) {
	const commands = [
		vsc.commands.registerCommand('copypaste-with-indent.cut'            , cut            ),
		vsc.commands.registerCommand('copypaste-with-indent.copy'           , copy           ),
		vsc.commands.registerCommand('copypaste-with-indent.paste'          , paste           ),
		vsc.commands.registerCommand('copypaste-with-indent.pasteWithIndent', pasteWithIndent),
		vsc.commands.registerCommand('copypaste-with-indent.copyWithIndent' , copyWithIndent ),
		vsc.commands.registerCommand('copypaste-with-indent.cutWithIndent'  , cutWithIndent  ),
		// vsc.commands.registerTextEditorCommand('my-command', (tEditor: vsc.TextEditor, edit: vsc.TextEditorEdit, ...args: any[]) => {}),
	];

	context.subscriptions.push(...commands);
}

export function deactivate() {}