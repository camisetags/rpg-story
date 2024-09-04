export function getLocalStorageUsage() {
  let totalBytes = 0;

  if (typeof window !== 'undefined') {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const keySize = key.length * 2; // Cada caractere em uma string tem aproximadamente 2 bytes
        const valueSize = localStorage[key].length * 2;
        totalBytes += keySize + valueSize;
      }
    }
  
    const totalKB = totalBytes / 1024;
    const totalMB = totalKB / 1024;
  
    console.log(`Total used: ${totalKB.toFixed(2)} KB (${totalMB.toFixed(2)} MB)`);
    return {
      totalBytes,
      totalKB,
      totalMB
    };
  }

  return null;
}
