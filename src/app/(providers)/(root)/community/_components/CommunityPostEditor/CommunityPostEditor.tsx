'use client';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from '../MenuBar';

const CommunityPostEditor = () => {
  const editorClass = `
  prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4
  bg-transparent rounded-lg text-white placeholder-white/40 
  bg-input-gradient backdrop-blur-[10px] border-b-2 border-gradient
  transition
`;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '게시글 내용을 입력하세요...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 bg-transparent rounded-lg text-whiteT-100 placeholder-whiteT-40 bg-input-gradient backdrop-blur-[10px]  transition',
      },
    },
  });

  return (
    <div className=" rounded-lg">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default CommunityPostEditor;
