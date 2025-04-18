export class CommentExtractor {
  constructor(content) {
    this.content = content;
  }

  extract() {
    const singleLineCommentRegex = /\/\/(.*)/g;
    const multiLineCommentRegex = /\/\*([\s\S]*?)\*\//g;

    const comments = [];

    let match;
    while ((match = singleLineCommentRegex.exec(this.content))) {
      comments.push({ type: "single", text: match[1].trim() });
    }
    while ((match = multiLineCommentRegex.exec(this.content))) {
      comments.push({ type: "multi", text: match[1].trim() });
    }

    return comments;
  }
}