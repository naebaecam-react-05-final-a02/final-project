'use client';

import { Editor } from '@tiptap/react';
import { FaBold, FaItalic, FaListOl, FaListUl, FaQuoteLeft } from 'react-icons/fa6';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  // const buttonClass =
  //   'border border-gray-300 rounded px-2 py-1 m-1 text-sm hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200';
  // const activeButtonClass = 'bg-blue-500 text-white hover:bg-white';

  const buttonClass = `
    border border-white/20 rounded px-2 py-1 m-1 text-sm 
    text-white/60 hover:text-primary-100 hover:border-primary-100
    focus:outline-none focus:ring-2 focus:ring-primary-100 
    transition-colors duration-200 bg-transparent
  `;
  const activeButtonClass = '!bg-primary-10 !text-primary-100 !border-primary-100';

  return (
    <div className="control-group p-2 rounded shadow">
      <div className="button-group flex flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`${buttonClass} ${editor.isActive('bold') ? activeButtonClass : ''}`}
        >
          <FaBold />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`${buttonClass} ${editor.isActive('italic') ? activeButtonClass : ''}`}
        >
          <FaItalic />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`${buttonClass} ${editor.isActive('bulletList') ? activeButtonClass : ''}`}
        >
          <FaListUl />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`${buttonClass} ${editor.isActive('orderedList') ? activeButtonClass : ''}`}
        >
          <FaListOl />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`${buttonClass} ${editor.isActive('blockquote') ? activeButtonClass : ''}`}
        >
          <FaQuoteLeft />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
