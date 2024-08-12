import { CommunityPostCreateData } from '@/types/community';

export interface ValidationResult {
  isValid: boolean;
  errors: {
    title?: string;
    content?: string;
    category?: string;
  };
}

const MAX_TITLE_LENGTH = 50;

const validateCommunityPost = (data: CommunityPostCreateData): ValidationResult => {
  const errors: ValidationResult['errors'] = {};

  if (!data.title.trim()) {
    errors.title = '제목을 입력해주세요.';
  } else if (data.title.length > MAX_TITLE_LENGTH) {
    errors.title = `제목은 ${MAX_TITLE_LENGTH}자를 초과할 수 없습니다.`;
  }

  if (!data.content.trim()) {
    errors.content = '내용을 입력해주세요.';
  }

  if (!data.category) {
    errors.category = '카테고리를 선택해주세요.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validateCommunityPost;
