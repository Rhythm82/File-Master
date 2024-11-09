require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
const port = https://file-master.onrender.com;
app.use(express.static('public'));

function normalizePath(inputPath) {
    return path.resolve(inputPath.replace(/\\/g, '/'));
}

function getAllFilesAndFolders(dirPath) {
    let results = [];
    try {
        const items = fs.readdirSync(dirPath);

        items.forEach(item => {
            const itemPath = path.join(dirPath, item);
            try {
                const stats = fs.statSync(itemPath);
                if (stats.isDirectory()) {
                    results.push({ name: item, path: itemPath, type: 'folder' });
                } else if (stats.isFile()) {
                    results.push({ name: item, path: itemPath, type: 'file' });
                }
            } catch (e) {
                console.warn(`Cannot access item: ${itemPath}, skipping.`);
            }
        });
    } catch (error) {
        console.error(`Failed to read directory: ${dirPath}`);
    }
    return results;
}

app.get('/preview', (req, res) => {
    let folderPath = req.query.path;
    if (!folderPath) {
        return res.status(400).json({ error: 'Folder path is required' });
    }

    folderPath = normalizePath(folderPath);

    try {
        const allFilesAndFolders = getAllFilesAndFolders(folderPath);
        res.json(allFilesAndFolders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to read folder contents' });
    }
});

app.post('/rename', (req, res) => {
    const { path: folderPath, oldSubstring, newSubstring } = req.body;

    if (!folderPath || !oldSubstring || !newSubstring) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const items = fs.readdirSync(folderPath);

        items.forEach(item => {
            const itemPath = path.join(folderPath, item);
            const newItemName = item.replace(oldSubstring, newSubstring);
            const newItemPath = path.join(folderPath, newItemName);

            if (newItemName !== item) {
                fs.renameSync(itemPath, newItemPath);
            }
        });

        res.json({ message: 'Files and folders renamed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to rename files and folders' });
    }
});

app.post('/create', (req, res) => {
    const { path: folderPath, newFileName } = req.body;

    if (!folderPath || !newFileName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const filePath = path.join(folderPath, newFileName);
        fs.writeFileSync(filePath, '');
        res.json({ message: 'File created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create file' });
    }
});

app.post('/delete', (req, res) => {
    const { path: filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
    }

    try {
        fs.unlinkSync(filePath);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

app.listen(port, () => {

    console.log(`Server is running on http://localhost:${port}`);
});
