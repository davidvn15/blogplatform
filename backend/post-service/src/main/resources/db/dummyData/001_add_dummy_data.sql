INSERT INTO blog.users (
    id, email, password_hash, name, avatar_url, bio, role, website, social_links, created_at, updated_at
) VALUES
-- Admin user
('11111111-1111-1111-1111-111111111111', 'admin@example.com', '$2y$12$adminHashedPassword1234567890', 'Admin User',
 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', 'Administrator of the platform.', 'admin',
 'https://adminblog.com', '{"twitter": "https://twitter.com/admin", "github": "https://github.com/admin"}', NOW(), NOW()),

-- Author 1
('22222222-2222-2222-2222-222222222222', 'author1@example.com', '$2y$12$author1PasswordHashXYZ', 'Alice Writer',
 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', 'Content creator focused on tech.', 'author',
 'https://alicewrites.com', '{"twitter": "https://twitter.com/alice", "linkedin": "https://linkedin.com/in/alice"}', NOW(), NOW()),

-- Editor 1
('33333333-3333-3333-3333-333333333333', 'editor1@example.com', '$2y$12$editor1PasswordHashXYZ', 'Evan Edit',
 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', 'Editor with 5 years of experience.', 'editor',
 NULL, '{"github": "https://github.com/editor1"}', NOW(), NOW()),

-- User 1
('44444444-4444-4444-4444-444444444444', 'user1@example.com', '$2y$12$user1PasswordHashXYZ', 'User One',
 NULL, 'Enthusiastic blog reader.', 'user',
 NULL, NULL, NOW(), NOW()),

-- Author 2
('55555555-5555-5555-5555-555555555555', 'author2@example.com', '$2y$12$author2PasswordHashXYZ', 'Bob Author',
 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', 'Writing about databases and backend.', 'author',
 'https://bobcodes.com', '{"github": "https://github.com/boba"}', NOW(), NOW()),

-- Editor 2
('66666666-6666-6666-6666-666666666666', 'editor2@example.com', '$2y$12$editor2PasswordHashXYZ', 'Ella Review',
 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', 'Passionate about content quality.', 'editor',
 NULL, NULL, NOW(), NOW()),

-- User 2
('77777777-7777-7777-7777-777777777777', 'user2@example.com', '$2y$12$user2PasswordHashXYZ', 'Charlie Read',
 NULL, 'Learner and reader.', 'user',
 NULL, '{"facebook": "https://facebook.com/charlier"}', NOW(), NOW()),

-- User 3
('88888888-8888-8888-8888-888888888888', 'user3@example.com', '$2y$12$user3PasswordHashXYZ', 'Dana Curious',
 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', NULL, 'user',
 NULL, NULL, NOW(), NOW()),

-- Author 3
('99999999-9999-9999-9999-999999999999', 'author3@example.com', '$2y$12$author3PasswordHashXYZ', 'Carl Blogger',
 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', 'Covers cloud computing and DevOps.', 'author',
 'https://carlblog.dev', '{"linkedin": "https://linkedin.com/in/carl"}', NOW(), NOW()),

-- User 4
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'user4@example.com', '$2y$12$user4PasswordHashXYZ', 'Emily Explorer',
 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', 'Loves to explore new topics.', 'user',
 'https://emilyexplores.com', '{"twitter": "https://twitter.com/emilyx"}', NOW(), NOW());

---------CATEGORY--------
INSERT INTO blog.categories (id, name, slug, description, parent_id) VALUES
                                                                         ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Databases', 'databases', 'All about relational and non-relational databases.', NULL),
                                                                         ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Software Engineering', 'software-engineering', 'Development practices, patterns, and tools.', NULL),
                                                                         ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Writing Tools', 'writing-tools', 'Markdown, editors, and writing productivity.', NULL),
                                                                         ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Automation', 'automation', 'Automating tasks and workflows in software.', NULL),
                                                                         ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'SEO', 'seo', 'Search Engine Optimization strategies and tools.', NULL);

