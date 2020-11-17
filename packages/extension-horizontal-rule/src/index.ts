import { Command, Node, nodeInputRule } from '@tiptap/core'

export interface HorizontalRuleOptions {
  HTMLAttributes: {
    [key: string]: any
  },
}

const HorizontalRule = Node.create({
  name: 'horizontalRule',

  defaultOptions: <HorizontalRuleOptions>{
    HTMLAttributes: {},
  },

  group: 'block',

  parseHTML() {
    return [
      { tag: 'hr' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['hr', HTMLAttributes]
  },

  addCommands() {
    return {
      /**
       * Add a horizontal rule
       */
      horizontalRule: (): Command => ({ tr }) => {
        tr.replaceSelectionWith(this.type.create())

        return true
      },
    }
  },

  addInputRules() {
    return [
      nodeInputRule(/^(?:---|___\s|\*\*\*\s)$/, this.type),
    ]
  },
})

export default HorizontalRule

declare module '@tiptap/core' {
  interface AllExtensions {
    HorizontalRule: typeof HorizontalRule,
  }
}