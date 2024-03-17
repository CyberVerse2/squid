export const readFileAsDataURL = (file) => {
   return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.onload = () => {
           if (typeof reader.result === 'string') {
               resolve(reader.result);
           } else {
               reject(new Error('Failed to read file as Data URL'));
           }
       };
       reader.onerror = () => {
           reject(reader.error || new Error('Unknown error occurred while reading file'));
       };
       reader.readAsDataURL(file);
   });
};