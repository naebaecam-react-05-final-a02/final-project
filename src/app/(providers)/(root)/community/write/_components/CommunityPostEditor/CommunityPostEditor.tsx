'use client';

import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback } from 'react';
import sanitizeContent from '../../../_utils/sanitizeContent';
import MenuBar from '../MenuBar';

const MAX_CHARACTERS = 2000;

interface CommunityPostEditorProps {
  onContentChange: (content: string, isValid: boolean, editor: Editor) => void;
  initialContent?: string;
}

const CommunityPostEditor = ({ onContentChange, initialContent = '' }: CommunityPostEditorProps) => {
  const handleUpdate = useCallback(
    async ({ editor }: { editor: any }) => {
      let content = editor.getHTML();
      const characterCount = editor.storage.characterCount.characters();

      content = await sanitizeContent(content);

      const isValid = characterCount > 0 && characterCount <= MAX_CHARACTERS;
      onContentChange(content, isValid, editor);
    },
    [onContentChange],
  );

  const editor = useEditor({
    content: initialContent,
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '게시글 내용을 입력하세요...',
        emptyEditorClass: 'is-editor-empty',
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      CharacterCount.configure({
        limit: MAX_CHARACTERS,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] p-4 bg-transparent text-whiteT-100 placeholder-whiteT-40',
      },
    },
    onUpdate: handleUpdate,
  });
  const characterCount = editor?.storage.characterCount.characters() ?? 0;

  return (
    <div className="rounded-lg bg-input-gradient backdrop-blur-[10px]">
      <MenuBar editor={editor} />

      <div className="border-t border-whiteT-40">
        <EditorContent editor={editor} />
      </div>

      <div className="text-sm text-right text-white/60 p-2 mr-2">
        {characterCount}/{MAX_CHARACTERS}
      </div>
    </div>
  );
};

export default CommunityPostEditor;
