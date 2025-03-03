import { renderToString } from 'react-dom/server.browser';

export function renderToStaticMarkup(jsx: any) {
  return renderToString(jsx);
}

export function renderToReadableStream(jsx: any) {
  const html = renderToString(jsx);
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(html));
      controller.close();
    },
  });
  return stream;
}
