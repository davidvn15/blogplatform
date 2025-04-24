
import React from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';
import { AdminLayout } from '@/components/AdminLayout';

const CreatePost: React.FC = () => {
  return (
    <AdminLayout>
      <MarkdownEditor />
    </AdminLayout>
  );
};

export default CreatePost;
