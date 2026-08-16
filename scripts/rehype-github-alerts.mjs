/**
 * Custom Rehype Plugin for GitHub Alerts
 * Transforms blockquotes starting with [!NOTE], [!WARNING], etc. into styled divs.
 */

const ALERTS = {
  "[!NOTE]": {
    className: "alert-note",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-500",
    icon: `<svg class="w-5 h-5 mr-2 inline-block" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`,
    title: "Note",
  },
  "[!TIP]": {
    className: "alert-tip",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-500",
    icon: `<svg class="w-5 h-5 mr-2 inline-block" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A120.18 120.18 0 0010 1a120.148 120.148 0 00-1.3.046l-.3 2.52a120.148 120.148 0 002.6 0l-.3-2.52zM10 4c-3.1 0-5.8 1.9-6.8 4.6l-1 2.8a1 1 0 001.2 1.3l2.8-1c2.7-1 4.6-3.7 4.6-6.8v-.9h-.8zm5.6 7.4l2.8 1a1 1 0 001.2-1.3l-1-2.8A7.013 7.013 0 0011 4v.9c3.1 0 5.8 1.9 6.8 4.6zM10 16a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>`,
    title: "Tip",
  },
  "[!IMPORTANT]": {
    className: "alert-important",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-500",
    icon: `<svg class="w-5 h-5 mr-2 inline-block" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`,
    title: "Important",
  },
  "[!WARNING]": {
    className: "alert-warning",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-500",
    icon: `<svg class="w-5 h-5 mr-2 inline-block" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`,
    title: "Warning",
  },
  "[!CAUTION]": {
    className: "alert-caution",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-500",
    icon: `<svg class="w-5 h-5 mr-2 inline-block" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`,
    title: "Caution",
  },
};

export default function rehypeGithubAlerts() {
  return function (tree) {
    function walk(node) {
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          
          if (child.type === "element" && child.tagName === "blockquote") {
            // Find the first paragraph
            const firstParagraph = child.children.find(c => c.type === "element" && c.tagName === "p");
            if (firstParagraph && firstParagraph.children && firstParagraph.children.length > 0) {
              const firstTextNode = firstParagraph.children[0];
              
              if (firstTextNode.type === "text") {
                const textValue = firstTextNode.value;
                const match = Object.keys(ALERTS).find(key => textValue.startsWith(key));
                
                if (match) {
                  const alertData = ALERTS[match];
                  
                  // Transform blockquote to div
                  child.tagName = "div";
                  child.properties = child.properties || {};
                  child.properties.className = [
                    "not-prose", "my-6", "px-5", "py-4", "rounded-lg", "border-l-4", 
                    alertData.bg, alertData.border, alertData.className, "text-base", "shadow-sm"
                  ];
                  
                  // Clean up the text node
                  firstTextNode.value = firstTextNode.value.slice(match.length).replace(/^[\r\n]+/, '');
                  
                  // If the text node becomes empty, remove it to prevent empty lines
                  if (!firstTextNode.value.trim() && firstParagraph.children.length === 1) {
                    child.children = child.children.filter(c => c !== firstParagraph);
                  }

                  // Create title element with raw HTML for SVG
                  const titleElement = {
                    type: "element",
                    tagName: "div",
                    properties: { className: ["font-bold", "flex", "items-center", "mb-2", alertData.color] },
                    children: [
                      { type: "raw", value: alertData.icon },
                      { type: "text", value: alertData.title }
                    ]
                  };

                  child.children.unshift(titleElement);
                }
              }
            }
          }
          
          walk(child);
        }
      }
    }
    
    walk(tree);
  };
}
