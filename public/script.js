// document.getElementById('previewButton').addEventListener('click', async () => {
//     const folderPath = document.getElementById('folderPath').value;
//     const response = await fetch(`/preview?path=${encodeURIComponent(folderPath)}`);
//     const files = await response.json();
//     const fileList = document.getElementById('fileList');
//     const previewSection = document.getElementById('previewSection');

//     fileList.innerHTML = '';  // Clear previous list

//     if (Array.isArray(files)) {
//         files.forEach(file => {
//             const listItem = document.createElement('li');
//             listItem.textContent = file;
//             listItem.classList.add('py-1');
//             fileList.appendChild(listItem);
//         });
//     } else {
//         fileList.innerHTML = `<li class="text-red-500">${files.error}</li>`;
//     }

//     previewSection.style.display = 'block';
// });

// // Rename files
// document.getElementById('renameButton').addEventListener('click', async () => {
//     const folderPath = document.getElementById('folderPath').value;
//     const oldSubstring = document.getElementById('oldSubstring').value;
//     const newSubstring = document.getElementById('newSubstring').value;

//     const response = await fetch('/rename', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ path: folderPath, oldSubstring, newSubstring })
//     });

//     const result = await response.json();
//     alert(result.message || result.error);
// });

// // Show Create File Popup
// document.getElementById('createButton').addEventListener('click', () => {
//     document.getElementById('createFilePopup').style.display = 'flex';
// });

// // Create a new file
// document.getElementById('createFileBtn').addEventListener('click', async () => {
//     const folderPath = document.getElementById('folderPath').value;
//     const newFileName = document.getElementById('newFileName').value;

//     const response = await fetch('/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ path: folderPath, newFileName })
//     });

//     const result = await response.json();
//     alert(result.message || result.error);
//     document.getElementById('createFilePopup').style.display = 'none';
// });

// // Close Create File Popup
// document.getElementById('closeCreateFileBtn').addEventListener('click', () => {
//     document.getElementById('createFilePopup').style.display = 'none';
// });

// // Show Delete File Popup
// document.getElementById('deleteButton').addEventListener('click', () => {
//     document.getElementById('deleteFilePopup').style.display = 'flex';
// });

// // Delete selected file
// document.getElementById('deleteFileBtn').addEventListener('click', async () => {
//     const folderPath = document.getElementById('folderPath').value;
//     const fileName = document.getElementById('deleteFileSelect').value;

//     const response = await fetch('/delete', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ path: folderPath, fileName })
//     });

//     const result = await response.json();
//     alert(result.message || result.error);
//     document.getElementById('deleteFilePopup').style.display = 'none';
// });

// // Close Delete File Popup
// document.getElementById('closeDeleteFileBtn').addEventListener('click', () => {
//     document.getElementById('deleteFilePopup').style.display = 'none';
// });

// document.getElementById('previewButton').addEventListener('click', () => {
//     const folderPath = document.getElementById('folderPath').value;

//     fetch('/getFiles', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ folderPath }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             const previewContainer = document.getElementById('previewContainer');
//             previewContainer.innerHTML = '';
//             data.filesAndFolders.forEach(item => {
//                 const div = document.createElement('div');
//                 div.textContent = item.isDirectory ? `[Folder] ${item.name}` : item.name;
//                 previewContainer.appendChild(div);
//             });
//         } else {
//             alert(data.message);
//         }
//     });
// });

// document.getElementById('renameButton').addEventListener('click', () => {
//     const folderPath = document.getElementById('folderPath').value;
//     const oldString = document.getElementById('oldString').value;
//     const newString = document.getElementById('newString').value;

//     fetch('/rename', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ oldPath: folderPath + '/' + oldString, newPath: folderPath + '/' + newString }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('Files renamed successfully');
//             document.getElementById('previewButton').click();  // Refresh the preview
//         } else {
//             alert(data.message);
//         }
//     });
// });

// document.getElementById('createButton').addEventListener('click', () => {
//     const folderPath = document.getElementById('folderPath').value;
//     const newFile = prompt('Enter new file name:');
//     if (!newFile) return;

//     fetch('/create', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ filePath: folderPath + '/' + newFile }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('File created successfully');
//             document.getElementById('previewButton').click();  // Refresh the preview
//         } else {
//             alert(data.message);
//         }
//     });
// });

// document.getElementById('deleteButton').addEventListener('click', () => {
//     const folderPath = document.getElementById('folderPath').value;
//     const fileToDelete = prompt('Enter file name to delete:');
//     if (!fileToDelete) return;

//     fetch('/delete', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ filePath: folderPath + '/' + fileToDelete }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('File deleted successfully');
//             document.getElementById('previewButton').click();  // Refresh the preview
//         } else {
//             alert(data.message);
//         }
//     });
// });
