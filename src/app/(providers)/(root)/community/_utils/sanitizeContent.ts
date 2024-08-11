import DOMPurify from 'dompurify';

// 과도한 빈 태그 제거 함수
async function removeExcessiveEmptyTags(html: string): Promise<string> {
  if (typeof window === 'undefined') {
    return html;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const removeExcessiveTags = (tagName: string) => {
    const tags = doc.body.getElementsByTagName(tagName);
    let emptyCount = 0;
    for (let i = tags.length - 1; i >= 0; i--) {
      if (tags[i].innerHTML.trim() === '') {
        emptyCount++;
        if (emptyCount > 4) {
          tags[i].remove();
        }
      } else {
        emptyCount = 0;
      }
    }
  };

  removeExcessiveTags('p');
  removeExcessiveTags('div');

  return doc.body.innerHTML;
}

// 예상치 못한 태그 제거 함수
async function removeUnexpectedTags(html: string): Promise<string> {
  if (typeof window === 'undefined') {
    return html;
  }

  const allowedTags = ['p', 'div', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'img'];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const removeUnexpected = (element: Element) => {
    Array.from(element.children).forEach((child) => {
      if (!allowedTags.includes(child.tagName.toLowerCase())) {
        element.removeChild(child);
      } else {
        removeUnexpected(child);
      }
    });
  };

  removeUnexpected(doc.body);

  return doc.body.innerHTML;
}

const sanitizeContent = async (html: string): Promise<string> => {
  // 살균 처리
  let content = DOMPurify.sanitize(html);

  // 추가적인 유효성 검사 및 처리
  if (typeof window !== 'undefined') {
    content = await removeExcessiveEmptyTags(content);
    content = await removeUnexpectedTags(content);
  }

  return content;
};

export default sanitizeContent;
