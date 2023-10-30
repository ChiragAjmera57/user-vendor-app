export async function downloadFileWithFetch(filename) {
    try {
      const response = await fetch(`http://localhost:8080/download/${filename}`);
      
      if (!response.ok) {
        throw new Error(`Failed to download file: HTTP status ${response.status}`);
      }
      
      
      console.log(response);
      
      return `File "${filename}" downloaded`;
    } catch (error) {
      console.log(`Error downloading the file: ${error.message}`);
    }
  }