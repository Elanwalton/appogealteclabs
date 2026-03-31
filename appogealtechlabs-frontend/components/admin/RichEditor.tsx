'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import {
  Bold, Italic, Strikethrough, Code2, List, ListOrdered,
  Quote, Minus, Undo, Redo, Link2, ImageIcon, Heading1, Heading2, Heading3,
} from 'lucide-react';

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
}

function ToolbarBtn({
  onClick, active = false, title, children
}: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      title={title}
      className={`p-2 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-accent/20 text-accent'
          : 'text-text-secondary hover:text-text-primary hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };
  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-700 bg-gray-900/60 rounded-t-xl">
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1"><Heading1 size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 size={15} /></ToolbarBtn>
      <div className="w-px h-5 bg-gray-700 mx-1" />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><Bold size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><Italic size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><Strikethrough size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline Code"><Code2 size={15} /></ToolbarBtn>
      <div className="w-px h-5 bg-gray-700 mx-1" />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List"><List size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List"><ListOrdered size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote"><Quote size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Horizontal Rule"><Minus size={15} /></ToolbarBtn>
      <div className="w-px h-5 bg-gray-700 mx-1" />
      <ToolbarBtn onClick={addLink} active={editor.isActive('link')} title="Add Link"><Link2 size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={addImage} active={false} title="Add Image"><ImageIcon size={15} /></ToolbarBtn>
      <div className="w-px h-5 bg-gray-700 mx-1 ml-auto" />
      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo"><Undo size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo"><Redo size={15} /></ToolbarBtn>
    </div>
  );
}

export default function RichEditor({ content, onChange }: RichEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' } }),
      Placeholder.configure({ placeholder: 'Start writing your post content here...' }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm max-w-none min-h-[320px] p-6 outline-none text-text-primary leading-relaxed',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Sync external content updates (e.g. when loading edit data)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]); // eslint-disable-line

  if (!editor) return null;

  return (
    <div className="bg-bg-secondary border border-gray-800 rounded-xl overflow-hidden focus-within:border-accent transition-colors">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
