import Mention from './Mention';
import MentionSearch from './MentionSearch';
import mentionStrategy from './mentionStrategy';
import mentionSearchStrategy from './mentionSearchStrategy';

const callbacks = {
  keyBindingFn: undefined,
  handleKeyCommand: undefined,
  onDownArrow: undefined,
  onUpArrow: undefined,
  onEscape: undefined,
  handleReturn: undefined,
  onChange: undefined,
};

const ariaProps = {
  role: 'combobox',
  ariaAutoComplete: 'list',
  ariaHasPopup: 'false',
  ariaExpanded: 'false',
  ariaOwneeID: 'mentions-select', // optional
  ariaActiveDescendantID: undefined, // optional
};

const metionsPlugin = (config) => ({
  pluginProps: {
    decorators: [
      {
        strategy: mentionStrategy,
        component: Mention,
      },
      {
        strategy: mentionSearchStrategy,
        component: MentionSearch(config.mentions, callbacks, ariaProps),
      },
    ],
    getEditorProps: () => ariaProps,
    keyBindingFn: (keyboardEvent) => callbacks.keyBindingFn && callbacks.keyBindingFn(keyboardEvent),
    handleKeyCommand: (command) => callbacks.handleKeyCommand && callbacks.handleKeyCommand(command),
    onDownArrow: (keyboardEvent) => callbacks.onDownArrow && callbacks.onDownArrow(keyboardEvent),
    onUpArrow: (keyboardEvent) => callbacks.onUpArrow && callbacks.onUpArrow(keyboardEvent),
    onEscape: (keyboardEvent) => callbacks.onEscape && callbacks.onEscape(keyboardEvent),
    handleReturn: (keyboardEvent) => callbacks.handleReturn && callbacks.handleReturn(keyboardEvent),
    onChange: (editorState) => {
      if (callbacks.onChange) return callbacks.onChange(editorState);
      return editorState;
    },
  },
});

export default metionsPlugin;