INSERT INTO blog.categories (id, name, slug, description, parent_id) VALUES
                                                                         ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'PostgreSQL', 'postgresql', 'Tips and articles on using PostgreSQL.', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
                                                                         ('bbbbbbbb-cccc-dddd-eeee-ffffffffffff', 'Best Practices', 'best-practices', 'Engineering standards and clean code.', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
                                                                         ('cccccccc-dddd-eeee-ffff-111111111111', 'Markdown Editors', 'markdown-editors', 'Top editors for Markdown writing.', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
                                                                         ('dddddddd-eeee-ffff-1111-222222222222', 'Background Jobs', 'background-jobs', 'Automation via scheduled or background tasks.', 'dddddddd-dddd-dddd-dddd-dddddddddddd'),
                                                                         ('eeeeeeee-ffff-1111-2222-333333333333', 'Technical SEO', 'technical-seo', 'SEO for developers and engineers.', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee');


-----------POST--------------
INSERT INTO blog.posts (
    id, title, slug, excerpt, thumbnail, content, featured_image_url, status,
    author_id, category_id, published_at, views, reading_time_minutes, is_featured,
    meta_title, meta_description, created_at, updated_at
) VALUES
-- Post 1
('10000000-0000-0000-0000-000000000001', '10 Tips for Learning SQL', '10-tips-learning-sql', 'A quick guide to SQL mastery.',
 'https://example.com/images/sql-tips.jpg', '# SQL Tips\nLearn SQL with these 10 essential tips.',
 'https://example.com/images/sql-featured.jpg', 'published',
 '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW(), 120, 5, true,
 'Learn SQL Effectively', 'Master SQL with these top 10 tips.', NOW(), NOW()),

-- Post 2
('10000000-0000-0000-0000-000000000002', 'Understanding UUIDs in Databases', 'understanding-uuids-databases', 'Why UUIDs matter.',
 'https://example.com/images/uuid.jpg', '## UUIDs\nUniversally Unique Identifiers explained.',
 NULL, 'published',
 '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', NOW(), 95, 4, false,
 'UUIDs in DB Design', 'Explains the importance of UUIDs.', NOW(), NOW()),

-- Post 3
('10000000-0000-0000-0000-000000000003', 'Intro to Markdown for Writers', 'intro-markdown-writers', 'Simple syntax, powerful writing.',
 'https://example.com/images/markdown.jpg', '# Markdown Basics\nMarkdown is a lightweight markup language.',
 NULL, 'published',
 '22222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', NOW(), 70, 3, false,
 'Getting Started with Markdown', 'Guide to writing in Markdown.', NOW(), NOW()),

-- Post 4
('10000000-0000-0000-0000-000000000004', 'Scaling PostgreSQL for Production', 'scaling-postgresql-production', 'Optimize your database.',
 'https://example.com/images/postgres-scale.jpg', '## Scaling Tips\nBest practices for PostgreSQL.',
 'https://example.com/images/featured-postgres.jpg', 'draft',
 '55555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, 20, 6, false,
 'PostgreSQL Optimization', 'Make PostgreSQL work efficiently at scale.', NOW(), NOW()),

-- Post 5
('10000000-0000-0000-0000-000000000005', 'Creating Custom Slugs in Your Blog', 'creating-custom-slugs-blog', 'Clean URLs explained.',
 'https://example.com/images/slug.jpg', '### Slugs\nCustomizing slugs for SEO.',
 NULL, 'published',
 '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW(), 180, 4, false,
 'Custom Slugs Guide', 'Improve blog SEO using clean slugs.', NOW(), NOW()),

-- Post 6
('10000000-0000-0000-0000-000000000006', 'Archiving Old Posts Automatically', 'archiving-old-posts', 'Keep your blog clean.',
 'https://example.com/images/archive.jpg', 'Use background jobs to archive content.',
 NULL, 'archived',
 '99999999-9999-9999-9999-999999999999', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '2023-12-01 10:00:00+00', 300, 7, false,
 'Automatic Post Archiving', 'Use logic to archive inactive content.', NOW(), NOW()),

-- Post 7
('10000000-0000-0000-0000-000000000007', 'Top Markdown Editors in 2024', 'top-markdown-editors-2024', 'Writing tools you''ll love.',
 'https://example.com/images/editors.jpg', 'A list of the best markdown editors.',
 NULL, 'published',
 '55555555-5555-5555-5555-555555555555', 'cccccccc-cccc-cccc-cccc-cccccccccccc', NOW(), 85, 3, false,
 'Markdown Editors List', 'Top markdown editors for productivity.', NOW(), NOW()),

-- Post 8
('10000000-0000-0000-0000-000000000008', 'How to Build a Blog with PostgreSQL', 'build-blog-postgresql', 'Database-backed blogging.',
 'https://example.com/images/blog-postgres.jpg', 'Build a blog using PostgreSQL as your backend.',
 'https://example.com/images/featured-blog.jpg', 'published',
 '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW(), 200, 6, true,
 'Blog with PostgreSQL', 'Step-by-step blog backend with PostgreSQL.', NOW(), NOW()),

-- Post 9
('10000000-0000-0000-0000-000000000009', 'Common Mistakes in SQL Queries', 'common-sql-mistakes', 'Avoid these SQL pitfalls.',
 'https://example.com/images/sql-errors.jpg', 'Learn what to avoid in SQL.',
 NULL, 'draft',
 '99999999-9999-9999-9999-999999999999', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, 10, 2, false,
 'Avoid SQL Mistakes', 'Beginner mistakes to avoid when writing SQL.', NOW(), NOW()),

-- Post 10
('10000000-0000-0000-0000-000000000010', 'Blog SEO Basics for Developers', 'blog-seo-basics', 'Improve blog visibility.',
 'https://example.com/images/seo.jpg', '## SEO Tips\nOptimize your content for search engines.',
 NULL, 'published',
 '99999999-9999-9999-9999-999999999999', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', NOW(), 145, 4, true,
 'SEO for Blogs', 'A technical guide to SEO best practices.', NOW(), NOW());
