        document.getElementById('previewButton').addEventListener('click', async () => {
            const folderPath = document.getElementById('folderPath').value;
            if (!folderPath) {
                alert("Please enter a valid folder path.");
                return;
            }

            const response = await fetch(`/preview?path=${encodeURIComponent(folderPath)}`);
            const items = await response.json();
            const fileList = document.getElementById('fileList');
            const previewSection = document.getElementById('previewSection');

            fileList.innerHTML = '';  // Clear previous list

            if (Array.isArray(items) && items.length > 0) {
                items.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('flex', 'justify-between', 'items-center', 'py-1');

                    const itemText = document.createElement('span');
                    itemText.textContent = `${item.name} (${item.type})`;
                    listItem.appendChild(itemText);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.classList.add('px-2', 'py-1', 'bg-red-600', 'rounded', 'hover:bg-red-500');
                    deleteButton.addEventListener('click', async () => {
                        const confirmDelete = confirm(`Are you sure you want to delete "${item.name}"?`);
                        if (confirmDelete) {
                            await deleteFile(item.path);
                            listItem.remove();
                        }
                    });

                    listItem.appendChild(deleteButton);
                    fileList.appendChild(listItem);
                });
            } else {
                fileList.innerHTML = `<li class="text-red-500">No files or folders found or invalid folder path.</li>`;
            }

            previewSection.style.display = 'block';
        });

        async function deleteFile(filePath) {
            const response = await fetch('/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: filePath })
            });
            const result = await response.json();
            alert(result.message || result.error);
        }

        document.getElementById('renameButton').addEventListener('click', async () => {
            const folderPath = document.getElementById('folderPath').value;
            const oldSubstring = document.getElementById('oldSubstring').value;
            const newSubstring = document.getElementById('newSubstring').value;

            const response = await fetch('/rename', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: folderPath, oldSubstring, newSubstring })
            });

            const result = await response.json();
            alert(result.message || result.error);
        });

        document.getElementById('createButton').addEventListener('click', async () => {
            const folderPath = document.getElementById('folderPath').value;
            const newFileName = document.getElementById('newFileName').value;

            const response = await fetch('/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: folderPath, newFileName })
            });

            const result = await response.json();
            alert(result.message || result.error);
        });
