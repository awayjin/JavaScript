// mock file

export function createFile(
  name: File['name'],
  size: File['size'],
  mimeType: File['type'],
) {
  name = name || 'mock.txt';
  size = size || 1024;
  mimeType = mimeType || 'plain/txt';

  function range(count: number) {
    let output = '';
    for (let i = 0; i < count; i++) {
      output += 'a';
    }
    return output;
  }

  const blob = new Blob([range(size)], { type: mimeType });
  blob.lastModifiedDate = new Date();
  blob.name = name;

  return blob;
}
