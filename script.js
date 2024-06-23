// script.js

document.getElementById('summarizeBtn').addEventListener('click', async function() {
    const pdfFile = document.getElementById('pdfFileInput').files[0];
    if (!pdfFile) {
        alert('Please select a PDF file.');
        return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);

    try {
        const response = await fetch('/summarize', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to summarize PDF.');
        }

        const summary = await response.text();
        document.getElementById('summaryContent').textContent = summary;
        document.getElementById('summaryOutput').style.display = 'block';
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
