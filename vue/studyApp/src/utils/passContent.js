export default { 
    passContent(contentStr) {
        let content = contentStr.replace(/\t+/g, '');
        try {
            return content = JSON.parse(content);
        } catch (e) {
            return content = JSON.parse(content.replace(/\\/g, '&##'))
        }
    }
}